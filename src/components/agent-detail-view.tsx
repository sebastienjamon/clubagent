"use client";

import { useState } from "react";
import { Agent } from "@/types";
import { AgentForm } from "./agent-form";
import { CallsTable } from "./calls-table";

import { ActionsView } from "./reservations-table";
import { AgentIntegrationsForm } from "./agent-integrations-form";
import { LayoutDashboard, Settings, Sparkles } from "lucide-react";

export function AgentDetailView({ agent, isReadOnly, isConfigReadOnly }: { agent: Agent, isReadOnly?: boolean, isConfigReadOnly?: boolean }) {
    const [activeTab, setActiveTab] = useState<'activity' | 'config' | 'integrations'>('activity');

    // For Managed Agents (Cinema/Wellness), if the user is not the admin (isConfigReadOnly is true),
    // we want to show the EXAMPLE data (from the original agent), not the user's empty copy.
    let dataSourceId = agent.id;
    if (isConfigReadOnly) {
        if (agent.name === 'Cinema') dataSourceId = '66b24517-4697-4ad8-8474-4afb29ad907a';
        else if (agent.name === 'Wellness') dataSourceId = 'be53e461-3bcb-487e-a603-dbbcb8fb9798';
    }

    // If we are redirecting to a data source, we need to ensure we pass the CONFIGURATION of that source
    // to the views, otherwise Salesforce/Airtable integrations will fail (because the user's copy has empty credentials).
    // We can't easily fetch the full agent here synchronously in a client component without refactoring.
    // HOWEVER, for the "Cinema" and "Wellness" agents, we know they use Environment Variables for credentials.
    // So we can construct a "Virtual" agent object that has the correct flags enabled, and the backend actions
    // (fetchSalesforceRecords) will pick up the Env Vars when they see empty credentials + enabled flag.

    const displayAgent = { ...agent, id: dataSourceId };

    // Force enable integrations for the display agent if it's the example source
    if (dataSourceId !== agent.id) {
        if (!displayAgent.integrations) {
            // @ts-ignore
            displayAgent.integrations = {};
        }
        // @ts-ignore
        displayAgent.integrations.salesforce_enabled = true;
        // @ts-ignore
        displayAgent.integrations.airtable_enabled = true;

        // Ensure config objects exist so the views don't crash, 
        // but keep them empty so the backend uses Env Vars.
        // @ts-ignore
        if (!displayAgent.integrations.salesforce_config) displayAgent.integrations.salesforce_config = { object_name: 'Case' };
        // @ts-ignore
        if (!displayAgent.integrations.airtable_config) displayAgent.integrations.airtable_config = {};
    }

    return (
        <div className="space-y-6">
            {/* Tabs Header */}
            <div className="flex border-b border-sand-200 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                <button
                    onClick={() => setActiveTab('activity')}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'activity'
                        ? 'border-ocean-600 text-ocean-900'
                        : 'border-transparent text-sand-500 hover:text-ocean-700'
                        }`}
                >
                    <LayoutDashboard className="w-4 h-4" />
                    Activity
                </button>
                <button
                    onClick={() => setActiveTab('config')}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'config'
                        ? 'border-ocean-600 text-ocean-900'
                        : 'border-transparent text-sand-500 hover:text-ocean-700'
                        }`}
                >
                    <Settings className="w-4 h-4" />
                    Configuration
                </button>
                <button
                    onClick={() => setActiveTab('integrations')}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'integrations'
                        ? 'border-ocean-600 text-ocean-900'
                        : 'border-transparent text-sand-500 hover:text-ocean-700'
                        }`}
                >
                    <Sparkles className="w-4 h-4" />
                    Integrations
                </button>
            </div>

            {/* Content */}
            <div className="pt-4">
                {activeTab === 'activity' ? (
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-xl font-bold text-ocean-950 mb-6 flex items-center gap-2">
                                Recent Calls
                            </h2>
                            <CallsTable agentId={dataSourceId} isReadOnly={isReadOnly} />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-ocean-950 mb-6 flex items-center gap-2">
                                Actions
                            </h2>
                            <ActionsView agent={displayAgent} isReadOnly={isReadOnly} />
                        </div>
                    </div>
                ) : activeTab === 'config' ? (
                    <AgentForm initialData={agent} isReadOnly={isConfigReadOnly ?? isReadOnly} />
                ) : (
                    <AgentIntegrationsForm initialData={agent} isReadOnly={isReadOnly} />
                )}
            </div>
        </div>
    );
}
