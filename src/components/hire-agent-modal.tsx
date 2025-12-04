'use client';

import { useState } from 'react';
import { Agent } from '@/types';
import { X, Check, Loader2, Dumbbell, Clapperboard, Palmtree, ConciergeBell, Bot } from 'lucide-react';
import { hireAgent } from '@/app/actions/agents';

interface HireAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
    availableAgents: Agent[];
}

export function HireAgentModal({ isOpen, onClose, availableAgents }: HireAgentModalProps) {
    const [hiringId, setHiringId] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleHire = async (agentId: string) => {
        setHiringId(agentId);
        try {
            const result = await hireAgent(agentId);
            if (result.success) {
                onClose();
            } else {
                alert("Failed to hire agent: " + (result.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Failed to hire agent:", error);
            alert("An unexpected error occurred.");
        } finally {
            setHiringId(null);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-ocean-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-sand-200">

                {/* Header */}
                <div className="px-8 py-6 border-b border-sand-100 flex items-center justify-between bg-sand-50/50">
                    <div>
                        <h2 className="text-2xl font-bold text-ocean-950">Agent Store</h2>
                        <p className="text-sand-500 text-sm mt-1">Select an agent to add to your squad.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-sand-400 hover:text-ocean-600 hover:bg-sand-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Grid */}
                <div className="p-8 max-h-[60vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {availableAgents.map((agent) => (
                            <div key={agent.id} className="group bg-white border border-sand-200 rounded-2xl p-6 hover:border-ocean-200 hover:shadow-lg hover:shadow-ocean-900/5 transition-all duration-300 flex flex-col">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-14 h-14 bg-sand-50 rounded-2xl flex items-center justify-center border border-sand-100 group-hover:scale-110 transition-transform duration-300">
                                        {agent.business_name?.includes("Beach Club") ? (
                                            <Palmtree className="w-7 h-7 text-ocean-800" />
                                        ) : agent.name.includes("Front Desk") ? (
                                            <ConciergeBell className="w-7 h-7 text-ocean-800" />
                                        ) : agent.name.includes("Wellness") ? (
                                            <Dumbbell className="w-7 h-7 text-ocean-800" />
                                        ) : agent.name.includes("Cinema") ? (
                                            <Clapperboard className="w-7 h-7 text-ocean-800" />
                                        ) : (
                                            <Bot className="w-7 h-7 text-ocean-800" />
                                        )}
                                    </div>
                                    {agent.banner_url && (
                                        <div className="w-20 h-12 rounded-lg overflow-hidden opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                                            <img src={agent.banner_url} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-lg font-bold text-ocean-950 mb-1">{agent.name}</h3>
                                <p className="text-xs font-bold uppercase tracking-wider text-sand-500 mb-4">{agent.business_name}</p>

                                <p className="text-sand-600 text-sm mb-6 line-clamp-2">
                                    {agent.system_prompt || "A specialized AI assistant ready to help your customers."}
                                </p>

                                <button
                                    onClick={() => handleHire(agent.id)}
                                    disabled={hiringId === agent.id}
                                    className="mt-auto w-full py-3 bg-ocean-50 text-ocean-900 font-bold rounded-xl hover:bg-ocean-950 hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {hiringId === agent.id ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Hiring...
                                        </>
                                    ) : (
                                        <>
                                            Hire Agent
                                        </>
                                    )}
                                </button>
                            </div>
                        ))}

                        {/* Custom Agent Card */}
                        <div className="group bg-white border-2 border-dashed border-sand-200 rounded-2xl p-6 hover:border-ocean-400 hover:bg-ocean-50/30 transition-all duration-300 flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-sand-200 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <Bot className="w-7 h-7 text-sand-400 group-hover:text-ocean-600 transition-colors" />
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-ocean-950 mb-1">Custom Agent</h3>
                            <p className="text-xs font-bold uppercase tracking-wider text-sand-500 mb-4">Build Your Own</p>

                            <p className="text-sand-600 text-sm mb-6 line-clamp-2">
                                Create a fully custom agent with your own prompt, voice, and personality.
                            </p>

                            <a
                                href="/dashboard/agents/request"
                                className="mt-auto w-full py-3 bg-white border border-sand-200 text-ocean-900 font-bold rounded-xl hover:border-ocean-600 hover:text-ocean-700 transition-all flex items-center justify-center gap-2"
                            >
                                Create Custom
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
