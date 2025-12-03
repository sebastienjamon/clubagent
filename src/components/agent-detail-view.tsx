"use client";

import { useState } from "react";
import { Agent } from "@/types";
import { AgentForm } from "./agent-form";
import { CallsTable } from "./calls-table";

import { ActionsView } from "./reservations-table";
import { AgentIntegrationsForm } from "./agent-integrations-form";
import { LayoutDashboard, Settings, Sparkles } from "lucide-react";

export function AgentDetailView({ agent, isReadOnly }: { agent: Agent, isReadOnly?: boolean }) {
    const [activeTab, setActiveTab] = useState<'activity' | 'config' | 'integrations'>('activity');

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
                            <CallsTable agentId={agent.id} />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-ocean-950 mb-6 flex items-center gap-2">
                                Actions
                            </h2>
                            <ActionsView agent={agent} />
                        </div>
                    </div>
                ) : activeTab === 'config' ? (
                    <AgentForm initialData={agent} isReadOnly={isReadOnly} />
                ) : (
                    <AgentIntegrationsForm initialData={agent} isReadOnly={isReadOnly} />
                )}
            </div>
        </div>
    );
}
