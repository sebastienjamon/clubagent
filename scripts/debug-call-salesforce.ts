
import { createClient } from '@supabase/supabase-js';
import { saveToSalesforce } from '../src/lib/integrations/salesforce';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function debugCall(vapiCallId: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    console.log(`Searching for Call ID: ${vapiCallId}`);

    // 1. Find the call
    const { data: call, error } = await supabase
        .from('calls')
        .select('*')
        .eq('vapi_call_id', vapiCallId)
        .single();

    if (error || !call) {
        console.error("❌ Call not found in Supabase. Webhook might not have fired or failed.");
        if (error) console.error(error);
        return;
    }

    console.log("✅ Call found in Supabase!");
    console.log(`- ID: ${call.id}`);
    console.log(`- Status: ${call.status}`);
    console.log(`- Summary: ${call.summary ? 'Present' : 'Missing'}`);
    console.log(`- Agent ID: ${call.agent_id}`);

    // 2. Check the Agent
    const { data: agent, error: agentError } = await supabase
        .from('agents')
        .select('*')
        .eq('id', call.agent_id)
        .single();

    if (agentError || !agent) {
        console.error("❌ Linked Agent not found.");
        return;
    }

    console.log(`✅ Agent found: ${agent.name}`);
    const integrations = agent.integrations || {};
    console.log(`- Salesforce Enabled: ${integrations.salesforce_enabled}`);
    console.log(`- Salesforce Config: ${integrations.salesforce_config ? 'Present' : 'Missing'}`);

    if (integrations.salesforce_enabled && integrations.salesforce_config) {
        console.log("🔄 Attempting manual sync to Salesforce...");
        const result = await saveToSalesforce(integrations.salesforce_config, {
            type: 'call',
            payload: call
        }, agent.name);

        if (result.success) {
            console.log("✅ SUCCESS! Manually created Case ID:", result.id);
        } else {
            console.error("❌ FAILED to create Case:", result.error);
        }
    } else {
        console.warn("⚠️ Salesforce integration was NOT enabled for this agent at the time of the call.");
    }
}

const callId = process.argv[2] || '019ae4c6-87be-7115-8828-c450e43fa2f3';
debugCall(callId);
