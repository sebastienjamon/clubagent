import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udqgkcsqhnujzceznnxr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWdrY3NxaG51anpjZXpubnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyNTI5OSwiZXhwIjoyMDgwMTAxMjk5fQ.OqaRzRTGFDm5qUQ0TlktMbyNeAH7M4ivTxAct1rG72U';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function listTables() {
    // There isn't a direct "list tables" in JS client easily without admin rights or rpc, 
    // but we can try to select from 'calls' and see the error, or 'phone_numbers'.

    console.log("Checking 'phone_numbers'...");
    const { data: phones, error: phoneError } = await supabase.from('phone_numbers').select('*').limit(1);
    console.log("Phone Numbers:", phones ? "Exists" : phoneError?.message);

    console.log("Checking 'calls'...");
    const { data: calls, error: callError } = await supabase.from('calls').select('*').limit(1);
    console.log("Calls:", calls ? "Exists" : callError?.message);

    console.log("Checking 'reservations'...");
    const { data: res, error: resError } = await supabase.from('reservations').select('*').limit(1);
    console.log("Reservations:", res ? "Exists" : resError?.message);
}

listTables();
