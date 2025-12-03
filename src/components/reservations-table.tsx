"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { CalendarCheck, User, Clock, ArrowRight, Database, Table as TableIcon, Webhook, CloudLightning } from "lucide-react";
import { Reservation, Agent } from "@/types";
import Link from "next/link";
import { fetchAirtableRecords } from "@/app/actions/integrations";
import { cn } from "@/lib/utils";

import { SalesforceDataView } from "./salesforce-data-view";

export function ActionsView({ agent }: { agent: Agent }) {
    const [activeTab, setActiveTab] = useState<'webapp' | 'airtable' | 'salesforce' | 'custom'>('webapp');
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [airtableRecords, setAirtableRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    // Fetch Web App Reservations
    useEffect(() => {
        if (activeTab !== 'webapp') return;

        const fetchReservations = async () => {
            setLoading(true);
            const { data } = await supabase
                .from('reservations')
                .select('*')
                .eq('agent_id', agent.id)
                .order('created_at', { ascending: false });

            if (data) setReservations(data);
            setLoading(false);
        };

        fetchReservations();
    }, [agent.id, supabase, activeTab]);

    // Fetch Airtable Records
    useEffect(() => {
        if (activeTab !== 'airtable') return;

        const loadAirtable = async () => {
            setLoading(true);
            const config = agent.integrations?.airtable_config;
            if (config) {
                const { success, records } = await fetchAirtableRecords(config, agent.name);
                if (success) setAirtableRecords(records);
            }
            setLoading(false);
        };

        loadAirtable();
    }, [agent.integrations, activeTab]);

    const renderContent = () => {
        if (activeTab === 'salesforce') {
            return <SalesforceDataView agent={agent} />;
        }

        if (loading) return <div className="text-sand-500 text-sm p-8 text-center">Loading data...</div>;

        if (activeTab === 'webapp') {
            if (reservations.length === 0) {
                return (
                    <div className="text-center p-8 bg-sand-50 rounded-xl border border-sand-200">
                        <CalendarCheck className="w-8 h-8 text-sand-300 mx-auto mb-2" />
                        <p className="text-sand-500">No reservations found in Web App.</p>
                    </div>
                );
            }

            return (
                <div className="overflow-hidden rounded-xl border border-sand-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-sand-50 text-sand-600 font-bold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Created At</th>
                                    <th className="px-6 py-4">Notes</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sand-100">
                                {reservations.map((res) => (
                                    <tr key={res.id} className="hover:bg-sand-50/50 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-ocean-900">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-sand-400" />
                                                {res.customer_phone || "Unknown"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sand-600">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(res.created_at).toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sand-600 max-w-xs truncate" title={res.notes || ""}>
                                            {res.notes || "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                                                res.status === 'confirmed' ? 'bg-green-50 text-green-700' :
                                                    res.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                                                        'bg-amber-50 text-amber-700'
                                            )}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/dashboard/agents/${agent.id}/reservations/${res.id}`}
                                                className="inline-flex items-center justify-center p-2 text-ocean-600 hover:bg-ocean-50 rounded-lg transition-colors"
                                            >
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        if (activeTab === 'airtable') {
            if (!agent.integrations?.airtable_enabled) {
                return (
                    <div className="text-center p-8 bg-sand-50 rounded-xl border border-sand-200">
                        <TableIcon className="w-8 h-8 text-sand-300 mx-auto mb-2" />
                        <p className="text-sand-500 font-medium">Airtable Integration Disabled</p>
                        <p className="text-xs text-sand-400 mt-1">Enable it in the Integrations tab.</p>
                    </div>
                );
            }

            // Check for Embed URL
            const embedUrl = agent.integrations.airtable_config?.embed_url;
            if (embedUrl) {
                return (
                    <div className="overflow-hidden rounded-xl border border-sand-200 bg-white shadow-sm h-[600px]">
                        <iframe
                            className="airtable-embed"
                            src={embedUrl}
                            frameBorder="0"
                            width="100%"
                            height="100%"
                            style={{ background: 'transparent' }}
                        />
                    </div>
                );
            }

            if (airtableRecords.length === 0) {
                return (
                    <div className="text-center p-8 bg-sand-50 rounded-xl border border-sand-200">
                        <TableIcon className="w-8 h-8 text-sand-300 mx-auto mb-2" />
                        <p className="text-sand-500">No records found in Airtable.</p>
                    </div>
                );
            }

            return (
                <div className="overflow-hidden rounded-xl border border-sand-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-sand-50 text-sand-600 font-bold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Phone</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Source</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sand-100">
                                {airtableRecords.map((record) => (
                                    <tr key={record.id} className="hover:bg-sand-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-ocean-900">
                                            {record.fields.Name || "-"}
                                        </td>
                                        <td className="px-6 py-4 text-sand-600">
                                            {record.fields.Phone || "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                                                {record.fields.Status || "Unknown"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sand-600">
                                            {record.fields.Date ? new Date(record.fields.Date).toLocaleDateString() : "-"}
                                        </td>
                                        <td className="px-6 py-4 text-sand-500 text-xs">
                                            {record.fields.Source || "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        if (activeTab === 'custom') {
            return (
                <div className="text-center p-12 bg-sand-50 rounded-xl border border-sand-200 border-dashed">
                    <Webhook className="w-10 h-10 text-sand-300 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-sand-700">Custom Integration</h3>
                    <p className="text-sand-500 text-sm mt-1 max-w-xs mx-auto">
                        Connect your own API to receive reservation events. This feature is coming soon.
                    </p>
                </div>
            );
        }
    };

    return (
        <div className="space-y-4">
            {/* Sub-tabs for Actions */}
            <div className="flex items-center gap-1 bg-sand-100/50 p-1 rounded-lg w-fit">
                <button
                    onClick={() => setActiveTab('webapp')}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                        activeTab === 'webapp'
                            ? "bg-white text-ocean-900 shadow-sm"
                            : "text-sand-500 hover:text-sand-700 hover:bg-sand-200/50"
                    )}
                >
                    <Database className="w-3.5 h-3.5" />
                    Web App
                </button>
                <button
                    onClick={() => setActiveTab('airtable')}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                        activeTab === 'airtable'
                            ? "bg-white text-blue-700 shadow-sm"
                            : "text-sand-500 hover:text-sand-700 hover:bg-sand-200/50"
                    )}
                >
                    <TableIcon className="w-3.5 h-3.5" />
                    Airtable
                </button>
                <button
                    onClick={() => setActiveTab('salesforce')}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                        activeTab === 'salesforce'
                            ? "bg-white text-sky-700 shadow-sm"
                            : "text-sand-500 hover:text-sand-700 hover:bg-sand-200/50"
                    )}
                >
                    <CloudLightning className="w-3.5 h-3.5" />
                    Salesforce
                </button>
                <button
                    onClick={() => setActiveTab('custom')}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                        activeTab === 'custom'
                            ? "bg-white text-purple-700 shadow-sm"
                            : "text-sand-500 hover:text-sand-700 hover:bg-sand-200/50"
                    )}
                >
                    <Webhook className="w-3.5 h-3.5" />
                    Custom
                </button>
            </div>

            {renderContent()}
        </div>
    );
}
