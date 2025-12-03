"use client";

import { useState, useEffect } from "react";
import { Agent } from "@/types";
import { fetchAirtableRecords } from "@/app/actions/integrations";
import { Loader2, RefreshCw, ExternalLink, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function AirtableDataView({ agent }: { agent: Agent }) {
    const [records, setRecords] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const config = agent.integrations?.airtable_config;
    const isEnabled = agent.integrations?.airtable_enabled;

    const loadData = async () => {
        if (!config || !isEnabled) return;

        setIsLoading(true);
        setError(null);

        try {
            const result = await fetchAirtableRecords(config, agent.name);
            if (result.success) {
                setRecords(result.records);
            } else {
                setError("Failed to fetch records");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [agent.integrations]);

    if (!isEnabled || !config) {
        return (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                <p className="text-slate-500 font-medium">Airtable integration is not enabled.</p>
                <p className="text-sm text-slate-400 mt-1">Configure it in the Integrations tab.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    Recent Records
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        Live from Airtable
                    </span>
                </h3>
                <button
                    onClick={loadData}
                    disabled={isLoading}
                    className="p-2 text-slate-400 hover:text-ocean-600 transition-colors rounded-full hover:bg-slate-100"
                    title="Refresh Data"
                >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3">Created</th>
                                <th className="px-4 py-3">Source</th>
                                <th className="px-4 py-3">Notes/Summary</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {records.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-slate-400 italic">
                                        No records found recently.
                                    </td>
                                </tr>
                            )}

                            {records.map((record) => (
                                <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                                        {record.createdTime ? formatDistanceToNow(new Date(record.createdTime), { addSuffix: true }) : '-'}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-900">
                                        {record.fields?.Source || '-'}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600 max-w-[300px] truncate">
                                        {record.fields?.Notes || record.fields?.Summary || '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                            {record.fields?.Status || 'New'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <a
                                            href={`https://airtable.com/${config.base_id}/${config.table_name}/${record.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs font-bold text-ocean-600 hover:text-ocean-700 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            View <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
