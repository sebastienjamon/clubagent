'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function hireAgent(agentId: string) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { success: false, error: "Unauthorized: Please sign in." };
        }

        // 1. Fetch current agent to get existing integrations
        const { data: agent, error: fetchError } = await supabase
            .from('agents')
            .select('*')
            .eq('id', agentId)
            .single();

        if (fetchError || !agent) {
            console.error("Agent fetch error:", fetchError);
            return { success: false, error: "Agent not found or unavailable." };
        }

        // 2. Clone the agent for the current user
        const { id, created_at, user_id, ...agentData } = agent;

        // Set status to active for the new copy and SANITIZE sensitive credentials
        // We do NOT want to copy the template's secrets to the user's agent
        const newIntegrations = {
            ...(agentData.integrations || {}),
            status: 'active',
            salesforce_config: agentData.integrations?.salesforce_config ? {
                ...agentData.integrations.salesforce_config,
                client_secret: '', // Clear secret
                client_id: '',     // Clear ID (user should provide their own or use global)
                instance_url: ''   // Clear URL
            } : undefined,
            airtable_config: agentData.integrations?.airtable_config ? {
                ...agentData.integrations.airtable_config,
                api_key: ''        // Clear API Key
            } : undefined
        };

        const { error: insertError } = await supabase
            .from('agents')
            .insert({
                ...agentData,
                user_id: user.id,
                integrations: newIntegrations
            });

        if (insertError) {
            console.error("Clone failed:", insertError);
            return { success: false, error: insertError.message };
        }

        revalidatePath('/dashboard');
        return { success: true };
    } catch (error: any) {
        console.error("Unexpected error in hireAgent:", error);
        return { success: false, error: error.message || "An unexpected error occurred." };
    }
}
