import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udqgkcsqhnujzceznnxr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWdrY3NxaG51anpjZXpubnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyNTI5OSwiZXhwIjoyMDgwMTAxMjk5fQ.OqaRzRTGFDm5qUQ0TlktMbyNeAH7M4ivTxAct1rG72U';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function updateAgent() {
    console.log("Updating 'The Beach Club' agent...");

    // Find the agent
    const { data: agents, error: findError } = await supabase
        .from('agents')
        .select('*')
        .eq('name', 'The Beach Club')
        .limit(1);

    if (findError || !agents || agents.length === 0) {
        console.error("Could not find 'The Beach Club' agent", findError);
        return;
    }

    const agent = agents[0];

    // Remove "Santa Pola" from system prompt
    const newSystemPrompt = agent.system_prompt
        .replace(/Santa Pola/g, "")
        .replace(/The Beach Club/g, "The Beach Club"); // Keep generic name

    const { error: updateError } = await supabase
        .from('agents')
        .update({
            name: "Beach Club Reservations", // Purpose-driven name
            business_name: "The Beach Club", // Generic business name
            system_prompt: newSystemPrompt,
            first_message: "Welcome to The Beach Club. How may I assist you today?"
        })
        .eq('id', agent.id);

    if (updateError) {
        console.error("Failed to update agent:", updateError);
    } else {
        console.log("Successfully updated agent to 'Beach Club Reservations'");
    }
}

updateAgent();
