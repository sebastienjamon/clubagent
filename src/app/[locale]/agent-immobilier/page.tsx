import { VerticalLandingPage } from "@/components/vertical-landing-page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Guillaume - Assistant IA pour Agents Immobiliers",
    description: "Assistant virtuel disponible par téléphone pour gérer vos dossiers, enregistrer vos notes et organiser votre quotidien immobilier.",
    keywords: ["assistant immobilier IA", "agent virtuel immobilier", "notes propriété", "airtable immobilier"],
};

export default function AgentImmobilierPage() {
    return (
        <VerticalLandingPage
            title={<>Guillaume <br /> Assistant IA Immobilier</>}
            subtitle="Appelez Guillaume quand vous en avez besoin. Il vous aide à gérer vos dossiers, enregistrer vos notes et organiser votre activité."
            heroGradient="gold"
            ctaLabel="Appeler Guillaume"
            ctaNumber="+33 9 39 03 47 10"
            features={[
                "Conversation Naturelle",
                "Multi-usages",
                "Synchronisation Airtable",
                "Disponible 24/7",
                "Adaptable à vos besoins",
                "Zéro configuration"
            ]}
            dialogue={[
                {
                    speaker: "Guest",
                    text: "Bonjour Guillaume, je viens de visiter un T3."
                },
                {
                    speaker: "Agent",
                    text: "Salut ! C'était où ?"
                },
                {
                    speaker: "Guest",
                    text: "15 rue de la Paix, Paris 2e. 75 m², 350 000 euros."
                },
                {
                    speaker: "Agent",
                    text: "Ok. État ?"
                },
                {
                    speaker: "Guest",
                    text: "Rénové. Belle terrasse 15m², dernier étage."
                },
                {
                    speaker: "Agent",
                    text: "Le client ?"
                },
                {
                    speaker: "Guest",
                    text: "Il a adoré la terrasse. Il veut faire une offre."
                },
                {
                    speaker: "Agent",
                    text: "C'est noté. Autre chose ?"
                }
            ]}
        />
    );
}
