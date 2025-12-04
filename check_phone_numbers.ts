
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPhones() {
    const { data: phones, error } = await supabase
        .from('phone_numbers')
        .select('agent_id, phone_number')
        .in('agent_id', [
            '66b24517-4697-4ad8-8474-4afb29ad907a', // Cinema
            'be53e461-3bcb-487e-a603-dbbcb8fb9798'  // Wellness
        ]);

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('Phone Numbers:', JSON.stringify(phones, null, 2));
}

checkPhones();
