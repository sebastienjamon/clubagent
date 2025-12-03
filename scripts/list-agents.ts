import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const USER_ID = '7cba02cf-66d1-4321-a987-0e43ac304aae';

async function listAgents() {
    console.log("Listing agents for user:", USER_ID);

    const { data, error } = await supabase
        .from('agents')
        .select('id, name, business_name, user_id')
        .eq('user_id', USER_ID);

    if (error) {
        console.error("Error listing agents:", error);
    } else {
        console.log("Agents found:", data);
    }
}

listAgents();
