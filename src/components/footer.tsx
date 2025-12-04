import { Bot } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-ocean-950 text-white py-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <Bot className="w-6 h-6 text-gold-400" />
                    <span className="font-bold text-xl tracking-wide">Club Agent</span>
                </div>
                <div className="text-right">
                    <p className="text-sand-400 text-sm mb-2">
                        © {new Date().getFullYear()} Club Agent. All rights reserved.
                    </p>
                    <div className="text-xs text-sand-400/80 space-y-0.5">
                        <p>Legal entity: EI JAMON SÉBASTIEN</p>
                        <p>Business type: Sole Proprietor (Entreprise Individuelle)</p>
                        <p>Registered address: 4 Rue Massenet, 75016 Paris, France</p>
                    </div>
                </div>
            </div>

        </footer>
    );
}
