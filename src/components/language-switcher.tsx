"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { USFlag, FrenchFlag } from "@/components/ui/flags";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const nextLocale = locale === "en" ? "fr" : "en";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-sand-200 hover:bg-white hover:shadow-sm transition-all text-sm font-medium text-ocean-900"
            aria-label={locale === "en" ? "Switch to French" : "Passer en anglais"}
        >
            {locale === "en" ? (
                <>
                    <USFlag className="w-4 h-3 rounded-sm shadow-sm" />
                    <span>EN</span>
                </>
            ) : (
                <>
                    <FrenchFlag className="w-4 h-3 rounded-sm shadow-sm" />
                    <span>FR</span>
                </>
            )}
        </button>
    );
}
