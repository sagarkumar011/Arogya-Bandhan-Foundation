"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Stethoscope,
  Activity,
  BookOpen,
  ShieldAlert,
  Heart,
  Apple,
  Trees,
  Award,
  Users,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";

interface ProgramItem {
  id: string;
  title: string;
  hindiTitle?: string | null;
  slug: string;
  description: string;
  icon: string;
  imageUrl: string;
  targetGroup: string;
}

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  Activity,
  BookOpen,
  ShieldAlert,
  Heart,
  Apple,
  Trees,
  Award,
  Users,
  LifeBuoy,
};

export default function ProgramCard({ program }: { program: ProgramItem }) {
  const { t } = useLanguage();
  const IconComponent = iconMap[program.icon] || Stethoscope;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card-hover border border-slate-100 flex flex-col transition-all duration-300 group">
      {/* Image with zoom effect */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <Image
          src={program.imageUrl || "/images/program_medical.jpg"}
          alt={program.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Floating Program Icon Badge */}
        <div className="absolute -bottom-4 right-5 w-11 h-11 bg-white rounded-xl shadow-md flex items-center justify-center text-[#087F5B] border border-slate-100 group-hover:bg-[#087F5B] group-hover:text-white transition-all duration-300">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Program Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 pt-6">
        <div>
          <span className="text-[11px] font-semibold text-[#0877C9] uppercase tracking-wider block mb-1">
            {program.targetGroup}
          </span>
          <h3 className="font-heading font-bold text-lg text-[#17324D] group-hover:text-[#087F5B] transition-colors line-clamp-1">
            {t(program.title, program.hindiTitle || program.title)}
          </h3>
          <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
            {program.description}
          </p>
        </div>

        <Link
          href={`/programs/${program.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087F5B] group-hover:text-[#066b4c] pt-2 transition-colors"
        >
          <span>{t("Learn More About Program", "कार्यक्रम के बारे में जानें")}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
