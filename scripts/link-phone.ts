import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udqgkcsqhnujzceznnxr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWdrY3NxaG51anpjZXpubnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyNTI5OSwiZXhwIjoyMDgwMTAxMjk5fQ.OqaRzRTGFDm5qUQ0TlktMbyNeAH7M4ivTxAct1rG72U';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const args = process.argv.slice(2);
const AGENT_NAME_PART = args[0];
const PHONE_NUMBER = args[1];

if (!AGENT_NAME_PART || !PHONE_NUMBER) {
    console.error("Usage: npx tsx scripts/link-phone.ts <agent_name_part> <phone_number>");
    console.log("Example: npx tsx scripts/link-phone.ts 'Reservations' '+1904...'");
    process.exit(1);
}

async function linkPhone() {
    console.log(`Searching for agent matching "${AGENT_NAME_PART}"...`);

    // 1. Find the agent
    const { data: agents, error: findError } = await supabase
        .from('agents')
        .select('id, name')
        .ilike('name', `%${AGENT_NAME_PART}%`)
        .limit(1);

    if (findError || !agents || agents.length === 0) {
        console.error("Could not find agent.", findError);
        return;
    }

    const agent = agents[0];
    console.log(`Found agent: ${agent.name} (${agent.id})`);

    // 2. Link the number
    console.log(`Linking number ${PHONE_NUMBER}...`);

    const { data, error: linkError } = await supabase
        .from('phone_numbers')
        .upsert([
            {
                agent_id: agent.id,
                phone_number: PHONE_NUMBER,
                provider: 'vapi' // or twilio, doesn't matter much for lookup
            }
        ], { onConflict: 'phone_number' })
        .select();

    if (linkError) {
        console.error("Failed to link number:", linkError);
    } else {
        console.log("Success! Number linked.");
    }
}

linkPhone();
