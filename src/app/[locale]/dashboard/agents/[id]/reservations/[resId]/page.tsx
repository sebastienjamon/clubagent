import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, Phone, Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default async function ReservationDetailPage({ params }: { params: Promise<{ id: string; resId: string }> }) {
    const { id: agentId, resId } = await params;
    const supabase = await createClient();

    const { data: reservation, error } = await supabase
        .from('reservations')
        .select(`
            *,
            calls (
                id,
                summary,
                recording_url,
                transcript
            )
        `)
        .eq('id', resId)
        .single();

    if (error || !reservation) {
        return <div className="p-8 text-red-600">Reservation not found</div>;
    }

    const statusColor: Record<string, string> = {
        confirmed: 'bg-green-50 text-green-700',
        cancelled: 'bg-red-50 text-red-700',
        pending: 'bg-amber-50 text-amber-700'
    };

    const StatusIcon: Record<string, any> = {
        confirmed: CheckCircle,
        cancelled: XCircle,
        pending: AlertCircle
    };

    const colorClass = statusColor[reservation.status] || 'bg-gray-50 text-gray-700';
    const Icon = StatusIcon[reservation.status] || AlertCircle;

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <Link
                    href={`/dashboard/agents/${agentId}`}
                    className="text-sm text-sand-500 hover:text-ocean-700 mb-4 inline-flex items-center gap-1 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Agent
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-ocean-950 mb-2">Reservation Details</h1>
                        <div className="flex items-center gap-4 text-sand-600">
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> Created: {new Date(reservation.created_at).toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide flex items-center gap-2 ${colorClass}`}>
                        <Icon className="w-4 h-4" />
                        {reservation.status}
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-sand-100 bg-sand-50/50">
                    <h2 className="text-lg font-bold text-ocean-900 mb-4">Customer Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-sand-500 uppercase tracking-wide mb-1">Phone Number</label>
                            <div className="flex items-center gap-2 text-ocean-900 font-medium">
                                <Phone className="w-4 h-4 text-sand-400" />
                                {reservation.customer_phone || "Unknown"}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-sand-500 uppercase tracking-wide mb-1">Party Size</label>
                            <div className="flex items-center gap-2 text-ocean-900 font-medium">
                                <User className="w-4 h-4 text-sand-400" />
                                {reservation.party_size || "Not specified"}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h2 className="text-lg font-bold text-ocean-900 mb-4">Reservation Notes</h2>
                    <div className="bg-sand-50 p-4 rounded-lg border border-sand-100 text-ocean-800 leading-relaxed">
                        {reservation.notes || "No notes available."}
                    </div>
                </div>

                {reservation.calls && (
                    <div className="p-6 border-t border-sand-100 bg-ocean-50/30">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-ocean-900">Source Call</h2>
                            <Link
                                href={`/dashboard/agents/${agentId}/calls/${reservation.calls.id}`}
                                className="text-sm font-bold text-ocean-600 hover:text-ocean-800 hover:underline"
                            >
                                View Call Details &rarr;
                            </Link>
                        </div>
                        <p className="text-sm text-sand-600 mb-2 line-clamp-2">
                            {reservation.calls.summary}
                        </p>
                        {reservation.calls.recording_url && (
                            <audio controls className="w-full h-8 mt-2" src={reservation.calls.recording_url} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
