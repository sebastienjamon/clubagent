import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, Phone, Calendar, Clock, FileText, Play } from "lucide-react";

export default async function CallDetailPage({ params }: { params: Promise<{ id: string; callId: string }> }) {
    const { id: agentId, callId } = await params;
    const supabase = await createClient();

    const { data: call, error } = await supabase
        .from('calls')
        .select('*')
        .eq('id', callId)
        .single();

    if (error || !call) {
        return <div className="p-8 text-red-600">Call not found</div>;
    }

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
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <Link
                    href={`/dashboard/agents/${agentId}`}
                    className="text-sm text-sand-500 hover:text-ocean-700 mb-4 inline-flex items-center gap-1 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Agent
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-ocean-950 mb-2">Call Details</h1>
                        <div className="flex items-center gap-4 text-sand-600">
                            <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" /> {call.caller_number || "Unknown"}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" /> {startDate?.toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {startDate?.toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide
                        ${call.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-sand-100 text-sand-700'}`}>
                        {call.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    {/* Summary Card */}
                    <div className="bg-white p-6 rounded-xl border border-sand-200 shadow-sm">
                        <h2 className="text-lg font-bold text-ocean-900 mb-4">Summary</h2>
                        <p className="text-ocean-800 leading-relaxed">
                            {call.summary || "No summary available."}
                        </p>
                    </div>

                    {/* Transcript Card */}
                    <div className="bg-white p-6 rounded-xl border border-sand-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-ocean-900 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-sand-400" /> Transcript
                            </h2>
                        </div>
                        <div className="bg-sand-50 p-4 rounded-lg text-sm font-mono text-ocean-800 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto border border-sand-100">
                            {call.transcript || "No transcript available."}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Recording Card */}
                    <div className="bg-white p-6 rounded-xl border border-sand-200 shadow-sm">
                        <h2 className="text-lg font-bold text-ocean-900 mb-4 flex items-center gap-2">
                            <Play className="w-5 h-5 text-sand-400" /> Recording
                        </h2>
                        {call.recording_url ? (
                            <div className="space-y-2">
                                <audio controls className="w-full" src={call.recording_url}>
                                    Your browser does not support the audio element.
                                </audio>
                                <a
                                    href={call.recording_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-ocean-600 hover:underline block text-center"
                                >
                                    Download Audio
                                </a>
                            </div>
                        ) : (
                            <p className="text-sand-500 text-sm">No recording available.</p>
                        )}
                    </div>

                    {/* Metadata Card */}
                    <div className="bg-white p-6 rounded-xl border border-sand-200 shadow-sm">
                        <h2 className="text-lg font-bold text-ocean-900 mb-4">Metadata</h2>
                        <dl className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-sand-500">Duration</dt>
                                <dd className="font-mono text-ocean-900">{formatDuration(duration)}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sand-500">Call ID</dt>
                                <dd className="font-mono text-ocean-900 text-xs truncate max-w-[150px]" title={call.id}>{call.id}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sand-500">Vapi ID</dt>
                                <dd className="font-mono text-ocean-900 text-xs truncate max-w-[150px]" title={call.vapi_call_id || ""}>{call.vapi_call_id || "-"}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
