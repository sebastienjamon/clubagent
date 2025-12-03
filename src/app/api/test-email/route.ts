import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "RESEND_API_KEY is missing" }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    try {
        const { data, error } = await resend.emails.send({
            from: "Sébastien from Club Agent <sebastien@notifications.clubagent.app>",
            to: "test@example.com", // Should fail in test mode
            subject: "Test Email from Concierge AI",
            html: "<p>This is a test email to verify the Resend integration.</p>",
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
