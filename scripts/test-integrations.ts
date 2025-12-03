import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udqgkcsqhnujzceznnxr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWdrY3NxaG51anpjZXpubnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyNTI5OSwiZXhwIjoyMDgwMTAxMjk5fQ.OqaRzRTGFDm5qUQ0TlktMbyNeAH7M4ivTxAct1rG72U';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testIntegrationsUpdate() {
    console.log("Testing integrations update...");

    // 1. Get an agent (Cinema)
    const { data: agents } = await supabase
        .from('agents')
        .select('*')
        .ilike('name', '%Cinema%')
        .limit(1);

    if (!agents || agents.length === 0) {
        console.error("Agent not found");
        return;
    }

    const agent = agents[0];
    console.log("Found agent:", agent.name);
    console.log("Current integrations:", agent.integrations);

    // 2. Update with new 'status' field
    const newIntegrations = {
        ...agent.integrations,
        status: 'inactive' // Test adding this field
    };

    const { data, error } = await supabase
        .from('agents')
        .update({ integrations: newIntegrations })
        .eq('id', agent.id)
        .select();

    if (error) {
        console.error("Update failed:", error);
    } else {
        console.log("Update success!");
        console.log("New integrations:", data[0].integrations);
    }
}

testIntegrationsUpdate();
