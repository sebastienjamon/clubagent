import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udqgkcsqhnujzceznnxr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWdrY3NxaG51anpjZXpubnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyNTI5OSwiZXhwIjoyMDgwMTAxMjk5fQ.OqaRzRTGFDm5qUQ0TlktMbyNeAH7M4ivTxAct1rG72U';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fixVoiceId() {
    console.log("Fixing voice ID for 'Reservations' agent...");

    // Find the agent
    const { data: agents, error: findError } = await supabase
        .from('agents')
        .select('*')
        .eq('name', 'Reservations')
        .limit(1);

    if (findError || !agents || agents.length === 0) {
        console.error("Could not find 'Reservations' agent", findError);
        return;
    }

    const agent = agents[0];

    // Update to "Freya" (Expressive, Energetic)
    const VALID_VOICE_ID = "jsCqWAovK2LkecY7zXl4";

    const { error: updateError } = await supabase
        .from('agents')
        .update({
            voice_id: VALID_VOICE_ID
        })
        .eq('id', agent.id);

    if (updateError) {
        console.error("Failed to update agent:", updateError);
    } else {
        console.log("Successfully updated agent voice ID to:", VALID_VOICE_ID);
    }
}

fixVoiceId();
