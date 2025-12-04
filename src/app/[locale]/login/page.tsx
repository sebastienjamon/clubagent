"use client";

import { createClient } from "@/lib/supabase/client";
import { Bot, Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [view, setView] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setMessage(null);

        if (view === "login") {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
                setIsLoading(false);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } else {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            });

            if (error) {
                setError(error.message);
            } else {
                setMessage("Check your email for the confirmation link.");
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-sand-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] bg-ocean-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md p-8 relative z-10">
                <div className="bg-white rounded-2xl border border-sand-200 shadow-2xl shadow-ocean-900/10 p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/20 mb-4">
                            <Bot className="w-8 h-8 text-ocean-950" />
                        </div>
                        <h1 className="text-2xl font-bold text-ocean-950">Club Agent</h1>
                        <p className="text-sand-500 text-sm uppercase tracking-widest mt-1">
                            {view === "login" ? "Enterprise Login" : "Create Account"}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-ocean-900">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 outline-none transition-all text-ocean-900 placeholder:text-sand-400"
                                    placeholder="name@company.com"
                                />
                                <Mail className="w-5 h-5 text-sand-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-ocean-900">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 outline-none transition-all text-ocean-900 placeholder:text-sand-400"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 font-medium text-center">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-sm text-emerald-600 font-medium text-center">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-ocean-950 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-ocean-900 transition-all shadow-lg shadow-ocean-900/10 flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (view === "login" ? "Sign In" : "Sign Up")}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-sand-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-sand-400 font-medium tracking-wider">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={async () => {
                                setIsLoading(true);
                                await supabase.auth.signInWithOAuth({
                                    provider: 'google',
                                    options: {
                                        redirectTo: `${location.origin}/auth/callback`,
                                    },
                                });
                            }}
                            disabled={isLoading}
                            className="w-full py-3 bg-white border border-sand-200 text-ocean-900 rounded-xl font-bold hover:bg-sand-50 transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Google
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-sand-500">
                            {view === "login" ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => {
                                    setView(view === "login" ? "signup" : "login");
                                    setError(null);
                                    setMessage(null);
                                }}
                                className="text-ocean-600 font-bold hover:underline"
                            >
                                {view === "login" ? "Sign Up" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
