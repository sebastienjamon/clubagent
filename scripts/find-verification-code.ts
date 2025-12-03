import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function findCall() {
    const phoneNumber = '+18579715733'; // The Beach Club number

    console.log(`Searching for latest call to: ${phoneNumber}`);

    const { data: calls, error } = await supabase
        .from('calls')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

    if (error) {
        console.error("Error finding call:", error);
        return;
    }

    if (!calls || calls.length === 0) {
        console.log("No calls found in database.");
        return;
    }

    const call = calls[0];

    console.log(`--- Latest Call Found (${call.created_at}) ---`);
    console.log("Transcript:", call.transcript);
    console.log("Summary:", call.summary);
    console.log("Recording URL:", call.recording_url);
}

findCall();
