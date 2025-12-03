import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udqgkcsqhnujzceznnxr.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWdrY3NxaG51anpjZXpubnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyNTI5OSwiZXhwIjoyMDgwMTAxMjk5fQ.OqaRzRTGFDm5qUQ0TlktMbyNeAH7M4ivTxAct1rG72U';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const PHONE_NUMBER = '+19044101733'; // Normalized
const USER_ID = '7cba02cf-66d1-4321-a987-0e43ac304aae';

async function linkNumber() {
    console.log('Linking number', PHONE_NUMBER, 'to user', USER_ID);

    // 1. Get the agent
    const { data: agents, error: agentError } = await supabase
        .from('agents')
        .select('id, name')
        .eq('user_id', USER_ID)
        .limit(1);

    if (agentError || !agents || agents.length === 0) {
        console.error('Error finding agent:', agentError);
        return;
    }

    const agent = agents[0];
    console.log('Found agent:', agent.name, '(', agent.id, ')');

    // 2. Insert/Update phone number
    const { data, error } = await supabase
        .from('phone_numbers')
        .upsert([
            {
                agent_id: agent.id,
                phone_number: PHONE_NUMBER,
                provider: 'twilio'
            }
        ], { onConflict: 'phone_number' })
        .select();

    if (error) {
        console.error('Error linking number:', error);
    } else {
        console.log('Success! Number linked:', data);
    }
}

linkNumber();
