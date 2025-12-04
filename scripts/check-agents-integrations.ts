
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function listAgents() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: agents, error } = await supabase
        .from('agents')
        .select('id, name, integrations');

    if (error) {
        console.error(error);
        return;
    }

    console.log("Agents:");
    agents.forEach((agent: any) => {
        console.log(`- ${agent.name} (${agent.id})`);
        console.log(`  Salesforce Enabled: ${agent.integrations?.salesforce_enabled}`);
        console.log(`  Salesforce Config Present: ${!!agent.integrations?.salesforce_config}`);
        if (agent.integrations?.salesforce_config) {
            console.log(`  Object: ${agent.integrations.salesforce_config.object_name}`);
        }
        console.log("---");
    });
}

listAgents();
