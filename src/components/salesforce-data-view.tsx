"use client";

import { useState, useEffect } from "react";
import { Agent } from "@/types";
import { fetchSalesforceRecords } from "@/app/actions/integrations";
import { Loader2, RefreshCw, ExternalLink, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function SalesforceDataView({ agent }: { agent: Agent }) {
    const [records, setRecords] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const config = agent.integrations?.salesforce_config;
    const isEnabled = agent.integrations?.salesforce_enabled;

    const loadData = async () => {
        if (!config || !isEnabled) return;

        setIsLoading(true);
        setError(null);

        try {
            const result = await fetchSalesforceRecords(config);
            if (result.success) {
                setRecords(result.records);
            } else {
                setError(result.error || "Failed to fetch records");
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
                <p className="text-slate-500 font-medium">Salesforce integration is not enabled.</p>
                <p className="text-sm text-slate-400 mt-1">Configure it in the Integrations tab.</p>
            </div>
        );
    }

    const objectName = config.object_name || 'Unknown';

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    Recent {objectName}s
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        Live from Salesforce
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
                                <th className="px-4 py-3">Date</th>
                                {objectName.toLowerCase() === 'case' ? (
                                    <>
                                        <th className="px-4 py-3">Case Number</th>
                                        <th className="px-4 py-3">Subject</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Priority</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Company</th>
                                        <th className="px-4 py-3">Status</th>
                                    </>
                                )}
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {records.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400 italic">
                                        No records found recently.
                                    </td>
                                </tr>
                            )}

                            {records.map((record) => (
                                <tr key={record.Id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                                        {formatDistanceToNow(new Date(record.CreatedDate), { addSuffix: true })}
                                    </td>

                                    {objectName.toLowerCase() === 'case' ? (
                                        <>
                                            <td className="px-4 py-3 font-mono text-xs text-slate-500">
                                                {record.CaseNumber}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-slate-900 max-w-[200px] truncate" title={record.Subject}>
                                                {record.Subject}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${record.Status === 'New' ? 'bg-blue-100 text-blue-700' :
                                                        record.Status === 'Closed' ? 'bg-emerald-100 text-emerald-700' :
                                                            'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    {record.Status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${record.Priority === 'High' ? 'bg-red-100 text-red-700' :
                                                        record.Priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                                                            'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    {record.Priority}
                                                </span>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-4 py-3 font-medium text-slate-900">
                                                {record.Name}
                                            </td>
                                            <td className="px-4 py-3 text-slate-600">
                                                {record.Company}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                    {record.Status}
                                                </span>
                                            </td>
                                        </>
                                    )}

                                    <td className="px-4 py-3 text-right">
                                        <a
                                            href={`${config.instance_url}/${record.Id}`}
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
