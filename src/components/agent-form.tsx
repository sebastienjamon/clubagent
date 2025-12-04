"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Agent } from "@/types";
import { Save, Loader2, Mic, Building2, MessageSquare, Sparkles, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type AgentFormProps = {
    initialData?: Partial<Agent>;
    isReadOnly?: boolean;
};

export function AgentForm({ initialData, isReadOnly }: AgentFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Agent>({
        defaultValues: initialData || {
            name: "",
            business_name: "",
            system_prompt: "You are a helpful assistant for...",
            first_message: "Hello! How can I help you today?",
            voice_id: "default",
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
                    name: data.name,
                    business_name: data.business_name,
                    system_prompt: data.system_prompt,
                    first_message: data.first_message,
                    voice_id: data.voice_id,
                    banner_url: data.banner_url
                })
                .eq('id', initialData?.id);

            if (error) throw error;

            router.refresh();
            alert("Configuration saved successfully!");
        } catch (e) {
            console.error(e);
            alert("Failed to save configuration.");
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

            {/* Business Details Section */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 pb-6 border-b border-slate-200 mb-6">
                    <div className="p-2.5 bg-slate-200 rounded-xl">
                        <Building2 className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Business Identity</h2>
                        <p className="text-slate-500 text-sm">Managed by Administrator</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-700">Agent Name</label>
                        <div className="relative">
                            <input
                                {...register("name", { required: "Name is required" })}
                                disabled={isReadOnly}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 ease-out placeholder:text-slate-400 text-slate-700 font-medium disabled:bg-slate-100 disabled:opacity-80 disabled:cursor-not-allowed pr-10"
                                placeholder="e.g. Main Reservations Line"
                            />
                            {isReadOnly && <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
                        </div>
                        {errors.name && <span className="text-sm text-red-500 font-medium">{errors.name.message}</span>}
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-700">Business Name</label>
                        <div className="relative">
                            <input
                                {...register("business_name", { required: "Business name is required" })}
                                disabled={isReadOnly}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 ease-out placeholder:text-slate-400 text-slate-700 font-medium disabled:bg-slate-100 disabled:opacity-80 disabled:cursor-not-allowed pr-10"
                                placeholder="e.g. The Grand Hotel"
                            />
                            {isReadOnly && <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
                        </div>
                    </div>
                </div>
            </div>


            {/* Visual Customization Section */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 pb-6 border-b border-slate-200 mb-6">
                    <div className="p-2.5 bg-slate-200 rounded-xl">
                        <Sparkles className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Visual Customization</h2>
                        <p className="text-slate-500 text-sm">Customize how your agent appears in the dashboard.</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700">Banner Image URL</label>
                    <input
                        {...register("banner_url")}
                        disabled={isReadOnly}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 ease-out placeholder:text-slate-400 text-slate-700 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                        placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-xs text-slate-500">Provide a URL for the background image of your agent's card.</p>
                </div>
            </div>



            {/* Voice Personality Section */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
                    <div className="p-2.5 bg-purple-50 rounded-xl">
                        <Mic className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Voice & Personality</h2>
                        <p className="text-slate-500 text-sm">Configure how your AI sounds and behaves.</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-slate-700">System Prompt</label>
                            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> AI Optimized
                            </span>
                        </div>
                        <div className="relative">
                            <textarea
                                {...register("system_prompt", { required: "System prompt is required" })}
                                disabled={isReadOnly}
                                rows={8}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 ease-out placeholder:text-slate-400 text-slate-700 font-medium font-mono text-sm leading-relaxed resize-y min-h-[150px] disabled:opacity-60 disabled:cursor-not-allowed"
                                placeholder="You are a sophisticated concierge..."
                            />
                            <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium">
                                Markdown Supported
                            </div>
                        </div>
                        <p className="text-sm text-slate-500">Define the AI's role, tone, and specific instructions for handling calls.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-slate-700">First Message</label>
                            <input
                                {...register("first_message")}
                                disabled={isReadOnly}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 ease-out placeholder:text-slate-400 text-slate-700 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                                placeholder="Hello! Thanks for calling The Grand Hotel."
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-slate-700">Voice ID</label>
                            <div className="relative">
                                <select
                                    {...register("voice_id")}
                                    disabled={isReadOnly}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 ease-out placeholder:text-slate-400 text-slate-700 font-medium appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <option value="21m00Tcm4TlvDq8ikWAM">Default (Rachel) - Balanced</option>
                                    <option value="29vD33N1CtxCmqQRPOHJ">Drew (British) - Formal</option>
                                    <option value="LcfcDJNUP1GQjkzn1xUU">Emily (American) - Friendly</option>
                                    <option value="jsCqWAovK2LkecY7zXl4">Freya (American) - Energetic</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <Mic className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {!isReadOnly && (
                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        onClick={async () => {
                            if (confirm("Are you sure you want to delete this agent? This action cannot be undone.")) {
                                setIsLoading(true);
                                try {
                                    const { deleteAgent } = await import("@/app/actions/agents");
                                    await deleteAgent(initialData?.id!);
                                    router.push("/dashboard");
                                    router.refresh();
                                } catch (e) {
                                    console.error(e);
                                    alert("Failed to delete agent.");
                                    setIsLoading(false);
                                }
                            }
                        }}
                        disabled={isLoading}
                        className="px-6 py-4 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                    >
                        Delete Agent
                    </button>

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
                        <span className="relative z-10 group-hover:text-gold-50 transition-colors">Save Configuration</span>
                    </button>
                </div>
            )}
        </form >
    );
}
