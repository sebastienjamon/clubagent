import { VerticalLandingPage } from "@/components/vertical-landing-page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sophie - Assistante IA pour Agents Immobiliers",
    description: "Assistante virtuelle disponible par téléphone pour gérer vos dossiers, enregistrer vos notes et organiser votre quotidien immobilier.",
    keywords: ["assistant immobilier IA", "agent virtuel immobilier", "notes propriété", "airtable immobilier"],
};

export default function AgentImmobilierPage() {
    return (
        <VerticalLandingPage
            title={<>Sophie <br /> Assistante IA Immobilière</>}
            subtitle="Appelez Sophie quand vous en avez besoin. Elle vous aide à gérer vos dossiers, enregistrer vos notes et organiser votre activité."
            heroGradient="gold"
            ctaLabel="Appeler Sophie"
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
                    text: "Bonjour Sophie, je viens de visiter un appartement."
                },
                {
                    speaker: "Agent",
                    text: "Super ! Raconte-moi, c'était où ?"
                },
                {
                    speaker: "Guest",
                    text: "15 rue de la Paix à Paris, 75002. C'est un T3, environ 75 mètres carrés à 350 000 euros."
                },
                {
                    speaker: "Agent",
                    text: "Parfait ! Dans quel état est l'appartement ?"
                },
                {
                    speaker: "Guest",
                    text: "Très bon état, rénové récemment. Il y a une belle terrasse de 15m² et c'est au dernier étage."
                },
                {
                    speaker: "Agent",
                    text: "Génial ! Et ton client, qu'est-ce qu'il en a pensé ?"
                },
                {
                    speaker: "Guest",
                    text: "Il a adoré ! La terrasse l'a vraiment séduit. Il veut faire une offre."
                },
                {
                    speaker: "Agent",
                    text: "Excellent ! J'ai bien enregistré toutes ces informations. Elles seront synchronisées dans votre base Airtable. Bonne chance pour l'offre !"
                }
            ]}
        />
    );
}
