import Link from "next/link";
import { Bot, ArrowRight, CheckCircle2, Sparkles, Globe2, Zap, Utensils, ConciergeBell, Palmtree, Dumbbell, Phone, Clapperboard } from "lucide-react";
import { DemoVideo } from "@/components/demo-video";
import Image from "next/image";
import { USFlag, FrenchFlag } from "@/components/ui/flags";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-sand-50 font-sans text-ocean-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/20">
              <Bot className="w-6 h-6 text-ocean-950" />
            </div>
            <span className="font-bold text-2xl tracking-wide text-ocean-950">
              Club Agent
            </span>
          </div>

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

      {/* Hero Section */}
      <section className="relative pt-16 pb-16 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[200px] -right-[200px] w-[800px] h-[800px] bg-gold-400/10 rounded-full blur-[120px]" />
          <div className="absolute top-[200px] -left-[200px] w-[600px] h-[600px] bg-ocean-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-sand-200 rounded-full shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-ocean-900">The Future of Hospitality</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-ocean-950 mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-600">Guest Experience</span> <br />
            with Intelligent AI.
          </h1>

          <p className="text-xl text-sand-600 max-w-2xl mx-auto mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Deploy 24/7 digital concierges that handle reservations, answer inquiries, and provide personalized recommendations with human-like warmth.
          </p>

          <div className="max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <DemoVideo />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link href="/login" className="px-8 py-4 bg-ocean-950 text-white rounded-full text-lg font-bold uppercase tracking-wider hover:bg-ocean-900 transition-all shadow-xl shadow-ocean-900/20 flex items-center gap-3 group">
              Hire Your First Agent
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies / Verticals */}
      <section className="py-20 bg-sand-50 border-t border-sand-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ocean-950 mb-4">Tailored for Excellence</h2>
            <p className="text-sand-600 max-w-2xl mx-auto">
              Discover how Club Agent transforms guest experiences across different hospitality sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Restaurant */}
            {/* Theater */}
            <div className="group bg-white rounded-3xl border border-sand-200 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden z-20">
                <a href="tel:+12058824622" className="absolute top-0 right-0 w-80 bg-gold-500 text-white text-xs font-bold uppercase tracking-widest py-2 text-center transform translate-x-24 translate-y-8 rotate-45 shadow-sm hover:bg-gold-600 transition-colors flex items-center justify-center pl-4">
                  +1 (205) 882-4622
                </a>
              </div>
              <div className="relative w-full h-40 overflow-hidden">
                <Image src="/theater-banner.png" alt="Theater" fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-lg font-bold text-ocean-950">Cinema & Theater</h3>
                  <div className="w-12 h-12 bg-ocean-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Clapperboard className="w-6 h-6 text-ocean-950" />
                  </div>
                </div>
                <p className="text-sm text-sand-500 mb-4">Box office, showtimes & lost property.</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-sand-100">
                  <Link href="/theater-ai-agent" className="flex items-center text-ocean-950 text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity">
                    See Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="tel:+12058824622" className="relative w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center text-ocean-950 hover:bg-ocean-200 transition-colors" title="Call Demo">
                    <span className="absolute inset-0 rounded-full bg-gold-500/50 animate-ping"></span>
                    <Phone className="w-6 h-6 relative z-10" />
                  </a>
                </div>
              </div>
            </div>

            {/* Hotel */}
            <div className="group bg-white rounded-3xl border border-sand-200 hover:shadow-xl hover:shadow-gold-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden z-20">
                <a href="tel:+19044101733" className="absolute top-0 right-0 w-80 bg-gold-500 text-white text-xs font-bold uppercase tracking-widest py-2 text-center transform translate-x-24 translate-y-8 rotate-45 shadow-sm hover:bg-gold-600 transition-colors flex items-center justify-center pl-4">
                  +1 (904) 410-1733
                </a>
              </div>
              <div className="relative w-full h-40 overflow-hidden">
                <Image src="/hotel-banner.png" alt="Luxury Hotels" fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-lg font-bold text-ocean-950">Luxury Hotels</h3>
                  <div className="w-12 h-12 bg-gold-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <ConciergeBell className="w-6 h-6 text-gold-600" />
                  </div>
                </div>
                <p className="text-sm text-sand-500 mb-4">Front desk, room service & concierge.</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-sand-100">
                  <Link href="/hotel-ai-receptionist" className="flex items-center text-gold-600 text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity">
                    See Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="tel:+19044101733" className="relative w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center text-gold-600 hover:bg-gold-100 transition-colors" title="Call Demo">
                    <span className="absolute inset-0 rounded-full bg-gold-500/50 animate-ping"></span>
                    <Phone className="w-6 h-6 relative z-10" />
                  </a>
                </div>
              </div>
            </div>

            {/* Beach Club */}
            <div className="group bg-white rounded-3xl border border-sand-200 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden z-20">
                <a href="tel:+18579715733" className="absolute top-0 right-0 w-80 bg-gold-500 text-white text-xs font-bold uppercase tracking-widest py-2 text-center transform translate-x-24 translate-y-8 rotate-45 shadow-sm hover:bg-gold-600 transition-colors flex items-center justify-center pl-4">
                  +1 (857) 971-5733
                </a>
              </div>
              <div className="relative w-full h-40 overflow-hidden">
                <Image src="/beach-club-banner.png" alt="Beach Clubs" fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-lg font-bold text-ocean-950">Beach Clubs</h3>
                  <div className="w-12 h-12 bg-ocean-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Palmtree className="w-6 h-6 text-ocean-950" />
                  </div>
                </div>
                <p className="text-sm text-sand-500 mb-4">VIP cabanas & bottle service bookings.</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-sand-100">
                  <Link href="/beach-club-reservation-agent" className="flex items-center text-ocean-950 text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity">
                    See Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="tel:+18579715733" className="relative w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center text-ocean-950 hover:bg-ocean-200 transition-colors" title="Call Demo">
                    <span className="absolute inset-0 rounded-full bg-gold-500/50 animate-ping"></span>
                    <Phone className="w-6 h-6 relative z-10" />
                  </a>
                </div>
              </div>
            </div>

            {/* Gym */}
            <div className="group bg-white rounded-3xl border border-sand-200 hover:shadow-xl hover:shadow-gold-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden z-20">
                <div className="absolute top-0 right-0 w-80 bg-gold-500 text-white text-xs font-bold uppercase tracking-widest py-2 text-center transform translate-x-24 translate-y-8 rotate-45 shadow-sm hover:bg-gold-600 transition-colors flex items-center justify-center pl-4">
                  soon... 🇫🇷
                </div>
              </div>
              <div className="relative w-full h-40 overflow-hidden">
                <Image src="/gym-banner.png" alt="Wellness" fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-lg font-bold text-ocean-950">Wellness</h3>
                  <div className="w-12 h-12 bg-gold-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Dumbbell className="w-6 h-6 text-gold-600" />
                  </div>
                </div>
                <p className="text-sm text-sand-500 mb-4">Class scheduling & PT coordination.</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-sand-100">
                  <Link href="/gym-ai-agent" className="flex items-center text-gold-600 text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity">
                    See Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white border-t border-sand-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="space-y-4">
              <div className="w-14 h-14 bg-ocean-950 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-ocean-900/20">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-ocean-950">Instant Response</h3>
              <p className="text-sand-600 leading-relaxed">
                Never miss a guest inquiry. Our agents respond instantly, 24/7, ensuring your guests always feel attended to.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4">
              <div className="w-14 h-14 bg-gold-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gold-900/20">
                <Globe2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-ocean-950">Multilingual Support</h3>
              <p className="text-sand-600 leading-relaxed">
                Break language barriers. Automatically detect and converse in over 30 languages to welcome guests from around the world.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4">
              <div className="w-14 h-14 bg-ocean-950 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-ocean-900/20">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-ocean-950">Seamless Integration</h3>
              <p className="text-sand-600 leading-relaxed">
                Connects directly with your existing reservation systems and knowledge base for accurate, real-time assistance.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <Footer />
    </div>
  );
}
