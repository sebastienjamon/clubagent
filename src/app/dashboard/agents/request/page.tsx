"use client";

import { ArrowLeft, Check, Sparkles, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { submitAgentRequest } from "@/app/actions/requests";

export default function RequestAgentPage() {
    const [isPending, startTransition] = useTransition();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);
        startTransition(async () => {
            const result = await submitAgentRequest(null, formData);
            if (result?.error) {
                setError(result.error);
            } else {
                setSubmitted(true);
            }
        });
    }

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto pt-12 text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
                    <Check className="w-10 h-10 text-emerald-600" />
                </div>
                <h1 className="text-3xl font-bold text-ocean-950">Request Received</h1>
                <p className="text-lg text-sand-600 max-w-md mx-auto">
                    Thank you for your interest. Our concierge team will review your request and contact you within 24 hours to finalize the details.
                </p>
                <div className="pt-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center px-8 py-3 bg-ocean-950 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-ocean-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard"
                    className="p-2 hover:bg-sand-100 rounded-lg transition-colors text-sand-500"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-ocean-950">Hire a New Agent</h1>
                    <p className="text-sand-500 text-lg">Expand your digital workforce.</p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl border border-sand-200 p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-ocean-950 mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-ocean-600" />
                        Request Details
                    </h2>

                    <form action={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-ocean-900">Business Name</label>
                                <input
                                    name="business_name"
                                    required
                                    type="text"
                                    placeholder="e.g. The Grand Hotel"
                                    className="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 outline-none transition-all text-ocean-900 placeholder:text-sand-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-ocean-900">Agent Role</label>
                                <input
                                    name="agent_role"
                                    required
                                    type="text"
                                    placeholder="e.g. Spa Booking Specialist"
                                    className="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 outline-none transition-all text-ocean-900 placeholder:text-sand-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-ocean-900">Requirements & Notes</label>
                            <textarea
                                name="requirements"
                                required
                                rows={6}
                                placeholder="Describe what you need this agent to do..."
                                className="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 outline-none transition-all text-ocean-900 placeholder:text-sand-400 resize-none"
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <div className="pt-4 border-t border-sand-100 flex items-center justify-end gap-4">
                            <Link
                                href="/dashboard"
                                className="px-6 py-3 text-sand-500 font-bold hover:text-ocean-900 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="px-8 py-3 bg-ocean-950 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-ocean-900 transition-all shadow-lg shadow-ocean-900/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Request"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
