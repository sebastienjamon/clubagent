import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udqgkcsqhnujzceznnxr.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWdrY3NxaG51anpjZXpubnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyNTI5OSwiZXhwIjoyMDgwMTAxMjk5fQ.OqaRzRTGFDm5qUQ0TlktMbyNeAH7M4ivTxAct1rG72U';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const USER_ID = '7cba02cf-66d1-4321-a987-0e43ac304aae';

async function seed() {
    console.log('Seeding agent for user:', USER_ID);

    const { data, error } = await supabase
        .from('agents')
        .insert([
            {
                user_id: USER_ID,
                name: 'Front Desk',
                business_name: 'The Grand Hotel',
                system_prompt: 'You are a helpful receptionist for The Grand Hotel. You are polite, professional, and helpful.',
                first_message: 'Hello, welcome to The Grand Hotel. How may I assist you today?',
                banner_url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop',
                voice_id: '21m00Tcm4TlvDq8ikWAM' // Rachel
            }
        ])
        .select();

    if (error) {
        console.error('Error seeding agent:', error);
    } else {
        console.log('Success! Agent created:', data);
    }
}

seed();
