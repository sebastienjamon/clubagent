
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const USER_CINEMA_ID = '826a4f79-b12c-42a0-b2c7-f7f6e07db656'; // From previous debug output

async function checkUserPhone() {
    const { data: phones, error } = await supabase
        .from('phone_numbers')
        .select('*')
        .eq('agent_id', USER_CINEMA_ID);

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('User Cinema Phone Numbers:', JSON.stringify(phones, null, 2));
}

checkUserPhone();
