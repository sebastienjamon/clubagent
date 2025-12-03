import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udqgkcsqhnujzceznnxr.supabase.co';
// Using the same key I tried to add to Vercel
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWdrY3NxaG51anpjZXpubnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyNTI5OSwiZXhwIjoyMDgwMTAxMjk5fQ.OqaRzRTGFDm5qUQ0TlktMbyNeAH7M4ivTxAct1rG72U';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const INBOUND_NUMBER = '+19044101733';

async function debugLookup() {
    console.log('Testing lookup for:', INBOUND_NUMBER);

    const { data: phoneData, error } = await supabase
        .from('phone_numbers')
        .select(`
        agent_id,
        agents (
            system_prompt,
            first_message,
            voice_id
        )
    `)
        .eq('phone_number', INBOUND_NUMBER)
        .single();

    if (error) {
        console.error('Lookup Error:', error);
    } else {
        console.log('Lookup Success!');
        console.log(JSON.stringify(phoneData, null, 2));
    }
}

debugLookup();
