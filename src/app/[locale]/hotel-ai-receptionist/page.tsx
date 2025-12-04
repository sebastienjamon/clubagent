import { VerticalLandingPage } from "@/components/vertical-landing-page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hotel AI Receptionist | Virtual Front Desk Agent",
    description: "Enhance guest satisfaction with a virtual receptionist that manages check-ins, room service, and concierge requests instantly.",
    keywords: ["virtual receptionist hotel", "hotel ai agent", "digital concierge", "automated hotel front desk"],
};

export default function HotelPage() {
    return (
        <VerticalLandingPage
            title={<>24/7 Front Desk <br /> Excellence</>}
            subtitle="Elevate your guest services with an AI receptionist that handles check-ins, room service, and concierge requests with white-glove precision."
            heroGradient="gold"
            ctaLabel="Call Front Desk"
            ctaNumber="+1 (904) 410-1733"
            features={[
                "Room Service Orders",
                "Check-in & Check-out Assistance",
                "Concierge Recommendations",
                "Housekeeping Requests",
                "Wake-up Calls & Amenities"
            ]}
            dialogue={[
                {
                    speaker: "Guest",
                    text: "Hi, I need some extra towels sent up to room 304."
                },
                {
                    speaker: "Agent",
                    text: "Certainly. I'll have housekeeping deliver fresh towels to room 304 right away. Is there anything else you need?"
                },
                {
                    speaker: "Guest",
                    text: "Actually, can you recommend a good Italian place nearby?"
                },
                {
                    speaker: "Agent",
                    text: "Absolutely. 'Luigi's Trattoria' is highly rated and just a 5-minute walk from the lobby. Would you like me to text you the directions?"
                }
            ]}
        />
    );
}
