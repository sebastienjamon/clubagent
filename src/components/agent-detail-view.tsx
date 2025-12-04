"use client";

import { useState } from "react";
import { Agent } from "@/types";
import { AgentForm } from "./agent-form";
import { CallsTable } from "./calls-table";

import { ActionsView } from "./reservations-table";
import { AgentIntegrationsForm } from "./agent-integrations-form";
import { LayoutDashboard, Settings, Sparkles } from "lucide-react";

export function AgentDetailView({ agent, originalAgent, isReadOnly, isConfigReadOnly }: { agent: Agent, originalAgent?: Agent | null, isReadOnly?: boolean, isConfigReadOnly?: boolean }) {
    const [activeTab, setActiveTab] = useState<'activity' | 'config' | 'integrations'>('activity');

    // If originalAgent is provided (for Managed Agent copies), use it for the Activity View
    // This ensures we use the correct credentials (from the original agent) instead of the user's empty copy.
    const dataSourceId = originalAgent ? originalAgent.id : agent.id;
    const displayAgent = originalAgent || agent;

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
                    <AgentForm initialData={displayAgent} isReadOnly={isConfigReadOnly ?? isReadOnly} />
                ) : (
                    <AgentIntegrationsForm initialData={displayAgent} isReadOnly={isReadOnly} />
                )}
            </div>
        </div>
    );
}
