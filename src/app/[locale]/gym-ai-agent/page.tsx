import { VerticalLandingPage } from "@/components/vertical-landing-page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gym AI Receptionist | Fitness Club Automation",
    description: "Streamline your fitness center with an AI receptionist that handles class bookings, membership inquiries, and personal training schedules 24/7.",
    keywords: ["gym ai receptionist", "fitness club automation", "automated gym booking", "virtual gym front desk"],
};

export default function GymPage() {
    return (
        <VerticalLandingPage
            title={<>Power Up Your <br /> Gym Management</>}
            subtitle="Keep your members moving with an AI receptionist that manages class schedules, membership questions, and PT bookings without breaking a sweat."
            heroGradient="emerald"
            ctaLabel="Call Front Desk"
            ctaNumber="+33 9 39 03 47 10"
            features={[
                "Class Scheduling & Booking",
                "Membership Inquiries",
                "Personal Training Coordination",
                "Facility Hours & Info",
                "Waitlist Management"
            ]}
            dialogue={[
                {
                    speaker: "Guest",
                    text: "Do you have any spin classes available tomorrow morning?"
                },
                {
                    speaker: "Agent",
                    text: "Yes, we have a 'Sunrise Cycle' at 6:00 AM and 'Power Spin' at 8:30 AM. Both have spots open. Would you like to book one?"
                },
                {
                    speaker: "Guest",
                    text: "I'll take the 8:30 AM class."
                },
                {
                    speaker: "Agent",
                    text: "Great. I've booked you for 'Power Spin' at 8:30 AM tomorrow. Don't forget your water bottle!"
                }
            ]}
        />
    );
}
