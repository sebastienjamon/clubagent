"use client";

import { createClient } from "@/lib/supabase/client";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Phone, Calendar, Clock, Play, ArrowRight } from "lucide-react";
import { Call } from "@/types";
import Link from "next/link";

export function CallsTable({ agentId, isReadOnly }: { agentId: string, isReadOnly?: boolean }) {
    const [calls, setCalls] = useState<Call[]>([]);
    const [loading, setLoading] = useState(true);

    // If read-only (Example Agent), use anonymous client to bypass "authenticated" RLS restrictions
    // because the policy allows anon access but blocks non-owner authenticated users.
    const supabase = isReadOnly
        ? createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
        : createClient();

    useEffect(() => {
        const fetchCalls = async () => {
            const { data } = await supabase
                .from('calls')
                .select('*')
                .eq('agent_id', agentId)
                .order('created_at', { ascending: false })
                .limit(50); // Fetch more for scrolling

            if (data) setCalls(data);
            setLoading(false);
        };

        fetchCalls();
    }, [agentId, supabase, isReadOnly]);

    if (loading) return <div className="text-sand-500 text-sm p-4">Loading history...</div>;

    if (calls.length === 0) {
        return (
            <div className="text-center p-8 bg-sand-50 rounded-xl border border-sand-200">
                <Phone className="w-8 h-8 text-sand-300 mx-auto mb-2" />
                <p className="text-sand-500">No calls recorded yet.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-sand-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-sand-50 text-sand-600 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Caller</th>
                            <th className="px-6 py-4">Date & Time</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Duration</th>
                            <th className="px-6 py-4">Recording</th>
                            <th className="px-6 py-4 text-right">Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-sand-100">
                        {calls.map((call) => {
                            const startDate = call.started_at ? new Date(call.started_at) : null;
                            const endDate = call.ended_at ? new Date(call.ended_at) : null;
                            const duration = startDate && endDate
                                ? Math.round((endDate.getTime() - startDate.getTime()) / 1000)
                                : 0;

                            const formatDuration = (sec: number) => {
                                const m = Math.floor(sec / 60);
                                const s = sec % 60;
                                return `${m}m ${s}s`;
                            };

                            return (
                                <tr key={call.id} className="hover:bg-sand-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-ocean-900">
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-sand-400" />
                                            {call.caller_number || "Unknown"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sand-600">
                                        <div className="flex flex-col">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {startDate?.toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-sand-400">
                                                <Clock className="w-3 h-3" />
                                                {startDate?.toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${call.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-sand-100 text-sand-700'}`}>
                                            {call.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sand-600 font-mono text-xs">
                                        {formatDuration(duration)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {call.recording_url ? (
                                            <audio controls className="h-8 w-32" src={call.recording_url} preload="none" />
                                        ) : (
                                            <span className="text-sand-400 text-xs">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/dashboard/agents/${agentId}/calls/${call.id}`}
                                            className="inline-flex items-center justify-center p-2 text-ocean-600 hover:bg-ocean-50 rounded-lg transition-colors"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
