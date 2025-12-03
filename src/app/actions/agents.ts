'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function hireAgent(agentId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    // 1. Fetch current agent to get existing integrations
    const { data: agent, error: fetchError } = await supabase
        .from('agents')
        .select('*')
        .eq('id', agentId)
        .single();

    if (fetchError || !agent) {
        throw new Error("Agent not found");
    }

    // 2. Clone the agent for the current user
    const { id, created_at, user_id, ...agentData } = agent;

    // Set status to active for the new copy
    const newIntegrations = {
        ...(agentData.integrations || {}),
        status: 'active'
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
        throw new Error("Failed to hire agent");
    }

    revalidatePath('/dashboard');
    return { success: true };
}
