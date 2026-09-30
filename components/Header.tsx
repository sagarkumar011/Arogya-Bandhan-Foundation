"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Phone,
  Mail,
  Menu,
  X,
  Heart,
  User,
  Shield,
  LogOut,
  ChevronDown,
  Globe,
} from "lucide-react";
import QuickDonationModal from "./QuickDonationModal";
import BrandLogo from "./BrandLogo";

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("Home", "होम") },
    { href: "/about", label: t("About Us", "हमारे बारे में") },
    { href: "/programs", label: t("Our Work", "हमारा कार्य") },
    { href: "/campaigns", label: t("Campaigns", "अभियान") },
    { href: "/#impact", label: t("Impact", "प्रभाव") },
    { href: "/gallery", label: t("Gallery", "गैलरी") },
    { href: "/events", label: t("Events", "इवेंट्स") },
    { href: "/volunteer", label: t("Volunteer", "स्वयंसेवक") },
    { href: "/donate", label: t("Donate", "सहयोग करें") },
    { href: "/contact", label: t("Contact", "संपर्क") },
  ];

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-[#0B2F2A] text-white text-xs py-2 px-4 border-b border-emerald-900/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 text-emerald-100 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F58220]" />
              <span>+91 98765 43210</span>
            </a>
            <a
              href="mailto:contact@arogyabandhan.org"
              className="flex items-center gap-1.5 text-emerald-100 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#0877C9]" />
              <span>contact@arogyabandhan.org</span>
            </a>
            <span className="text-emerald-300/80 font-medium">
              "Healthy People | Stronger Communities"
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 text-emerald-200">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors text-xs font-semibold"
                aria-label="Facebook"
              >
                FB
              </a>
              <span>•</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors text-xs font-semibold"
                aria-label="Instagram"
              >
                IG
              </a>
              <span>•</span>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors text-xs font-semibold"
                aria-label="YouTube"
              >
                YT
              </a>
              <span>•</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors text-xs font-semibold"
                aria-label="LinkedIn"
              >
                IN
              </a>
              <span>•</span>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors text-xs font-semibold"
                aria-label="X Twitter"
              >
                X
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-white py-2.5 sm:py-3 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2">
          {/* Official Brand Logo */}
          <Link
            href="/"
            className="flex items-center group focus:outline-none flex-shrink-0"
            aria-label="Arogya Bandhan Foundation Home"
          >
            <BrandLogo priority />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-[#087F5B] bg-[#EAF7F2] font-semibold"
                      : "text-[#17324D] hover:text-[#087F5B] hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header CTAs & Utilities */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full border border-slate-200 text-[#17324D] hover:border-[#0877C9] hover:text-[#0877C9] transition-all"
              title="Toggle Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 text-[#0877C9]" />
              <span>{language === "en" ? "हिन्दी" : "English"}</span>
            </button>

            {/* User Account / Admin Panel */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-100 text-[#17324D] hover:bg-slate-200 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#087F5B]" />
                  <span className="max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-dropdown border border-slate-100 py-1.5 z-50"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-[#17324D]">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/user/dashboard"
                      className="flex items-center gap-2 px-3 py-2 text-xs text-[#17324D] hover:bg-[#EAF7F2] hover:text-[#087F5B]"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <User className="w-3.5 h-3.5" />
                      {t("User Dashboard", "यूजर डैशबोर्ड")}
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#0877C9] hover:bg-[#EAF4FB]"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Shield className="w-3.5 h-3.5" />
                        {t("Admin Panel", "एडमिन पैनल")}
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 border-t border-slate-100"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      {t("Logout", "लॉगआउट")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/user/login"
                className="text-xs font-semibold text-[#17324D] hover:text-[#087F5B] px-3 py-1.5 transition-colors"
              >
                {t("Sign In", "लॉग इन")}
              </Link>
            )}

            {/* Donate Now CTA Button */}
            <button
              onClick={() => setDonationModalOpen(true)}
              className="btn-accent flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-transform active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{t("Donate Now", "दान करें")}</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden flex-shrink-0">
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="px-2 py-1 text-xs font-semibold rounded border border-slate-200 text-[#17324D] hover:border-[#0877C9] transition-colors"
            >
              {language === "en" ? "हिन्दी" : "EN"}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-[#17324D] hover:text-[#087F5B] focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#087F5B]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded-lg ${
                  pathname === link.href
                    ? "bg-[#EAF7F2] text-[#087F5B] font-semibold"
                    : "text-[#17324D] hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDonationModalOpen(true);
                }}
                className="w-full btn-accent py-2.5 rounded-xl text-center text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>{t("Donate Now", "दान करें")}</span>
              </button>

              {user ? (
                <div className="flex gap-2">
                  <Link
                    href="/user/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-slate-100 text-[#17324D]"
                  >
                    {t("My Dashboard", "डैशबोर्ड")}
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-[#EAF4FB] text-[#0877C9]"
                    >
                      {t("Admin Panel", "एडमिन")}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="p-2 rounded-lg bg-rose-50 text-rose-600"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/user/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 text-center text-xs font-semibold rounded-lg border border-slate-300 text-[#17324D]"
                >
                  {t("User Login / Register", "यूजर लॉगिन / रजिस्टर")}
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Quick Donation Modal Popup */}
      <QuickDonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />
    </>
  );
}
