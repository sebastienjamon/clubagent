import { Link } from "@/i18n/routing";
import { Bot, ArrowRight, CheckCircle2, Sparkles, Globe2, Zap, Utensils, ConciergeBell, Palmtree, Dumbbell, Phone, Clapperboard, Building2 } from "lucide-react";
import { DemoVideo } from "@/components/demo-video";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function LandingPage() {
  const t = useTranslations('LandingPage');

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
            <LanguageSwitcher />
            <Link href="/login" className="text-sm font-bold uppercase tracking-wider text-ocean-900 hover:text-gold-600 transition-colors">
              {t('nav.signIn')}
            </Link>
            <Link href="/login" className="hidden md:flex px-6 py-2.5 bg-ocean-950 text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-ocean-900 transition-all shadow-lg shadow-ocean-900/10">
              {t('nav.getStarted')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Real Estate Agent - Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-white to-sand-50">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[200px] -right-[200px] w-[800px] h-[800px] bg-gold-400/10 rounded-full blur-[120px]" />
          <div className="absolute top-[200px] -left-[200px] w-[600px] h-[600px] bg-ocean-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-sand-200 rounded-full shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-ocean-900">{t('hero.badge')}</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-ocean-950 mb-4 tracking-tight leading-tight">
              {t('verticals.title')}
            </h1>
            <p className="text-lg md:text-xl text-sand-600 max-w-2xl mx-auto">
              {t('verticals.subtitle')}
            </p>
          </div>

          {/* Guillaume Card - Large & Prominent */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="group bg-white rounded-3xl border-2 border-gold-200 shadow-2xl shadow-gold-900/10 hover:shadow-3xl hover:shadow-gold-900/20 hover:-translate-y-2 transition-all duration-300 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 overflow-hidden z-20">
                <a href="tel:+33939034710" className="absolute top-0 right-0 w-96 bg-gradient-to-r from-gold-500 to-gold-600 text-white text-sm font-bold uppercase tracking-widest py-3 text-center transform translate-x-28 translate-y-10 rotate-45 shadow-lg hover:from-gold-600 hover:to-gold-700 transition-all flex items-center justify-center pl-6">
                  <Phone className="w-4 h-4 mr-2" />
                  +33 9 39 03 47 10
                </a>
              </div>
              <div className="relative w-full h-80 overflow-hidden">
                <Image src="/realestate-banner.png" alt="Guillaume - Assistant Immobilier IA" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <Building2 className="w-9 h-9 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-ocean-950">{t('verticals.realEstate.title')}</h2>
                </div>
                <p className="text-lg text-sand-700 mb-8 leading-relaxed">{t('verticals.realEstate.description')}</p>
                <div className="mt-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-8 border-t border-sand-100">
                  <a href="tel:+33939034710" className="flex-1 relative px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-2xl text-base font-bold uppercase tracking-wider hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg hover:shadow-xl text-center">
                    <Phone className="w-5 h-5 inline mr-2" />
                    Appeler Guillaume
                  </a>
                  <Link href="/agent-immobilier" className="flex items-center justify-center px-6 py-4 text-ocean-950 border-2 border-ocean-200 rounded-2xl text-base font-bold uppercase tracking-wider hover:bg-ocean-50 transition-all">
                    {t('verticals.realEstate.cta')} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Video */}
          <div className="max-w-3xl mx-auto">
            <DemoVideo />
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
              <h3 className="text-xl font-bold text-ocean-950">{t('features.instantResponse.title')}</h3>
              <p className="text-sand-600 leading-relaxed">
                {t('features.instantResponse.description')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4">
              <div className="w-14 h-14 bg-gold-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gold-900/20">
                <Globe2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-ocean-950">{t('features.multilingual.title')}</h3>
              <p className="text-sand-600 leading-relaxed">
                {t('features.multilingual.description')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4">
              <div className="w-14 h-14 bg-ocean-950 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-ocean-900/20">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-ocean-950">{t('features.integration.title')}</h3>
              <p className="text-sand-600 leading-relaxed">
                {t('features.integration.description')}
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
