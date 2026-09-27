"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Quote } from "lucide-react";

export interface StoryItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  challenge: string;
  supportProvided: string;
  outcome: string;
  personName?: string | null;
  imageUrl: string;
  quote?: string | null;
}

export default function StoryCard({ story }: { story: StoryItem }) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card-hover border border-slate-100 flex flex-col md:flex-row transition-all duration-300 group">
      {/* Story Image */}
      <div className="relative md:w-2/5 h-64 md:h-auto min-h-[220px] bg-slate-100 shrink-0">
        <Image
          src={story.imageUrl}
          alt={story.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 rounded-full text-xs font-bold text-[#087F5B] shadow-sm">
          {story.category}
        </div>
      </div>

      {/* Story Content */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-[#0877C9] font-semibold">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{story.location}</span>
          </div>

          <h3 className="font-heading font-bold text-xl text-[#17324D] leading-snug">
            {story.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 pt-1">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="font-bold text-rose-700 block mb-1">
                {t("The Challenge:", "समस्या:")}
              </span>
              <p className="line-clamp-3">{story.challenge}</p>
            </div>
            <div className="bg-[#EAF7F2] p-3 rounded-xl border border-emerald-100">
              <span className="font-bold text-[#087F5B] block mb-1">
                {t("Support Provided:", "सहायता:")}
              </span>
              <p className="line-clamp-3">{story.supportProvided}</p>
            </div>
          </div>

          <div className="text-xs text-slate-700">
            <strong>{t("Impact Outcome:", "सकारात्मक परिणाम:")}</strong> {story.outcome}
          </div>
        </div>

        {story.quote && (
          <div className="pt-3 border-t border-slate-100 flex items-start gap-2.5 text-xs italic text-slate-600 bg-amber-50/50 p-3 rounded-xl border border-amber-100/60">
            <Quote className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
            <div>
              <p>"{story.quote}"</p>
              {story.personName && (
                <span className="block font-semibold text-slate-800 not-italic mt-1">
                  — {story.personName}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
