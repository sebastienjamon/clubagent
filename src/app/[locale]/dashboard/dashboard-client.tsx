'use client';

import Link from "next/link";
import { ConciergeBell, Phone, Activity, Building2, Sparkles, Dumbbell, Palmtree, Clapperboard, Bot } from "lucide-react";
import { Agent } from "@/types";
import { EXAMPLE_AGENT_USER_ID } from "@/lib/constants";
import { AgentQRCode } from "@/components/agent-qr-code";

interface DashboardClientProps {
    activeAgents: Agent[];
    availableAgents: Agent[];
}

export function DashboardClient({ activeAgents, availableAgents }: DashboardClientProps) {

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-end justify-between border-b border-sand-200 pb-6">
                <div>
                    <h1 className="text-4xl font-bold text-ocean-950 tracking-tight">My Squad</h1>
                    <p className="text-sand-900/60 mt-2 text-lg font-light">Manage your active digital concierge team.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeAgents.map((agent) => {
                    // Extract phone number safely
                    // @ts-ignore
                    const phoneNumber = agent.phone_numbers?.[0]?.phone_number || "No Number Linked";
                    const formattedNumber = phoneNumber === "No Number Linked"
                        ? phoneNumber
                        : phoneNumber.replace(/(\+1)(\d{3})(\d{3})(\d{4})/, "$1 ($2) $3-$4"); // Basic US formatting

                    return (
                        <div key={agent.id} className="group bg-white rounded-2xl border border-sand-200 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ocean-900/10 relative">

                            {/* Card Header - Beach Gradient or Custom Image */}
                            <div className="h-32 bg-gradient-to-br from-ocean-600 to-ocean-500 relative overflow-hidden">
                                {agent.banner_url ? (
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: 'url(' + agent.banner_url + ')' }}
                                    />
                                ) : (
                                    <>
                                        {/* Abstract Waves */}
                                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/20 rounded-full blur-2xl"></div>
                                    </>
                                )}

                                {/* Overlay for text readability if needed, though text is below */}
                                <div className="absolute inset-0 bg-black/10"></div>

                                {/* @ts-ignore */}
                                {agent.user_id === EXAMPLE_AGENT_USER_ID || agent.master_agent_id ? (
                                    <div className="absolute top-3 left-3 z-10 bg-gold-400/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />
                                        Example
                                    </div>
                                ) : null}     {/* Status Badge */}
                                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-bold uppercase tracking-widest border border-white/30 shadow-sm z-10">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                    </span>
                                    Live
                                </div>
                            </div>

                            {/* Avatar - Overlapping */}
                            <div className="absolute top-20 left-8">
                                <div className="w-20 h-20 bg-white p-1.5 rounded-full shadow-xl shadow-ocean-900/5">
                                    <div className="w-full h-full bg-sand-100 rounded-full flex items-center justify-center overflow-hidden border border-sand-200 group-hover:border-ocean-200 transition-colors relative">
                                        {/* Placeholder Avatar */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-sand-200 to-sand-50 opacity-50"></div>
                                        {agent.name.includes("Immobilier") ? (
                                            <Building2 className="w-8 h-8 text-ocean-800 relative z-10" />
                                        ) : agent.business_name?.includes("Beach Club") ? (
                                            <Palmtree className="w-8 h-8 text-ocean-800 relative z-10" />
                                        ) : agent.name.includes("Front Desk") ? (
                                            <ConciergeBell className="w-8 h-8 text-ocean-800 relative z-10" />
                                        ) : agent.name.includes("Wellness") ? (
                                            <Dumbbell className="w-8 h-8 text-ocean-800 relative z-10" />
                                        ) : agent.name.includes("Cinema") ? (
                                            <Clapperboard className="w-8 h-8 text-ocean-800 relative z-10" />
                                        ) : (
                                            <Bot className="w-8 h-8 text-ocean-800 relative z-10" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-12 p-8">
                                <div className="mb-6">
                                    <h3 className="font-bold text-2xl text-ocean-950 mb-1 group-hover:text-ocean-700 transition-colors">{agent.name}</h3>
                                    <p className="text-sand-500 font-medium uppercase tracking-wider text-xs flex items-center gap-2">
                                        {/* <Building2 className="w-3 h-3" /> */}
                                        {agent.business_name}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 text-sm text-ocean-800 mb-8 bg-sand-50/50 p-4 rounded-xl border border-sand-100 font-mono relative">
                                    <Phone className="w-4 h-4 text-ocean-400" />
                                    {phoneNumber !== "No Number Linked" ? (
                                        <>
                                            <a href={'tel:' + phoneNumber} className="hover:text-ocean-600 transition-colors hover:underline relative z-10">
                                                {formattedNumber}
                                            </a>
                                        </>
                                    ) : (
                                        <span className="text-sand-400 italic">No Number Linked</span>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        href={'/dashboard/agents/' + agent.id}
                                        className="flex-1 flex items-center justify-center px-4 py-3 bg-ocean-950 text-white rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-ocean-900 transition-all shadow-lg shadow-ocean-900/10 hover:shadow-ocean-900/20"
                                    >
                                        View Details
                                    </Link>
                                    {phoneNumber !== "No Number Linked" && (
                                        <AgentQRCode agentName={agent.name} phoneNumber={phoneNumber} />
                                    )}
                                    <button className="px-4 py-3 text-sand-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-xl transition-colors border border-transparent hover:border-ocean-100">
                                        <Activity className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
