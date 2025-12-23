import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize OpenAI client for text chat responses
const getOpenAIClient = () => new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy-key", // Fallback for build time
});

// Initialize Supabase (Service Role for admin access to fetch agents by phone)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const from = formData.get('From') as string; // User's WhatsApp number
        const to = formData.get('To') as string;     // Agent's WhatsApp number
        const body = formData.get('Body') as string; // The message text

        console.log(`Received WhatsApp message from ${from} to ${to}: ${body}`);

        if (!body) {
            return new NextResponse('<Response></Response>', {
                headers: { 'Content-Type': 'text/xml' },
            });
        }

        // 1. Clean the "To" number
        const agentPhoneNumber = to.replace('whatsapp:', '');

        // 2. Find the Agent
        const { data: phoneRecord, error: phoneError } = await supabase
            .from('phone_numbers')
            .select('agent_id, agents(*)')
            .eq('phone_number', agentPhoneNumber)
            .single();

        if (phoneError || !phoneRecord || !phoneRecord.agents) {
            console.error("Agent not found for number:", agentPhoneNumber);
            return new NextResponse('<Response><Message>Sorry, this number is not assigned to an active agent.</Message></Response>', {
                headers: { 'Content-Type': 'text/xml' },
            });
        }

        const agentData = phoneRecord.agents;
        const agent = Array.isArray(agentData) ? agentData[0] : agentData;

        if (!agent) {
            console.error("Agent data missing");
            return new NextResponse('<Response><Message>Agent configuration error.</Message></Response>', {
                headers: { 'Content-Type': 'text/xml' },
            });
        }

        console.log("Found agent:", agent.name);

        // 3. Use OpenAI for text chat (not VAPI - VAPI is for voice only)
        // Define a tool to handle "Call me" requests
        const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
            {
                type: "function",
                function: {
                    name: "callUser",
                    description: "Call the user on their phone number. Use this when the user explicitly asks to be called or wants to speak by phone.",
                    parameters: {
                        type: "object",
                        properties: {
                            reason: {
                                type: "string",
                                description: "The reason for calling the user."
                            }
                        },
                        required: ["reason"]
                    }
                }
            }
        ];

        const openai = getOpenAIClient();
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `${agent.system_prompt}\n\nYou are chatting via WhatsApp. Keep your responses concise and natural. When users want to talk by phone, use the callUser function.`
                },
                {
                    role: "user",
                    content: body
                }
            ],
            tools: tools,
            tool_choice: "auto",
            max_tokens: 300,
        });

        const message = completion.choices[0].message;

        // 4. Handle Tool Calls (Call Me)
        if (message.tool_calls && message.tool_calls.length > 0) {
            const toolCall = message.tool_calls[0] as any;
            if (toolCall.function?.name === "callUser") {
                console.log("Agent decided to call user:", from);

                // Trigger Vapi Outbound Call
                // We need to use the Vapi Public API to create a call
                const callResponse = await fetch('https://api.vapi.ai/call', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${process.env.VAPI_PRIVATE_KEY || process.env.VAPI_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        phoneNumberId: (agent.integrations as any)?.vapi_config?.phone_id || process.env.VAPI_PHONE_NUMBER_ID,
                        customer: {
                            number: from.replace('whatsapp:', '')
                        },
                        assistant: {
                            firstMessage: "Hello! You asked me to call you?",
                            model: {
                                provider: "openai",
                                model: "gpt-4-turbo",
                                messages: [
                                    {
                                        role: "system",
                                        content: agent.system_prompt
                                    }
                                ]
                            },
                            voice: (() => {
                                if (agent.voice_id?.startsWith("azure-")) {
                                    return {
                                        provider: "azure",
                                        voiceId: agent.voice_id.replace("azure-", "")
                                    };
                                } else if (agent.voice_id?.startsWith("cartesia-")) {
                                    return {
                                        provider: "cartesia",
                                        voiceId: agent.voice_id.replace("cartesia-", ""),
                                        model: "sonic-2024-12-24",
                                        language: "fr"
                                    };
                                } else {
                                    return {
                                        provider: "11labs",
                                        voiceId: agent.voice_id || "21m00Tcm4TlvDq8ikWAM"
                                    };
                                }
                            })()
                        }
                    })
                });

                if (callResponse.ok) {
                    const twiml = `
                        <Response>
                            <Message>Calling you now... 📞</Message>
                        </Response>
                    `;
                    return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
                } else {
                    console.error("Failed to trigger call:", await callResponse.text());
                    const twiml = `
                        <Response>
                            <Message>I tried to call you but something went wrong. Please try again.</Message>
                        </Response>
                    `;
                    return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
                }
            }
        }

        // 5. Return Text Response
        const aiResponse = message.content || "I'm sorry, I didn't catch that.";
        const twiml = `
            <Response>
                <Message>${aiResponse}</Message>
            </Response>
        `;

        return new NextResponse(twiml, {
            headers: { 'Content-Type': 'text/xml' },
        });

    } catch (error) {
        console.error("Error processing WhatsApp webhook:", error);
        return new NextResponse('<Response><Message>System error.</Message></Response>', {
            headers: { 'Content-Type': 'text/xml' },
            status: 500
        });
    }
}
