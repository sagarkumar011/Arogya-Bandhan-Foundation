"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, MapPin, Heart, Shield, Clock } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0B2F2A] text-white border-t border-emerald-950">
      {/* Top Banner Accent */}
      <div className="h-1 bg-gradient-to-r from-[#087F5B] via-[#0877C9] to-[#F58220]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1: Logo & Tagline & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block bg-white px-3 py-2 rounded-xl shadow-sm hover:shadow transition-shadow">
              <BrandLogo priority={false} />
            </Link>

            <p className="text-sm font-semibold text-[#F58220] tracking-wide">
              "Healthy People | Stronger Communities"
            </p>

            <p className="text-xs text-emerald-100/80 leading-relaxed pr-6">
              Arogya Bandhan Foundation is a broad social welfare trust working for the holistic 
              wellbeing of communities through free health camps, food distribution, education, 
              mass marriage (Samuhik Vivah), women empowerment, child welfare, and emergency relief.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-300">
              <Shield className="w-4 h-4 text-[#F58220]" />
              <span>Dedicated to Transparency, Integrity & Grassroots Service</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white border-b border-emerald-800/60 pb-2">
              {t("Quick Links", "त्वरित लिंक")}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t("About Our Foundation", "हमारे बारे में")}
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="hover:text-white transition-colors">
                  {t("Active Campaigns", "सक्रिय अभियान")}
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-white transition-colors">
                  {t("Success Stories", "सफलता की कहानियाँ")}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  {t("Media & Gallery", "मीडिया एवं गैलरी")}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  {t("Community Events", "सामुदायिक कार्यक्रम")}
                </Link>
              </li>
              <li>
                <Link href="/transparency" className="hover:text-white transition-colors">
                  {t("Transparency & Filings", "पारदर्शिता एवं ऑडिट")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  {t("Frequently Asked Questions", "अक्सर पूछे जाने वाले सवाल")}
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-[#F58220] font-semibold transition-colors">
                  {t("Become a Volunteer", "स्वयंसेवक बनें")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Focus Programs */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white border-b border-emerald-800/60 pb-2">
              {t("Our Programs", "प्रमुख सेवा क्षेत्र")}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <Link href="/programs/food-drives" className="hover:text-white transition-colors">
                  {t("Food Distribution & Annadaan", "अन्नदान एवं भोजन वितरण")}
                </Link>
              </li>
              <li>
                <Link href="/programs/mass-marriage" className="hover:text-white transition-colors">
                  {t("Samuhik Vivah / Mass Marriage", "सामूहिक विवाह महोत्सव")}
                </Link>
              </li>
              <li>
                <Link href="/programs/health-camps" className="hover:text-white transition-colors">
                  {t("Health Camps & Medical Aid", "निःशुल्क स्वास्थ्य शिविर")}
                </Link>
              </li>
              <li>
                <Link href="/programs/child-education" className="hover:text-white transition-colors">
                  {t("Child Education & Vidyadaan", "शिक्षा सहायता एवं विद्यादान")}
                </Link>
              </li>
              <li>
                <Link href="/programs/women-empowerment" className="hover:text-white transition-colors">
                  {t("Women Empowerment & Skills", "महिला सशक्तिकरण व स्वावलंबन")}
                </Link>
              </li>
              <li>
                <Link href="/programs/rural-development" className="hover:text-white transition-colors">
                  {t("Rural & Village Development", "ग्रामोत्थान एवं ग्रामीण विकास")}
                </Link>
              </li>
              <li>
                <Link href="/programs/emergency-relief" className="hover:text-white transition-colors">
                  {t("Emergency & Disaster Relief", "आपदा राहत एवं आपातकालीन सहायता")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white border-b border-emerald-800/60 pb-2">
              {t("Contact Us", "संपर्क सूत्र")}
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-100/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                <span>
                  {t(
                    "Village – Tetarpur, P.O. – Khagaul, Police Station – Danapur, District – Patna, Bihar",
                    "ग्राम – टेटरपुर, पो० – खगौल, थाना – दानापुर, जिला – पटना, बिहार"
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0877C9] shrink-0" />
                <a href="tel:+917544990585" className="hover:text-white">
                  +91 75449 90585
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#087F5B] shrink-0" />
                <a href="mailto:aarogyabandhanfoundation@gmail.com" className="hover:text-white">
                  aarogyabandhanfoundation@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </div>
            </div>

            <div className="pt-3">
              <p className="text-[11px] font-semibold text-emerald-200 mb-2">
                {t("Connect With Us", "सोशल मीडिया पर जुड़ें")}
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-900/60 hover:bg-[#0877C9] flex items-center justify-center text-xs font-bold text-white transition-colors"
                >
                  FB
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-900/60 hover:bg-[#F58220] flex items-center justify-center text-xs font-bold text-white transition-colors"
                >
                  IG
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-900/60 hover:bg-rose-600 flex items-center justify-center text-xs font-bold text-white transition-colors"
                >
                  YT
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-900/60 hover:bg-[#0877C9] flex items-center justify-center text-xs font-bold text-white transition-colors"
                >
                  IN
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-900/60 hover:bg-slate-700 flex items-center justify-center text-xs font-bold text-white transition-colors"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="mt-12 pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/70 gap-4">
          <p>© {new Date().getFullYear()} Arogya Bandhan Foundation. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-emerald-400 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
