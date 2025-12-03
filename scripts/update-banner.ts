import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udqgkcsqhnujzceznnxr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWdrY3NxaG51anpjZXpubnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyNTI5OSwiZXhwIjoyMDgwMTAxMjk5fQ.OqaRzRTGFDm5qUQ0TlktMbyNeAH7M4ivTxAct1rG72U';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function updateAgentBanner() {
    // Find the agent with "Front Desk" in the name
    const { data: agents, error: findError } = await supabase
        .from('agents')
        .select('*')
        .ilike('name', '%Front Desk%')
        .limit(1);

    if (findError || !agents || agents.length === 0) {
        console.error("Could not find Front Desk agent", findError);
        return;
    }

    const agent = agents[0];
    console.log("Found agent:", agent.name, agent.id);

    // Update the banner_url
    const { error: updateError } = await supabase
        .from('agents')
        .update({ banner_url: '/hotel-banner.png' })
        .eq('id', agent.id);

    if (updateError) {
        console.error("Failed to update banner:", updateError);
    } else {
        console.log("Successfully updated banner for agent:", agent.name);
    }
}

updateAgentBanner();
