import { VerticalLandingPage } from "@/components/vertical-landing-page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Restaurant AI Agent | Automatic Reservation Phone System",
    description: "Automate your restaurant reservations with an AI agent that handles bookings, dietary requests, and inquiries 24/7.",
    keywords: ["AI restaurant reservation phone", "automatic reservation agent", "restaurant ai host", "virtual restaurant receptionist"],
};

export default function RestaurantPage() {
    return (
        <VerticalLandingPage
            title={<>The Ultimate AI Host <br /> for Your Restaurant</>}
            subtitle="Never miss a reservation. Handle dietary requests, table preferences, and modifications instantly with human-like conversation."
            heroGradient="emerald"
            ctaLabel="Call our Demo Restaurant"
            ctaNumber="+1 (857) 971-5733"
            features={[
                "Smart Table Reservations",
                "Dietary Restriction Handling",
                "Modification & Cancellation Management",
                "Waitlist Coordination",
                "Private Event Inquiries"
            ]}
            dialogue={[
                {
                    speaker: "Guest",
                    text: "Can I book a table for 4 people tonight around 8 PM?"
                },
                {
                    speaker: "Agent",
                    text: "I can check availability for you. We have a booth available at 8:15 PM. Would that work for your party?"
                },
                {
                    speaker: "Guest",
                    text: "Yes, that's perfect. Also, one person is gluten-free."
                },
                {
                    speaker: "Agent",
                    text: "Noted. I've added the gluten-free allergy alert to your reservation. We look forward to seeing you at 8:15 PM."
                }
            ]}
        />
    );
}
