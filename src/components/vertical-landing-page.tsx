import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Phone, Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface DialogueItem {
    speaker: "Agent" | "Guest";
    text: string;
}

interface VerticalLandingPageProps {
    title: React.ReactNode;
    subtitle: string;
    features: string[];
    dialogue: DialogueItem[];
    ctaNumber: string;
    ctaLabel: string;
    heroGradient: "gold" | "ocean" | "emerald";
}

export function VerticalLandingPage({
    title,
    subtitle,
    features,
    dialogue,
    ctaNumber,
    ctaLabel,
    heroGradient,
}: VerticalLandingPageProps) {
    const gradients = {
        gold: "from-gold-400 to-gold-600",
        ocean: "from-ocean-400 to-ocean-600",
        emerald: "from-emerald-400 to-emerald-600",
    };

    const bgGradients = {
        gold: "bg-gold-50",
        ocean: "bg-ocean-50",
        emerald: "bg-emerald-50",
    };

    return (
        <div className="min-h-screen bg-sand-50 font-sans text-ocean-950 flex flex-col">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative pt-16 pb-16 overflow-hidden">
                    {/* Background Decor - Matching Homepage Exactly */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute -top-[200px] -right-[200px] w-[800px] h-[800px] bg-gold-400/10 rounded-full blur-[120px]" />
                        <div className="absolute top-[200px] -left-[200px] w-[600px] h-[600px] bg-ocean-500/5 rounded-full blur-[100px]" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-sand-200 rounded-full shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Sparkles className={`w-4 h-4 text-${heroGradient === 'gold' ? 'gold-500' : heroGradient === 'emerald' ? 'emerald-500' : 'ocean-500'}`} />
                            <span className="text-xs font-bold uppercase tracking-widest text-ocean-900">AI-Powered Hospitality</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-ocean-950 mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                            {title}
                        </h1>

                        <p className="text-xl text-sand-600 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            {subtitle}
                        </p>

                        {/* Live Demo CTA */}
                        <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                            <a
                                href={`tel:${ctaNumber}`}
                                className="px-8 py-4 bg-ocean-950 text-white rounded-full text-lg font-bold uppercase tracking-wider hover:bg-ocean-900 transition-all shadow-xl shadow-ocean-900/20 flex items-center gap-3 group"
                            >
                                <Phone className="w-5 h-5 animate-pulse" />
                                {ctaLabel}: {ctaNumber}
                            </a>
                            <p className="text-sm text-sand-500 uppercase tracking-widest">
                                Try it live • 24/7 Available
                            </p>
                        </div>
                    </div>
                </section>

                {/* Two Column Section: Dialogue & Features */}
                <section className="py-16 bg-white border-t border-sand-100">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Dialogue Simulation */}
                        <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-ocean-900/5 border border-sand-200 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sand-200 to-transparent"></div>
                            <h3 className="text-sm font-bold text-sand-400 uppercase tracking-widest mb-6 text-center">Live Conversation Preview</h3>

                            <div className="space-y-6">
                                {dialogue.map((line, i) => (
                                    <div key={i} className={`flex gap-4 ${line.speaker === 'Guest' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${line.speaker === 'Agent' ? `bg-ocean-950 text-white` : 'bg-sand-100 text-sand-500'}`}>
                                            {line.speaker === 'Agent' ? <Sparkles className="w-5 h-5" /> : <span className="font-bold text-xs">YOU</span>}
                                        </div>
                                        <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed ${line.speaker === 'Agent' ? 'bg-ocean-50 text-ocean-900 rounded-tl-none' : 'bg-white border border-sand-200 text-ocean-800 rounded-tr-none shadow-sm'}`}>
                                            <span className="block font-bold text-xs mb-1 opacity-50 uppercase tracking-wider">{line.speaker}</span>
                                            {line.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-ocean-950">
                                Handle every request with <br />
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradients[heroGradient]}`}>precision and grace.</span>
                            </h2>

                            <ul className="space-y-4">
                                {features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-4 p-4 bg-ocean-50/50 rounded-xl border border-sand-100 hover:bg-ocean-50 transition-colors">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white shadow-sm text-${heroGradient === 'gold' ? 'gold-500' : heroGradient === 'emerald' ? 'emerald-500' : 'ocean-500'}`}>
                                            <Check className="w-4 h-4" />
                                        </div>
                                        <span className="text-lg text-ocean-900 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4">
                                <Link href="/login" className="inline-flex items-center gap-2 text-ocean-950 font-bold hover:opacity-70 transition-opacity">
                                    Start Building Your Agent <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
