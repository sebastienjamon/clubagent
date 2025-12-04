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

        // If it's owned, it's active. If it's shared/default, it's active unless user has a copy? 
        // Actually, if user has a copy, we should probably hide the shared default to avoid duplicates?
        // For now, let's just show owned agents and shared defaults.
        return isOwned || isSharedActive;
    }) || [];

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
