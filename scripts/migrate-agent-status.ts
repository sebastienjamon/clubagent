import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udqgkcsqhnujzceznnxr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWdrY3NxaG51anpjZXpubnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyNTI5OSwiZXhwIjoyMDgwMTAxMjk5fQ.OqaRzRTGFDm5qUQ0TlktMbyNeAH7M4ivTxAct1rG72U';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function migrateStatuses() {
    console.log("Migrating agent statuses...");

    const { data: agents, error } = await supabase.from('agents').select('*');

    if (error || !agents) {
        console.error("Failed to fetch agents", error);
        return;
    }

    for (const agent of agents) {
        let status = 'inactive';

        // Determine status based on name/business
        if (agent.name.includes("Front Desk") || agent.business_name?.includes("Beach Club")) {
            status = 'active';
        } else if (agent.name.includes("Cinema") || agent.name.includes("Wellness")) {
            status = 'inactive';
        }

        // Update integrations
        const currentIntegrations = agent.integrations || {};
        const newIntegrations = {
            ...currentIntegrations,
            status: status
        };

        console.log(`Updating ${agent.name} to ${status}...`);

        const { error: updateError } = await supabase
            .from('agents')
            .update({ integrations: newIntegrations })
            .eq('id', agent.id);

        if (updateError) {
            console.error(`Failed to update ${agent.name}:`, updateError);
        }
    }

    console.log("Migration complete!");
}

migrateStatuses();
