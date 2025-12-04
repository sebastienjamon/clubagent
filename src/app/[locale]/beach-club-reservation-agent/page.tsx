import { VerticalLandingPage } from "@/components/vertical-landing-page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Beach Club Reservation Agent | VIP Booking AI",
    description: "Manage sunbeds, cabanas, and bottle service with a sophisticated AI agent designed for luxury beach clubs.",
    keywords: ["beach club reservation agent", "vip booking ai", "cabana reservation system", "luxury concierge ai"],
};

export default function BeachClubPage() {
    return (
        <VerticalLandingPage
            title={<>VIP Beach Club <br /> Reservations</>}
            subtitle="Manage sunbeds, cabanas, and bottle service with the sophistication your beach club deserves. Automate VIP bookings effortlessly."
            heroGradient="ocean"
            ctaLabel="Call The Beach Club"
            ctaNumber="+1 (857) 971-5733"
            features={[
                "Sunbed & Cabana Booking",
                "Bottle Service Requests",
                "VIP List Management",
                "Event Inquiries",
                "Weather & Amenity Info"
            ]}
            dialogue={[
                {
                    speaker: "Guest",
                    text: "I'd like to book a cabana for this Saturday."
                },
                {
                    speaker: "Agent",
                    text: "Excellent choice. For Saturday, we have a Front Row Cabana available. It includes a bottle of champagne. Shall I reserve it for you?"
                },
                {
                    speaker: "Guest",
                    text: "Yes please. How much is it?"
                },
                {
                    speaker: "Agent",
                    text: "The Front Row Cabana is $500 for the day. I can send you a secure payment link to confirm your reservation immediately."
                }
            ]}
        />
    );
}
