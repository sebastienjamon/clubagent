
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    const { data: calls, error: callsError } = await supabase
        .from('calls')
        .select('*')
        .limit(1);

    if (callsError) console.error('Calls Error:', callsError);
    else console.log('Calls Columns:', calls && calls.length > 0 ? Object.keys(calls[0]) : 'No data');

    const { data: reservations, error: resError } = await supabase
        .from('reservations')
        .select('*')
        .limit(1);

    if (resError) console.error('Reservations Error:', resError);
    else console.log('Reservations Columns:', reservations && reservations.length > 0 ? Object.keys(reservations[0]) : 'No data');
}

checkSchema();
