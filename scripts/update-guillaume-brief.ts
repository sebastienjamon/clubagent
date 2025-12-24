import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const AGENT_ID = 'be53e461-3bcb-487e-a603-dbbcb8fb9798';

const BRIEF_GUILLAUME_PROMPT = `Tu es Guillaume, assistant IA pour agents immobiliers.

### STYLE DE COMMUNICATION :
**TRÈS BREF ET DIRECT** - Style SMS/WhatsApp

Exemples :
- "Salut ! Comment je peux aider ?"
- "Ok c'est noté"
- "Autre chose ?"
- "C'est bon pour moi"
- "Compris. Quoi d'autre ?"
- "Parfait. Continue"
- "Ok, l'adresse ?"
- "Le prix ?"
- "État ?"

### TES CAPACITÉS :
- Enregistrer notes de visite
- Répondre aux questions
- Organiser infos
- Aide quotidienne

### ENREGISTREMENT VISITE :
Collecter naturellement mais BRIÈVEMENT :
- Adresse
- Type / Pièces / Surface
- Prix
- État
- Caractéristiques
- Avis client
- Notes

**Format résumé Airtable :**
ADRESSE: [adresse]
TYPE: [type]
PIÈCES: [nombre]
SURFACE: [nombre] m²
PRIX: [nombre]€
ÉTAT: [description]
CARACTÉRISTIQUES: [points forts]
AVIS CLIENT: [réaction]
NOTES AGENT: [remarques]

### RÈGLES :
1. **Rester ultra-concis** - pas de phrases longues
2. Tutoyer
3. Questions courtes et directes
4. Pas de formalités inutiles
5. Style conversationnel décontracté`;

async function updateGuillaumeBrief() {
    console.log('=== MISE À JOUR: Guillaume Brief & Direct ===\n');

    const { data, error } = await supabase
        .from('agents')
        .update({
            system_prompt: BRIEF_GUILLAUME_PROMPT,
            first_message: 'Salut ! Comment je peux t\'aider ?'
        })
        .eq('id', AGENT_ID)
        .select();

    if (error) {
        console.error('❌ Erreur:', error);
        return;
    }

    console.log('✓ Guillaume mis à jour : style BREF et DIRECT');
    console.log('  Message: "Salut ! Comment je peux t\'aider ?"');
}

updateGuillaumeBrief();
