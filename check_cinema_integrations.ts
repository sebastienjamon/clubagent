
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const CINEMA_AGENT_ID = '66b24517-4697-4ad8-8474-4afb29ad907a';

async function checkIntegrations() {
    const { data: agent, error } = await supabase
        .from('agents')
        .select('integrations')
        .eq('id', CINEMA_AGENT_ID)
        .single();

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('Cinema Integrations:', JSON.stringify(agent.integrations, null, 2));
}

checkIntegrations();
