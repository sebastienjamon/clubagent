import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { saveToAirtable } from "@/lib/integrations/airtable";
import { saveToSalesforce } from "@/lib/integrations/salesforce";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Handle "assistant-request" (Incoming Call)
        if (body.message?.type === "assistant-request") {
            const call = body.message.call;

            if (!call) {
                console.error("No call object in request body");
                return NextResponse.json({ error: "Invalid Payload" }, { status: 400 });
            }

            // Log the entire call object to debug payload issues
            console.log("Vapi Assistant Request Body:", JSON.stringify(body, null, 2));

            // Try multiple paths to find the inbound number
            // Priority 1: body.message.phoneNumber.number (Standard Vapi Inbound)
            // Priority 2: call.phone_number (Legacy/Twilio)
            // Priority 3: call.customer.number (Fallback to caller ID if all else fails)
            const inboundNumber =
                body.message?.phoneNumber?.number ||
                call.phone_number ||
                call.phoneNumber?.number ||
                call.customer?.number;

            console.log("Incoming call to:", inboundNumber);

            if (!inboundNumber) {
                console.error("No phone number found in request");
                return NextResponse.json({ error: "No phone number provided" }, { status: 400 });
            }

            if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
                console.error("Missing Supabase credentials");
                return NextResponse.json({
                    assistant: {
                        firstMessage: "Configuration Error: Missing Supabase Credentials.",
                        model: { provider: "openai", model: "gpt-3.5-turbo", messages: [{ role: "system", content: "You are a helpful assistant." }] },
                        voice: { provider: "azure", voiceId: "en-US-JennyNeural" }
                    }
                });
            }

            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                process.env.SUPABASE_SERVICE_ROLE_KEY
            );

            // Lookup agent linked to this phone number
            const { data: phoneData, error } = await supabase
                .from('phone_numbers')
                .select(`
                    agent_id,
                    agents (
                        system_prompt,
                        first_message,
                        voice_id
                    )
                `)
                .eq('phone_number', inboundNumber)
                .single();

            if (error || !phoneData || !phoneData.agents) {
                console.warn("No agent found for number:", inboundNumber, error);

                // CRITICAL FALLBACK: Return a default agent so the call doesn't fail.
                return NextResponse.json({
                    assistant: {
                        firstMessage: "Hello, I am the Club Agent. I am currently having trouble accessing my configuration, but I am here to help.",
                        model: {
                            provider: "openai",
                            model: "gpt-4-turbo",
                            messages: [
                                {
                                    role: "system",
                                    content: "You are a helpful assistant. Explain that you are in fallback mode due to a configuration error."
                                }
                            ]
                        },
                        voice: {
                            provider: "11labs",
                            voiceId: "21m00Tcm4TlvDq8ikWAM",
                        }
                    }
                });
            }

            const agentData = phoneData.agents;
            const agent = Array.isArray(agentData) ? agentData[0] : agentData;

            // Construct Vapi Assistant Config
            return NextResponse.json({
                assistant: {
                    firstMessage: agent.first_message || "Hello, how can I help you?",
                    model: {
                        provider: "openai",
                        model: "gpt-4-turbo",
                        messages: [
                            {
                                role: "system",
                                content: agent.system_prompt || "You are a helpful assistant."
                            }
                        ]
                    },
                    voice: {
                        provider: (agent.voice_id && agent.voice_id.startsWith("azure-")) ? "azure" : "11labs",
                        voiceId: (agent.voice_id && agent.voice_id.startsWith("azure-"))
                            ? agent.voice_id.replace("azure-", "")
                            : (agent.voice_id || "21m00Tcm4TlvDq8ikWAM"),
                    }
                }
            });

            // 2. Handle "end-of-call-report" (Call Completed)
        } else if (body.message?.type === "end-of-call-report") {
            const call = body.message.call;
            const analysis = body.message.analysis;
            const transcript = body.message.transcript || call?.transcript;
            const summary = analysis?.summary || call?.summary;
            // FIX: Check body.message.recordingUrl as well
            const recordingUrl = body.message.recordingUrl || body.message.recording_url || call?.recordingUrl || call?.recording_url;

            console.log("Call ended. Storing data for:", call.id);

            if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
                console.error("Missing Supabase Service Key");
                return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
            }

            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                process.env.SUPABASE_SERVICE_ROLE_KEY
            );

            // Lookup agent again to link the call
            // Use the same robust extraction as assistant-request
            const vapiNumber =
                body.message?.phoneNumber?.number ||
                call.phone_number ||
                call.phoneNumber?.number ||
                call.customer?.number;

            console.log("Looking up agent for end-of-call:", vapiNumber);

            const { data: phoneData } = await supabase
                .from('phone_numbers')
                .select(`
                    agent_id,
                    agents (
                        name,
                        integrations
                    )
                `)
                .eq('phone_number', vapiNumber)
                .single();

            if (phoneData?.agent_id) {
                // Insert Call Record
                const { data: callData, error } = await supabase.from('calls').insert({
                    agent_id: phoneData.agent_id,
                    vapi_call_id: call.id,
                    caller_number: call.customer?.number,
                    status: 'completed',
                    transcript: transcript,
                    recording_url: recordingUrl,
                    summary: summary,
                    // FIX: Check body.message for timestamps first
                    started_at: body.message.startedAt || body.message.started_at || call.startedAt || call.started_at,
                    ended_at: body.message.endedAt || body.message.ended_at || call.endedAt || call.ended_at
                }).select().single();

                if (error) {
                    console.error("Failed to store call:", error);
                } else if (callData) {
                    console.log("Call stored successfully:", callData.id);

                    // Check for Integrations
                    const agent = Array.isArray(phoneData.agents) ? phoneData.agents[0] : phoneData.agents;
                    // @ts-ignore - Supabase types might not be perfectly inferred here without a full generated type definition
                    const integrations = agent?.integrations;
                    const agentName = agent?.name;

                    if (integrations?.airtable_enabled && integrations?.airtable_config) {
                        console.log("Syncing call to Airtable...");
                        await saveToAirtable(integrations.airtable_config, {
                            type: 'call',
                            payload: callData
                        }, agentName);
                    }

                    if (integrations?.salesforce_enabled && integrations?.salesforce_config) {
                        console.log("Syncing call to Salesforce...");
                        await saveToSalesforce(integrations.salesforce_config, {
                            type: 'call',
                            payload: callData
                        });
                    }

                    // Check for Reservation Keywords in Summary
                    const lowerSummary = (summary || "").toLowerCase();
                    if (lowerSummary.includes("reservation") || lowerSummary.includes("booked") || lowerSummary.includes("table") || lowerSummary.includes("bed")) {
                        console.log("Potential reservation detected. Creating entry...");

                        const { data: reservationData, error: resError } = await supabase.from('reservations').insert({
                            agent_id: phoneData.agent_id,
                            call_id: callData.id,
                            customer_phone: call.customer?.number,
                            notes: summary,
                            status: 'pending'
                        }).select().single();

                        if (!resError && reservationData && integrations?.airtable_enabled && integrations?.airtable_config) {
                            console.log("Syncing reservation to Airtable...");
                            await saveToAirtable(integrations.airtable_config, {
                                type: 'reservation',
                                payload: reservationData
                            }, agentName);
                        }

                        if (!resError && reservationData && integrations?.salesforce_enabled && integrations?.salesforce_config) {
                            console.log("Syncing reservation to Salesforce...");
                            await saveToSalesforce(integrations.salesforce_config, {
                                type: 'reservation',
                                payload: reservationData
                            });
                        }
                    }
                }
            } else {
                console.warn("Could not find agent for number:", vapiNumber);
            }

            return NextResponse.json({ message: "Call logged" });

            // 3. Handle "recording-available" (Recording Ready)
        } else if (body.message?.type === "recording-available") {
            const recordingUrl = body.message.recordingUrl || body.message.recording_url;
            // Vapi sends 'call' object or 'callId' in this event? 
            // Docs say it has 'call' object usually.
            const call = body.message.call;
            const callId = call?.id || body.message.callId;

            console.log("Recording available for:", callId, recordingUrl);

            if (callId && recordingUrl) {
                if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
                    console.error("Missing Supabase Service Key");
                    return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
                }

                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL,
                    process.env.SUPABASE_SERVICE_ROLE_KEY
                );

                // Update the call record
                const { error } = await supabase
                    .from('calls')
                    .update({ recording_url: recordingUrl })
                    .eq('vapi_call_id', callId);

                if (error) {
                    console.error("Failed to update recording URL:", error);
                } else {
                    console.log("Recording URL updated successfully.");
                }
            }

            return NextResponse.json({ message: "Recording updated" });
        }

        return NextResponse.json({ message: "Unhandled message type" }, { status: 200 });

    } catch (error: any) {
        console.error("Error processing webhook:", error);

        // ULTRA-SAFE FALLBACK
        // Even if everything crashes, return a valid Vapi response so the call doesn't drop.
        return NextResponse.json({
            assistant: {
                firstMessage: "I apologize, but I am experiencing a technical issue. Please try again later.",
                model: {
                    provider: "openai",
                    model: "gpt-4-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant. Apologize for the technical error: " + (error.message || "Unknown error")
                        }
                    ]
                },
                voice: {
                    provider: "11labs",
                    voiceId: "21m00Tcm4TlvDq8ikWAM",
                }
            }
        });
    }
}
