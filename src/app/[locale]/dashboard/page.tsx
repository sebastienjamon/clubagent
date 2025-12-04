import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { EXAMPLE_AGENT_USER_ID } from "@/lib/constants";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: agents } = await supabase
        .from('agents')
        .select('*, phone_numbers(phone_number)')
        .or(`user_id.eq.${user.id},user_id.eq.${EXAMPLE_AGENT_USER_ID}`)
        .order('created_at', { ascending: false });

    // 1. Active Agents: Agents owned by the user OR shared agents marked as active (defaults)
    const activeAgents = agents?.filter(a => {
        const isOwned = a.user_id === user.id;
        // @ts-ignore
        const isSharedActive = a.user_id === EXAMPLE_AGENT_USER_ID && a.integrations?.status === 'active';
        return isOwned || isSharedActive;
    }) || [];

    // Post-process active agents to attach original phone numbers for Managed Agents
    // if the user's copy doesn't have one linked.
    for (const agent of activeAgents) {
        // @ts-ignore
        if (agent.user_id === user.id && (!agent.phone_numbers || agent.phone_numbers.length === 0) && agent.master_agent_id) {
            // Find the master agent
            // @ts-ignore
            const masterAgent = agents?.find(a => a.id === agent.master_agent_id);
            // @ts-ignore
            if (masterAgent && masterAgent.phone_numbers && masterAgent.phone_numbers.length > 0) {
                // @ts-ignore
                agent.phone_numbers = masterAgent.phone_numbers;
            }
        }
    }

    // 2. Available Agents: Shared agents marked as inactive (store) AND user doesn't have a copy
    const availableAgents = agents?.filter(a => {
        // Must be a shared agent
        if (a.user_id !== EXAMPLE_AGENT_USER_ID) return false;

        // Must be 'inactive' (store item)
        // @ts-ignore
        if (a.integrations?.status === 'active') return false;

        // User must NOT already have a copy of this agent (check by name)
        const userHasCopy = agents.some(userAgent =>
            userAgent.user_id === user.id && userAgent.name === a.name
        );

        return !userHasCopy;
    }) || [];

    return (
        <DashboardClient
            activeAgents={activeAgents}
            availableAgents={availableAgents}
        />
    );
}
