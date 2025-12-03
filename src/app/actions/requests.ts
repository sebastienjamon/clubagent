"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { Resend } from "resend";
import { RequestConfirmationEmail } from "@/components/emails/request-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

const RequestSchema = z.object({
    business_name: z.string().min(1, "Business name is required"),
    agent_role: z.string().min(1, "Agent role is required"),
    requirements: z.string().min(1, "Requirements are required"),
});

export async function submitAgentRequest(prevState: any, formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        return { error: "You must be logged in to submit a request." };
    }

    const validatedFields = RequestSchema.safeParse({
        business_name: formData.get("business_name"),
        agent_role: formData.get("agent_role"),
        requirements: formData.get("requirements"),
    });

    if (!validatedFields.success) {
        return { error: "Invalid input. Please check your fields." };
    }

    const { error } = await supabase
        .from("agent_requests")
        .insert({
            user_id: user.id,
            business_name: validatedFields.data.business_name,
            agent_role: validatedFields.data.agent_role,
            requirements: validatedFields.data.requirements,
        });

    if (error) {
        console.error("Error submitting request:", error);
        return { error: "Failed to submit request. Please try again." };
    }

    // Send Confirmation Email
    try {
        if (process.env.RESEND_API_KEY) {
            // 1. Send Confirmation to User
            await resend.emails.send({
                from: "Sébastien from Club Agent <sebastien@notifications.clubagent.app>",
                to: user.email,
                replyTo: "sebastien@clubagent.app",
                subject: "Request Received: " + validatedFields.data.agent_role,
                react: RequestConfirmationEmail({
                    businessName: validatedFields.data.business_name,
                    agentRole: validatedFields.data.agent_role,
                }),
            });

            // 2. Send Notification to Admin
            await resend.emails.send({
                from: "Club Agent System <system@notifications.clubagent.app>",
                to: "sebastien@clubagent.app",
                subject: "New Agent Request: " + validatedFields.data.agent_role,
                html: `
                    <h1>New Agent Request</h1>
                    <p><strong>User Email:</strong> ${user.email}</p>
                    <p><strong>Business Name:</strong> ${validatedFields.data.business_name}</p>
                    <p><strong>Agent Role:</strong> ${validatedFields.data.agent_role}</p>
                    <p><strong>Requirements:</strong></p>
                    <pre>${validatedFields.data.requirements}</pre>
                `,
            });
        } else {
            console.warn("RESEND_API_KEY is missing. Email not sent.");
        }
    } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Don't fail the request if email fails
    }

    return { success: true };
}
