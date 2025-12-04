
import { createClient } from '@supabase/supabase-js';
import { saveToSalesforce } from '../src/lib/integrations/salesforce';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testSalesforceCreate() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error("Missing Supabase credentials");
        return;
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 1. Get the first agent with Salesforce enabled
    const { data: agents, error } = await supabase
        .from('agents')
        .select('*')
        .not('integrations', 'is', null);

    if (error || !agents || agents.length === 0) {
        console.error("No agents found or error fetching agents:", error);
        return;
    }

    const agent = agents.find((a: any) => a.integrations?.salesforce_enabled && a.integrations?.salesforce_config);

    if (!agent) {
        console.error("No agent found with Salesforce enabled.");
        return;
    }

    console.log(`Testing with Agent: ${agent.name} (${agent.id})`);
    const config = agent.integrations.salesforce_config;

    // 2. Create Dummy Call Payload
    const dummyCall = {
        caller_number: '+15550199',
        summary: 'Test Call - Customer inquiring about VIP membership',
        transcript: 'Customer: Hi, do you have VIP access? Agent: Yes we do.',
        recording_url: 'https://example.com/recording.mp3'
    };

    console.log("Attempting to save Case to Salesforce...");

    // 3. Call saveToSalesforce
    const result = await saveToSalesforce(config, {
        type: 'call',
        payload: dummyCall
    }, agent.name);

    if (result.success) {
        console.log("✅ SUCCESS! Case created with ID:", result.id);
    } else {
        console.error("❌ FAILED to create Case:", result.error);
    }
}

testSalesforceCreate();
