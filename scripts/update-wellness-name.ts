import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udqgkcsqhnujzceznnxr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWdrY3NxaG51anpjZXpubnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyNTI5OSwiZXhwIjoyMDgwMTAxMjk5fQ.OqaRzRTGFDm5qUQ0TlktMbyNeAH7M4ivTxAct1rG72U';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function updateAgent() {
    console.log("Updating 'Wellness & PT' agent...");

    // 1. Find the agent (using the old name to be safe, or partial match)
    const { data: agents, error: findError } = await supabase
        .from('agents')
        .select('id, name')
        .ilike('name', '%Wellness%') // Match "Wellness & PT" or just "Wellness"
        .limit(1);

    if (findError || !agents || agents.length === 0) {
        console.error("Could not find agent.", findError);
        return;
    }

    const agent = agents[0];
    console.log(`Found agent: ${agent.name} (${agent.id})`);

    // 2. Update the details
    const { error: updateError } = await supabase
        .from('agents')
        .update({
            name: "Wellness",
            business_name: "GYM CLUB"
        })
        .eq('id', agent.id);

    if (updateError) {
        console.error("Failed to update agent:", updateError);
    } else {
        console.log("Successfully updated agent to:");
        console.log("- Name: Wellness");
        console.log("- Business Name: GYM CLUB");
    }
}

updateAgent();
