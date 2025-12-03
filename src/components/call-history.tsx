"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Phone, Calendar, Clock, FileText, Play } from "lucide-react";

type Call = {
    id: string;
    caller_number: string;
    status: string;
    transcript: string;
    summary: string;
    recording_url: string;
    started_at: string;
    ended_at: string;
};

export function CallHistory({ agentId }: { agentId: string }) {
    const [calls, setCalls] = useState<Call[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchCalls = async () => {
            const { data } = await supabase
                .from('calls')
                .select('*')
                .eq('agent_id', agentId)
                .order('created_at', { ascending: false })
                .limit(10);

            if (data) setCalls(data);
            setLoading(false);
        };

        fetchCalls();

        // Realtime subscription could go here
    }, [agentId, supabase]);

    if (loading) return <div className="text-sand-500 text-sm">Loading history...</div>;

    if (calls.length === 0) {
        return (
            <div className="text-center p-8 bg-sand-50 rounded-xl border border-sand-200">
                <Phone className="w-8 h-8 text-sand-300 mx-auto mb-2" />
                <p className="text-sand-500">No calls recorded yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {calls.map((call) => (
                <div key={call.id} className="bg-white p-4 rounded-xl border border-sand-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-ocean-50 text-ocean-600 rounded-lg">
                                <Phone className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="font-bold text-ocean-950">{call.caller_number || "Unknown Caller"}</p>
                                <p className="text-xs text-sand-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(call.started_at).toLocaleDateString()}
                                    <Clock className="w-3 h-3 ml-1" />
                                    {new Date(call.started_at).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase rounded-full">
                            {call.status}
                        </span>
                    </div>

                    {call.summary && (
                        <div className="mb-3 p-3 bg-sand-50 rounded-lg text-sm text-ocean-900">
                            <span className="font-bold text-ocean-700 block mb-1 text-xs uppercase tracking-wide">Summary</span>
                            {call.summary}
                        </div>
                    )}

                    {call.recording_url && (
                        <div className="mb-3">
                            <span className="font-bold text-ocean-700 block mb-1 text-xs uppercase tracking-wide">Recording</span>
                            <audio controls className="w-full h-8" src={call.recording_url}>
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}

                    <div className="flex gap-2">
                        {call.transcript && (
                            <button className="flex items-center gap-1 text-xs font-bold text-sand-600 hover:text-sand-800 bg-sand-50 px-3 py-2 rounded-lg transition-colors">
                                <FileText className="w-3 h-3" /> Transcript
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
