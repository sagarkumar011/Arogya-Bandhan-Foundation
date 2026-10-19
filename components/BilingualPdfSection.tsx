"use client";

import React, { useState } from "react";
import { BilingualDocSection } from "@/lib/programs-data";
import { Quote, Sparkles, CheckCircle2 } from "lucide-react";

interface BilingualPdfSectionProps {
  doc: BilingualDocSection;
}

type ViewMode = "both" | "hi" | "en";

export default function BilingualPdfSection({ doc }: BilingualPdfSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("both");

  return (
    <div className="space-y-6 pt-4">
      {/* Header Bar with Language Switcher */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087F5B]">
            <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
            <span>Official Bilingual Documentation • Page {doc.pageNumber}</span>
          </div>
          <h3 className="font-heading font-black text-lg sm:text-xl text-[#17324D]">
            {doc.emoji} {doc.titleEn} / {doc.titleHi}
          </h3>
        </div>

        {/* View Mode Toggle */}
        <div className="inline-flex p-1 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-semibold">
          <button
            type="button"
            onClick={() => setViewMode("both")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === "both"
                ? "bg-[#0B2F2A] text-white shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            📖 Both (दोनों)
          </button>
          <button
            type="button"
            onClick={() => setViewMode("hi")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === "hi"
                ? "bg-[#087F5B] text-white shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🇮🇳 हिन्दी (Hindi)
          </button>
          <button
            type="button"
            onClick={() => setViewMode("en")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === "en"
                ? "bg-[#0877C9] text-white shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🇬🇧 English
          </button>
        </div>
      </div>

      {/* Main Bilingual Content Display */}
      <div
        className={`grid gap-8 ${
          viewMode === "both"
            ? "grid-cols-1 lg:grid-cols-2"
            : "grid-cols-1 max-w-4xl mx-auto"
        }`}
      >
        {/* ======================================================== */}
        {/* HINDI COLUMN / CARD */}
        {/* ======================================================== */}
        {(viewMode === "both" || viewMode === "hi") && (
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-soft p-6 sm:p-8 space-y-6 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6">
              {/* Language Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100/80">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF7F2] text-[#087F5B] border border-emerald-200">
                  <span>🇮🇳</span>
                  <span>हिन्दी संस्करण (Hindi Version)</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  दस्तावेज़ पृष्ठ {doc.pageNumber}
                </span>
              </div>

              {/* Title & Emoji */}
              <div className="space-y-2">
                <h4 className="font-heading font-black text-2xl text-[#17324D] flex items-center gap-2">
                  <span>{doc.emoji}</span>
                  <span>{doc.titleHi}</span>
                </h4>
                {/* Subtitle / Tagline */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border-l-4 border-amber-400 text-sm font-semibold text-amber-950 italic">
                  {doc.subtitleHi}
                </div>
              </div>

              {/* Introductory Paragraphs */}
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                {doc.introHi.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Initiatives / Endeavors Heading & Bullets */}
              <div className="space-y-3 pt-2">
                <h5 className="font-heading font-bold text-base text-[#087F5B] flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span>{doc.initiativesHeadingHi}</span>
                </h5>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  {doc.bulletPoints.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-base shrink-0 leading-none mt-0.5">
                        {item.emoji}
                      </span>
                      <div className="space-y-0.5">
                        {item.hindiLabel && (
                          <strong className="text-[#17324D] font-bold block sm:inline mr-1.5">
                            {item.hindiLabel} –
                          </strong>
                        )}
                        <span>{item.hindiText}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sub-Section (e.g. हमारा संकल्प or शिक्षा से सपनों तक) */}
              {doc.subSection && (
                <div className="bg-[#EAF7F2]/60 p-4 sm:p-5 rounded-2xl border border-emerald-100 space-y-2">
                  <h5 className="font-heading font-bold text-sm sm:text-base text-[#087F5B]">
                    {doc.subSection.headingHi}
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {doc.subSection.textHi}
                  </p>
                </div>
              )}

              {/* Highlighted Statement */}
              {doc.highlightStatementHi && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 text-xs sm:text-sm font-bold text-emerald-950 leading-relaxed shadow-xs">
                  {doc.highlightStatementHi}
                </div>
              )}

              {/* Quote Block */}
              <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-[#087F5B] flex items-start gap-3 text-xs sm:text-sm italic font-medium text-slate-800">
                <Quote className="w-5 h-5 text-[#087F5B] shrink-0 opacity-70 mt-0.5" />
                <p>{doc.quoteHi}</p>
              </div>

              {/* Call to Action Block */}
              {doc.callToAction && (
                <div className="bg-[#FFF2E8]/70 p-4 sm:p-5 rounded-2xl border border-amber-200 space-y-2">
                  <h5 className="font-heading font-bold text-sm sm:text-base text-amber-900">
                    {doc.callToAction.headingHi}
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {doc.callToAction.textHi}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* ENGLISH COLUMN / CARD */}
        {/* ======================================================== */}
        {(viewMode === "both" || viewMode === "en") && (
          <div className="bg-white rounded-3xl border border-blue-100 shadow-soft p-6 sm:p-8 space-y-6 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6">
              {/* Language Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-blue-100/80">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF4FB] text-[#0877C9] border border-blue-200">
                  <span>🇬🇧</span>
                  <span>English Translation (Accurate Reference)</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  Document Page {doc.pageNumber}
                </span>
              </div>

              {/* Title & Emoji */}
              <div className="space-y-2">
                <h4 className="font-heading font-black text-2xl text-[#17324D] flex items-center gap-2">
                  <span>{doc.emoji}</span>
                  <span>{doc.titleEn}</span>
                </h4>
                {/* Subtitle / Tagline */}
                <div className="p-3.5 rounded-xl bg-blue-50/70 border-l-4 border-blue-400 text-sm font-semibold text-blue-950 italic">
                  {doc.subtitleEn}
                </div>
              </div>

              {/* Introductory Paragraphs */}
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                {doc.introEn.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Initiatives / Endeavors Heading & Bullets */}
              <div className="space-y-3 pt-2">
                <h5 className="font-heading font-bold text-base text-[#0877C9] flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span>{doc.initiativesHeadingEn}</span>
                </h5>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  {doc.bulletPoints.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-base shrink-0 leading-none mt-0.5">
                        {item.emoji}
                      </span>
                      <div className="space-y-0.5">
                        {item.englishLabel && (
                          <strong className="text-[#17324D] font-bold block sm:inline mr-1.5">
                            {item.englishLabel} –
                          </strong>
                        )}
                        <span>{item.englishText}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sub-Section (e.g. Our Pledge or From Education to Dreams) */}
              {doc.subSection && (
                <div className="bg-[#EAF4FB]/60 p-4 sm:p-5 rounded-2xl border border-blue-100 space-y-2">
                  <h5 className="font-heading font-bold text-sm sm:text-base text-[#0877C9]">
                    {doc.subSection.headingEn}
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {doc.subSection.textEn}
                  </p>
                </div>
              )}

              {/* Highlighted Statement */}
              {doc.highlightStatementEn && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50 border border-blue-200 text-xs sm:text-sm font-bold text-blue-950 leading-relaxed shadow-xs">
                  {doc.highlightStatementEn}
                </div>
              )}

              {/* Quote Block */}
              <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-[#0877C9] flex items-start gap-3 text-xs sm:text-sm italic font-medium text-slate-800">
                <Quote className="w-5 h-5 text-[#0877C9] shrink-0 opacity-70 mt-0.5" />
                <p>{doc.quoteEn}</p>
              </div>

              {/* Call to Action Block */}
              {doc.callToAction && (
                <div className="bg-[#FFF2E8]/70 p-4 sm:p-5 rounded-2xl border border-amber-200 space-y-2">
                  <h5 className="font-heading font-bold text-sm sm:text-base text-amber-900">
                    {doc.callToAction.headingEn}
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {doc.callToAction.textEn}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
