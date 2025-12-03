"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { CalendarCheck, Users, Clock } from "lucide-react";

type Reservation = {
    id: string;
    customer_name: string;
    customer_phone: string;
    party_size: number;
    reservation_time: string;
    notes: string;
    status: string;
    created_at: string;
};

export function ReservationsList({ agentId }: { agentId: string }) {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchReservations = async () => {
            const { data } = await supabase
                .from('reservations')
                .select('*')
                .eq('agent_id', agentId)
                .order('created_at', { ascending: false });

            if (data) setReservations(data);
            setLoading(false);
        };

        fetchReservations();
    }, [agentId, supabase]);

    if (loading) return <div className="text-sand-500 text-sm">Loading reservations...</div>;

    if (reservations.length === 0) {
        return (
            <div className="text-center p-8 bg-sand-50 rounded-xl border border-sand-200">
                <CalendarCheck className="w-8 h-8 text-sand-300 mx-auto mb-2" />
                <p className="text-sand-500">No reservations found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reservations.map((res) => (
                <div key={res.id} className="bg-white p-4 rounded-xl border border-sand-200 shadow-sm flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gold-50 text-gold-600 rounded-xl">
                            <CalendarCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-ocean-950">{res.customer_name || "Guest"}</p>
                            <p className="text-sm text-sand-500">{res.customer_phone}</p>
                            {res.notes && <p className="text-xs text-sand-400 mt-1 max-w-xs truncate">{res.notes}</p>}
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-sm text-ocean-900 font-medium">
                            <Users className="w-4 h-4 text-sand-400" />
                            {res.party_size || "?"} ppl
                        </div>
                        <div className="flex items-center justify-end gap-1 text-xs text-sand-500 mt-1">
                            <Clock className="w-3 h-3" />
                            {res.reservation_time ? new Date(res.reservation_time).toLocaleString() : "TBD"}
                        </div>
                        <span className="inline-block mt-2 px-2 py-0.5 bg-gold-100 text-gold-800 text-[10px] font-bold uppercase rounded-full">
                            {res.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
