
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function findWellness() {
    const { data: agents, error } = await supabase
        .from('agents')
        .select('id, name, user_id')
        .ilike('name', '%Wellness%')
        .eq('user_id', '7cba02cf-66d1-4321-a987-0e43ac304aae'); // EXAMPLE_AGENT_USER_ID

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('Wellness Agents:', JSON.stringify(agents, null, 2));
}

findWellness();
