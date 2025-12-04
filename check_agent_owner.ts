
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAgent() {
    const { data: agents, error } = await supabase
        .from('agents')
        .select('id, name, user_id')
        .or('name.ilike.%Beach%,name.ilike.%Reservations%');

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('Found Agents:', JSON.stringify(agents, null, 2));
}

checkAgent();
