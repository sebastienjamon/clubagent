import { Link, redirect } from "@/i18n/routing";
import { Bot, LayoutDashboard, Settings, LogOut, ChevronRight, Sparkles, User } from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { locale } = await params;

    if (!user) {
        redirect({ href: '/login', locale });
    }

    return (
        <div className="flex h-screen overflow-hidden bg-sand-50">
            {/* Sidebar - Luxury Ocean Theme */}
            <aside className="w-72 bg-ocean-950 text-white hidden md:flex flex-col shadow-2xl z-10 relative overflow-hidden">
                {/* Abstract Background Decoration - Waves */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                    <div className="absolute -top-[100px] -left-[100px] w-[400px] h-[400px] bg-ocean-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gold-500 rounded-full blur-[100px]" />
                </div>

                <div className="p-8 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/20">
                            <Bot className="w-6 h-6 text-ocean-950" />
                        </div>
                        <span className="font-bold text-2xl tracking-wide text-white">
                            Club Agent
                        </span>
                    </div>
                    <p className="text-xs text-ocean-500 uppercase tracking-[0.2em] mt-2 ml-1">Enterprise Platform</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 relative z-10 mt-4">
                    <Link
                        href="/dashboard"
                        className="group flex items-center justify-between px-4 py-3.5 text-sand-200 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-300 ease-out border border-transparent hover:border-white/5"
                    >
                        <div className="flex items-center gap-3">
                            <LayoutDashboard className="w-5 h-5 text-gold-400 group-hover:text-gold-300 transition-colors" />
                            <span className="font-medium tracking-wide">Concierge</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-sand-200" />
                    </Link>

                    <Link
                        href="/dashboard/settings"
                        className="group flex items-center justify-between px-4 py-3.5 text-sand-200 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-300 ease-out border border-transparent hover:border-white/5"
                    >
                        <div className="flex items-center gap-3">
                            <Settings className="w-5 h-5 text-sand-400 group-hover:text-sand-300 transition-colors" />
                            <span className="font-medium tracking-wide">Settings</span>
                        </div>
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/5 relative z-10">
                    <form action={signOut}>
                        <button type="submit" className="flex items-center gap-3 px-4 py-3 text-sand-400 hover:text-red-300 hover:bg-red-500/10 w-full rounded-xl transition-all duration-200 cursor-pointer">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium tracking-wide">Sign Out</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto relative">
                {/* Header */}
                <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-4 md:px-8 py-4 flex items-center justify-between">
                    <h2 className="font-semibold text-slate-800">Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/settings" className="group flex items-center gap-3 hover:bg-slate-50 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-200">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs overflow-hidden">
                                {user?.user_metadata?.avatar_url ? (
                                    <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-4 h-4" />
                                )}
                            </div>
                            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 hidden sm:block">
                                {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                            </span>
                        </Link>
                    </div>
                </header>

                <div className="p-4 md:p-8 max-w-6xl mx-auto pb-20">
                    {children}
                </div>
            </main>
        </div>
    );
}
