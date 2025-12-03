import Link from "next/link";
import { Bot } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sand-200">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/20">
                        <Bot className="w-6 h-6 text-ocean-950" />
                    </div>
                    <span className="font-bold text-2xl tracking-wide text-ocean-950">
                        Club Agent
                    </span>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <Link href="/login" className="text-sm font-bold uppercase tracking-wider text-ocean-900 hover:text-gold-600 transition-colors">
                        Sign In
                    </Link>
                    <Link href="/login" className="hidden md:flex px-6 py-2.5 bg-ocean-950 text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-ocean-900 transition-all shadow-lg shadow-ocean-900/10">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
