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

      {/* Hero Section with CTA First */}
      <section className="relative pt-8 md:pt-16 pb-12 md:pb-20 overflow-hidden bg-gradient-to-b from-white to-sand-50">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[200px] -right-[200px] w-[800px] h-[800px] bg-gold-400/10 rounded-full blur-[120px]" />
          <div className="absolute top-[200px] -left-[200px] w-[600px] h-[600px] bg-ocean-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
          {/* Badge */}
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white border border-gold-200 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-gold-500" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gold-700">{t('hero.badge')}</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ocean-950 mb-3 md:mb-4 tracking-tight leading-tight px-2">
              {t('verticals.title')}
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-sand-600 max-w-2xl mx-auto px-4">
              {t('verticals.subtitle')}
            </p>
          </div>

          {/* BIG CTA - Call Guillaume */}
          <div className="mb-8 md:mb-12 max-w-2xl mx-auto">
            <a
              href="tel:+33939034710"
              className="group block relative bg-gradient-to-r from-gold-500 to-gold-600 rounded-3xl md:rounded-[2rem] p-6 md:p-10 shadow-2xl hover:shadow-3xl hover:from-gold-600 hover:to-gold-700 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Phone Icon Background */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full flex items-center justify-center opacity-50">
                <Phone className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>

              {/* Content */}
              <div className="relative">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                    <Building2 className="w-6 h-6 md:w-8 md:h-8 text-gold-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-white/90 text-xs md:text-sm font-semibold uppercase tracking-wider">Appelez maintenant</p>
                    <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">Guillaume</h2>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 md:gap-3 bg-white rounded-2xl md:rounded-3xl py-4 md:py-6 px-4 md:px-6 mb-3 md:mb-4 group-hover:bg-white/95 transition-colors">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-gold-600 animate-pulse" />
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-ocean-950 tracking-tight">+33 9 39 03 47 10</span>
                </div>

                <p className="text-white/90 text-center text-sm md:text-base font-medium">
                  Votre assistant IA disponible 24/7
                </p>
              </div>
            </a>
          </div>

          {/* Explanation Card */}
          <div className="max-w-3xl mx-auto mb-10 md:mb-12">
            <div className="bg-white rounded-2xl md:rounded-3xl border border-sand-200 shadow-lg p-6 md:p-8 lg:p-10">
              <div className="flex items-start gap-4 md:gap-5 mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gold-400 to-gold-500 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                  <Building2 className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-ocean-950 mb-2">{t('verticals.realEstate.title')}</h3>
                  <p className="text-sm md:text-base text-sand-500 font-medium">Assistant virtuel pour professionnels de l'immobilier</p>
                </div>
              </div>

              <p className="text-base md:text-lg text-sand-700 mb-6 md:mb-8 leading-relaxed">{t('verticals.realEstate.description')}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="text-center p-4 bg-sand-50 rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold text-gold-600 mb-1">24/7</div>
                  <div className="text-xs md:text-sm text-sand-600 font-medium">Toujours disponible</div>
                </div>
                <div className="text-center p-4 bg-sand-50 rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold text-gold-600 mb-1"><Zap className="w-6 h-6 md:w-8 md:h-8 inline" /></div>
                  <div className="text-xs md:text-sm text-sand-600 font-medium">Réponses instantanées</div>
                </div>
                <div className="text-center p-4 bg-sand-50 rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold text-gold-600 mb-1">Auto</div>
                  <div className="text-xs md:text-sm text-sand-600 font-medium">Sync Airtable</div>
                </div>
              </div>

              <Link
                href="/agent-immobilier"
                className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 text-ocean-950 border-2 border-ocean-200 rounded-xl md:rounded-2xl text-sm md:text-base font-bold uppercase tracking-wider hover:bg-ocean-50 transition-all w-full"
              >
                En savoir plus <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
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
