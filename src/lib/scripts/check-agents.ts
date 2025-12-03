
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkAgents() {
    const { data: phoneNumbers, error } = await supabase
        .from('phone_numbers')
        .select(`
      phone_number,
      agent:agents (
        name
      )
    `);

    if (error) {
        console.error('Error fetching phone numbers:', error);
        return;
    }

    console.log('Agents with phone numbers:');
    phoneNumbers.forEach((pn: any) => {
        console.log(`- ${pn.agent.name}: ${pn.phone_number}`);
    });
}

checkAgents();

