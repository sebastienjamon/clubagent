import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udqgkcsqhnujzceznnxr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWdrY3NxaG51anpjZXpubnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyNTI5OSwiZXhwIjoyMDgwMTAxMjk5fQ.OqaRzRTGFDm5qUQ0TlktMbyNeAH7M4ivTxAct1rG72U';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function renameAgent() {
    console.log("Renaming 'Beach Club Reservations' to 'Reservations'...");

    // Find the agent
    const { data: agents, error: findError } = await supabase
        .from('agents')
        .select('*')
        .eq('name', 'Beach Club Reservations')
        .limit(1);

    if (findError || !agents || agents.length === 0) {
        console.error("Could not find 'Beach Club Reservations' agent", findError);
        return;
    }

    const agent = agents[0];

    const { error: updateError } = await supabase
        .from('agents')
        .update({
            name: "Reservations"
        })
        .eq('id', agent.id);

    if (updateError) {
        console.error("Failed to update agent:", updateError);
    } else {
        console.log("Successfully updated agent name to 'Reservations'");
    }
}

renameAgent();
