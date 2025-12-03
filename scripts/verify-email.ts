import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
    console.error("RESEND_API_KEY is missing");
    process.exit(1);
}

const resend = new Resend(apiKey);

async function sendTestEmail() {
    try {
        console.log("Sending test email...");
        const { data, error } = await resend.emails.send({
            from: "Sébastien from Club Agent <sebastien@notifications.clubagent.app>",
            to: "sebastien@clubagent.app", // Test sending to admin
            subject: "Verification Email from Club Agent (Admin Test)",
            html: "<p>This is a verification email to confirm admin notifications are working.</p>",
        });

        if (error) {
            console.error("Error sending email:", error);
            process.exit(1);
        }

        console.log("Email sent successfully:", data);
    } catch (e) {
        console.error("Exception:", e);
        process.exit(1);
    }
}

sendTestEmail();
