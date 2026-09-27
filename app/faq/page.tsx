"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const { t } = useLanguage();
  const [faqs, setFaqs] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = [
    "All",
    "Donation",
    "Programs",
    "Volunteering",
    "Events",
    "Transparency",
    "General",
  ];

  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => {
        if (data.faqs) setFaqs(data.faqs);
      })
      .catch(() => {});
  }, []);

  const filtered =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="space-y-0">
      {/* Banner */}
      <section className="bg-[#0B2F2A] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0877C9]">
              Questions & Answers
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Find transparent answers regarding our healthcare operations, donation receipts, volunteer engagements, and institutional compliance.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Main */}
      <section className="py-20 bg-slate-50 min-h-[60vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#087F5B] text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {t(cat)}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {filtered.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-[#17324D] hover:text-[#087F5B]"
                  >
                    <span>{t(faq.question, faq.hindiQuestion || faq.question)}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#087F5B]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 mt-1 whitespace-pre-line">
                      {t(faq.answer, faq.hindiAnswer || faq.answer)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
