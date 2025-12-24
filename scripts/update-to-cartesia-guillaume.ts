import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const AGENT_ID = 'be53e461-3bcb-487e-a603-dbbcb8fb9798';
const CARTESIA_VOICE_ID = 'cartesia-Qrl71rx6Yg8RvyPYRGCQ'; // Guillaume

async function updateToCartesiaGuillaume() {
    console.log('=== MISE À JOUR: Cartesia Voice Guillaume ===\n');

    const { data, error } = await supabase
        .from('agents')
        .update({ voice_id: CARTESIA_VOICE_ID })
        .eq('id', AGENT_ID)
        .select();

    if (error) {
        console.error('❌ Erreur:', error);
        return;
    }

    console.log('✓ Voice mise à jour avec succès!');
    console.log('  Voice ID:', CARTESIA_VOICE_ID);
    console.log('  Voice: Guillaume (Cartesia)');
    console.log('\n⚠️  Note: Assurez-vous que la clé API Cartesia est configurée dans VAPI');
    console.log('  Clé actuelle: sk_car_NFCtYbKLY8yhFuJ5ayZqC8');
}

updateToCartesiaGuillaume();
