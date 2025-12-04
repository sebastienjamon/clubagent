import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogOut, Trash2, User, Shield, Mail } from "lucide-react";
import { signOut, deleteAccount } from "@/app/actions/auth";

export default async function SettingsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-ocean-950">Settings</h1>
                <p className="text-sand-500 mt-2">Manage your account and preferences.</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-sand-200 shadow-sm overflow-hidden">
                <div className="bg-sand-50 p-6 border-b border-sand-100 flex items-center gap-4">
                    <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center text-ocean-600 text-2xl font-bold border-4 border-white shadow-sm">
                        {user.user_metadata?.avatar_url ? (
                            <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <User className="w-8 h-8" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-ocean-950">{user.user_metadata?.full_name || 'User'}</h2>
                        <div className="flex items-center gap-2 text-sm text-sand-500 font-medium">
                            <Mail className="w-3 h-3" />
                            {user.email}
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 rounded-xl bg-sand-50 border border-sand-100">
                            <div className="flex items-center gap-2 mb-2 text-ocean-900 font-bold text-sm uppercase tracking-wider">
                                <Shield className="w-4 h-4 text-ocean-500" />
                                Account ID
                            </div>
                            <code className="text-xs font-mono text-sand-600 bg-white px-2 py-1 rounded border border-sand-200 block w-full overflow-hidden text-ellipsis">
                                {user.id}
                            </code>
                        </div>
                        <div className="p-4 rounded-xl bg-sand-50 border border-sand-100">
                            <div className="flex items-center gap-2 mb-2 text-ocean-900 font-bold text-sm uppercase tracking-wider">
                                <User className="w-4 h-4 text-ocean-500" />
                                Provider
                            </div>
                            <span className="text-sm font-medium text-ocean-900 capitalize">
                                {user.app_metadata?.provider || 'Email'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form action={signOut}>
                    <button
                        type="submit"
                        className="w-full p-6 bg-white border border-sand-200 rounded-2xl shadow-sm hover:shadow-md hover:border-ocean-200 transition-all group text-left"
                    >
                        <div className="w-10 h-10 bg-sand-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-ocean-50 transition-colors">
                            <LogOut className="w-5 h-5 text-sand-600 group-hover:text-ocean-600" />
                        </div>
                        <h3 className="text-lg font-bold text-ocean-950 mb-1">Sign Out</h3>
                        <p className="text-sm text-sand-500">Securely log out of your account.</p>
                    </button>
                </form>

                <form action={deleteAccount}>
                    <button
                        type="submit"
                        className="w-full p-6 bg-white border border-red-100 rounded-2xl shadow-sm hover:shadow-md hover:border-red-200 transition-all group text-left"
                    >
                        <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                            <Trash2 className="w-5 h-5 text-red-500 group-hover:text-red-600" />
                        </div>
                        <h3 className="text-lg font-bold text-red-700 mb-1">Delete Account</h3>
                        <p className="text-sm text-red-400">Permanently remove your data.</p>
                    </button>
                </form>
            </div>
        </div>
    );
}
