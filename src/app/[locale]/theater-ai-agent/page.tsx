import { VerticalLandingPage } from "@/components/vertical-landing-page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Theater AI Agent | Smart Box Office & Lost Property",
    description: "Streamline ticket bookings, showtime inquiries, and lost & found reporting with an intelligent AI agent.",
    keywords: ["AI theater agent", "cinema box office ai", "lost and found ai", "movie theater automation"],
};

export default function TheaterPage() {
    return (
        <VerticalLandingPage
            title={<>The Ultimate AI <br /> Box Office</>}
            subtitle="Streamline ticket bookings, showtime inquiries, and lost & found reporting with an intelligent AI agent."
            heroGradient="gold"
            ctaLabel="Call our Demo Theater"
            ctaNumber="+1 (857) 971-5733"
            features={[
                "Smart Ticket Reservations",
                "Showtime & Seat Availability",
                "Lost & Found Reporting",
                "Accessibility Requests",
                "Private Screening Inquiries"
            ]}
            dialogue={[
                {
                    speaker: "Guest",
                    text: "I think I left my wallet in Screen 4 after the 7 PM show."
                },
                {
                    speaker: "Agent",
                    text: "I can help with that. Let me check the lost and found log for Screen 4. Can you describe the wallet?"
                },
                {
                    speaker: "Guest",
                    text: "It's a brown leather wallet."
                },
                {
                    speaker: "Agent",
                    text: "I see a report of a brown leather wallet found in Screen 4. You can pick it up at the box office with ID."
                }
            ]}
        />
    );
}
