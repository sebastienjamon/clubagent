import { VerticalLandingPage } from "@/components/vertical-landing-page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Assistant Visite Immobilière | Enregistrement Notes Propriétés",
    description: "Enregistrez vos visites immobilières par téléphone. Notre assistant intelligent structure automatiquement vos notes et les synchronise avec Airtable.",
    keywords: ["assistant immobilier", "notes visite propriété", "enregistrement visite immobilière", "agent immobilier IA"],
};

export default function AgentImmobilierPage() {
    return (
        <VerticalLandingPage
            title={<>Votre Assistant <br /> Visite Immobilière</>}
            subtitle="Gagnez du temps après chaque visite. Appelez simplement Sophie pour enregistrer toutes les informations importantes de vos visites de propriétés."
            heroGradient="gold"
            ctaLabel="Appeler Sophie"
            ctaNumber="+33 9 39 03 47 10"
            features={[
                "Enregistrement Conversationnel",
                "Structuration Automatique",
                "Synchronisation Airtable",
                "Disponible 24/7",
                "Notes Vocales Rapides",
                "Suivi Client Intégré"
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
