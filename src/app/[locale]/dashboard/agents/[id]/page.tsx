
import { AgentDetailView } from "@/components/agent-detail-view";
import { Agent } from "@/types";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

import { EXAMPLE_AGENT_USER_ID } from "@/lib/constants";

export default async function AgentEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    // Debug: Check User
    const { data: { user }, error: authError } = await supabase.auth.getUser();


    const { data: agent, error: fetchError } = await supabase
        .from('agents')
        .select('*')
        .eq('id', id)
        .single();

    if (fetchError) {
        console.error("AgentEditor - Fetch Error:", JSON.stringify(fetchError, null, 2));
    }

    if (!agent) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold text-red-600">Agent not found</h1>
                <div className="mt-4 p-4 bg-gray-100 rounded text-sm font-mono">
                    <p>Requested ID: {id}</p>
                    <p>User ID: {user?.id || 'Not logged in'}</p>
                    <p>Error Code: {fetchError?.code}</p>
                    <p>Error Message: {fetchError?.message}</p>
                    <p className="mt-2 font-bold text-ocean-700">Likely Cause: Missing RLS Policies</p>
                </div>
            </div>
        );
    }

    const isGlobalReadOnly = agent.user_id === EXAMPLE_AGENT_USER_ID && user?.id !== EXAMPLE_AGENT_USER_ID;

    // If the agent has a master_agent_id, it is a "Linked Copy" and must be Read-Only.
    // This applies to ALL agents (Cinema, Wellness, Beach Club, etc.)
    // @ts-ignore
    const isLinkedAgent = !!agent.master_agent_id;
    const isConfigReadOnly = isGlobalReadOnly || isLinkedAgent;

    // If it's a linked copy, we need to fetch the MASTER agent
    // to get the correct credentials for the Activity view (Salesforce/Airtable).
    let originalAgent = null;
    if (isLinkedAgent) {
        const { data: sourceAgent } = await supabase
            .from('agents')
            .select('*')
            // @ts-ignore
            .eq('id', agent.master_agent_id)
            .single();

        if (sourceAgent) {
            originalAgent = sourceAgent;
        }
    }

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <Link href="/dashboard" className="text-sm text-sand-500 hover:text-ocean-700 mb-4 inline-block transition-colors">&larr; Back to Dashboard</Link>
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-ocean-950">{agent.name}</h1>
                    {(isGlobalReadOnly || isConfigReadOnly) && (
                        <span className="px-3 py-1 bg-gold-400/20 text-gold-600 text-xs font-bold uppercase tracking-widest rounded-full border border-gold-400/30">
                            Read Only
                        </span>
                    )}
                </div>
                <p className="text-sand-500">Configure your agent's behavior and personality.</p>
            </div>

            {/* 
                For Managed Agents (Cinema/Wellness), we enforce FULL read-only mode for non-admins.
                This locks both Configuration and Integrations tabs, and hides Save buttons.
                This ensures the UI matches the "Example" agent look (Hidden placeholders, no edit buttons).
            */}
            <AgentDetailView
                agent={agent}
                originalAgent={originalAgent}
                isReadOnly={isConfigReadOnly}
                isConfigReadOnly={isConfigReadOnly}
            />
        </div>
    );
}
