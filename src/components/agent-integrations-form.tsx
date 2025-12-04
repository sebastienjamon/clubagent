"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Agent } from "@/types";
import { Save, Loader2, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { testAirtableConnection } from "@/app/actions/integrations";

type AgentIntegrationsFormProps = {
    initialData?: Partial<Agent>;
    isReadOnly?: boolean;
};

export function AgentIntegrationsForm({ initialData, isReadOnly }: AgentIntegrationsFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [testStatus, setTestStatus] = useState<{ success: boolean; message: string } | null>(null);
    const defaultSalesforceConfig = {
        instance_url: "",
        client_id: "",
        client_secret: "",
        object_name: "Case"
    };

    const { register, handleSubmit, getValues } = useForm<Agent>({
        defaultValues: initialData ? {
            ...initialData,
            integrations: {
                web_app_enabled: true,
                airtable_enabled: false,
                custom_enabled: false,
                ...initialData.integrations,
                salesforce_config: {
                    ...defaultSalesforceConfig,
                    ...initialData.integrations?.salesforce_config
                }
            }
        } : {
            integrations: {
                web_app_enabled: true,
                airtable_enabled: false,
                custom_enabled: false,
                salesforce_config: defaultSalesforceConfig
            }
        },
    });

    const supabase = createClient();
    const router = useRouter();

    const onSubmit = async (data: Agent) => {
        if (isReadOnly) return;
        setIsLoading(true);

        try {
            const { error } = await supabase
                .from('agents')
                .update({
                    integrations: data.integrations
                })
                .eq('id', initialData?.id);

            if (error) throw error;

            router.refresh();
            alert("Integrations saved successfully!");
        } catch (e) {
            console.error(e);
            alert("Failed to save integrations.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">

            {isReadOnly && (
                <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-gold-600 mt-0.5 shrink-0" />
                    <div>
                        <h3 className="text-sm font-bold text-gold-900">Example Agent</h3>
                        <p className="text-sm text-gold-700 mt-1">
                            This is an example agent configuration. You can view the settings to learn how it works, but you cannot edit them directly.
                        </p>
                    </div>
                </div>
            )}

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
                    <div className="p-2.5 bg-emerald-50 rounded-xl">
                        <Sparkles className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Integrations</h2>
                        <p className="text-slate-500 text-sm">Connect your agent to external tools.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Web App Integration */}
                    <div className="flex items-start justify-between p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                        <div>
                            <h3 className="font-bold text-slate-900">Concierge Dashboard</h3>
                            <p className="text-sm text-slate-500 mt-1">Save calls and reservations to this dashboard.</p>
                        </div>
                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-500">
                            <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                        </div>
                    </div>

                    {/* Airtable Integration */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <div className="p-4 bg-white flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    Airtable
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-full">Beta</span>
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">Sync data to your Airtable base.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register("integrations.airtable_enabled")}
                                    disabled={isReadOnly}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                            </label>
                        </div>

                        {/* Airtable Config Fields */}
                        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">API Key (Personal Access Token)</label>
                                <input
                                    type="password"
                                    {...register("integrations.airtable_config.api_key")}
                                    disabled={isReadOnly}
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                                    placeholder="pat..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Base ID</label>
                                    <input
                                        {...register("integrations.airtable_config.base_id")}
                                        disabled={isReadOnly}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                                        placeholder="app..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Table Name</label>
                                    <input
                                        {...register("integrations.airtable_config.table_name")}
                                        disabled={isReadOnly}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                                        placeholder="Reservations"
                                    />
                                </div>
                            </div>
                            {!isReadOnly && (
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-2">
                                        {testStatus && !testStatus.message.startsWith("Salesforce:") && (
                                            <span className={cn("text-xs font-medium flex items-center gap-1", testStatus.success ? "text-emerald-600" : "text-red-600")}>
                                                {testStatus.success ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                {testStatus.message}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            setTestStatus({ success: false, message: "Testing..." });
                                            const values = getValues();
                                            const config = values.integrations?.airtable_config;
                                            if (config) {
                                                const result = await testAirtableConnection(config);
                                                setTestStatus(result);
                                            } else {
                                                setTestStatus({ success: false, message: "Please fill in details first" });
                                            }
                                        }}
                                        className="text-xs font-bold text-ocean-600 hover:text-ocean-700 underline"
                                    >
                                        Test Connection
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Salesforce Integration */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <div className="p-4 bg-white flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    Salesforce
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-full">Beta</span>
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">Sync data to Salesforce objects (Leads, Cases, etc).</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register("integrations.salesforce_enabled")}
                                    disabled={isReadOnly}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                            </label>
                        </div>

                        {/* Salesforce Config Fields */}
                        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Instance URL</label>
                                <input
                                    {...register("integrations.salesforce_config.instance_url")}
                                    disabled={isReadOnly}
                                    type={isReadOnly ? "password" : "text"}
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:bg-slate-50 disabled:text-slate-500"
                                    placeholder={isReadOnly ? "•••••••••••••••• (Hidden)" : "https://your-instance.salesforce.com"}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Client ID (Consumer Key)</label>
                                    <input
                                        {...register("integrations.salesforce_config.client_id")}
                                        disabled={isReadOnly}
                                        type={isReadOnly ? "password" : "text"}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:bg-slate-50 disabled:text-slate-500"
                                        placeholder={isReadOnly ? "•••••••••••••••• (Hidden)" : "Enter Client ID (or leave empty to use Env Var)"}
                                        value={isReadOnly ? undefined : undefined} // Let react-hook-form handle it, but if read-only we might want to force mask if it was a text field
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Client Secret (Consumer Secret)</label>
                                    <input
                                        type="password"
                                        {...register("integrations.salesforce_config.client_secret")}
                                        disabled={isReadOnly}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:bg-slate-50 disabled:text-slate-500"
                                        placeholder={isReadOnly ? "•••••••••••••••• (Hidden)" : "Enter Client Secret (or leave empty to use Env Var)"}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Object Name</label>
                                <input
                                    {...register("integrations.salesforce_config.object_name")}
                                    disabled={isReadOnly}
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                                    placeholder="Lead, Case, or CustomObject__c"
                                />
                            </div>

                            {!isReadOnly && (
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-2">
                                        {/* Reuse testStatus state, but we might want a separate one if testing both simultaneously. For now, shared is fine as user likely tests one at a time. */}
                                        {testStatus && testStatus.message.startsWith("Salesforce:") && (
                                            <span className={cn("text-xs font-medium flex items-center gap-1", testStatus.success ? "text-emerald-600" : "text-red-600")}>
                                                {testStatus.success ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                {testStatus.message}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            setTestStatus({ success: false, message: "Testing Salesforce..." });
                                            const values = getValues();
                                            const config = values.integrations?.salesforce_config;
                                            if (config) {
                                                // We need to import this action dynamically or add it to imports
                                                // For now, let's assume we'll add the import
                                                const { testSalesforceConnection } = await import("@/app/actions/integrations");
                                                const result = await testSalesforceConnection(config);
                                                setTestStatus(result);
                                            } else {
                                                setTestStatus({ success: false, message: "Salesforce: Please fill in details first" });
                                            }
                                        }}
                                        className="text-xs font-bold text-ocean-600 hover:text-ocean-700 underline"
                                    >
                                        Test Connection
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Custom Integration */}
                    <div className="flex items-start justify-between p-4 border border-slate-200 rounded-xl opacity-60">
                        <div>
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                Custom Webhook
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-full">Coming Soon</span>
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">Send events to your own API.</p>
                        </div>
                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 cursor-not-allowed">
                            <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                        </div>
                    </div>
                </div>
            </div>




            {!isReadOnly && (
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={cn(
                            "relative overflow-hidden group bg-gradient-to-br from-ocean-900 to-ocean-950 text-white border border-ocean-800/50 rounded-xl font-bold uppercase tracking-wider hover:shadow-2xl hover:shadow-ocean-900/30 active:scale-[0.98] transition-all duration-300 flex items-center gap-3 text-sm px-8 py-4",
                            isLoading && "opacity-70 cursor-not-allowed"
                        )}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/10 to-gold-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-gold-500" /> : <Save className="w-5 h-5 text-gold-400 group-hover:text-gold-300 transition-colors" />}
                        <span className="relative z-10 group-hover:text-gold-50 transition-colors">Save Integrations</span>
                    </button>
                </div>
            )}
        </form>
    );
}
