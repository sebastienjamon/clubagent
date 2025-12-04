
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const CINEMA_AGENT_ID = '66b24517-4697-4ad8-8474-4afb29ad907a';

async function checkData() {
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Current User:', user ? user.id : 'Anonymous');

    const { count: callsCount, error: callsError } = await supabase
        .from('calls')
        .select('*', { count: 'exact', head: true })
        .eq('agent_id', CINEMA_AGENT_ID);

    if (callsError) console.error('Calls Error:', callsError);
    else console.log('Cinema Calls Count:', callsCount);

    const { count: resCount, error: resError } = await supabase
        .from('reservations')
        .select('*', { count: 'exact', head: true })
        .eq('agent_id', CINEMA_AGENT_ID);

    if (resError) console.error('Reservations Error:', resError);
    else console.log('Cinema Reservations Count:', resCount);
}

checkData();
