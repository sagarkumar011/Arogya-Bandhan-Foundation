"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Users, Target, ArrowRight } from "lucide-react";
import QuickDonationModal from "./QuickDonationModal";

export interface CampaignData {
  id: string;
  title: string;
  hindiTitle?: string | null;
  slug: string;
  category: string;
  description: string;
  imageUrl: string;
  goalAmount: number;
  raisedAmount: number;
  donorsCount: number;
  beneficiariesCount: number;
  status: string;
}

export default function CampaignCard({ campaign }: { campaign: CampaignData }) {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const progressPercent = Math.min(
    100,
    Math.round((campaign.raisedAmount / (campaign.goalAmount || 1)) * 100)
  );

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card-hover border border-slate-100 flex flex-col transition-all duration-300 group">
        {/* Campaign Image with Tag */}
        <div className="relative h-52 w-full overflow-hidden bg-slate-100">
          <Image
            src={campaign.imageUrl || "/images/program_medical.jpg"}
            alt={campaign.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
          <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-[#087F5B] shadow-sm">
            {campaign.category}
          </span>
          {campaign.beneficiariesCount > 0 && (
            <span className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-white/95 font-medium drop-shadow-sm">
              <Users className="w-3.5 h-3.5 text-[#F58220]" />
              <span>{campaign.beneficiariesCount.toLocaleString("en-IN")}+ {t("Beneficiaries", "लाभार्थी")}</span>
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <Link href={`/campaigns/${campaign.slug}`}>
              <h3 className="font-heading font-bold text-lg text-[#17324D] hover:text-[#087F5B] transition-colors line-clamp-2 leading-snug">
                {t(campaign.title, campaign.hindiTitle || campaign.title)}
              </h3>
            </Link>
            <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
              {campaign.description}
            </p>
          </div>

          {/* Progress Section */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#087F5B]">
                ₹{campaign.raisedAmount.toLocaleString("en-IN")}
                <span className="text-slate-400 font-normal"> {t("raised", "एकत्र")}</span>
              </span>
              <span className="text-slate-500 font-medium">
                {progressPercent}% {t("of", "का")} ₹{campaign.goalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#087F5B] to-[#0877C9] h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <span>{campaign.donorsCount} {t("donors supported", "सहयोगी")}</span>
              <span className="text-emerald-700 font-semibold">{t("Verified Need", "सत्यापित आवश्यकता")}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setModalOpen(true)}
              className="flex-1 btn-accent py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{t("Donate Now", "दान करें")}</span>
            </button>

            <Link
              href={`/campaigns/${campaign.slug}`}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-[#087F5B] hover:border-[#087F5B] hover:bg-[#EAF7F2] transition-colors"
              title="Learn More"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <QuickDonationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultCampaignId={campaign.id}
        defaultCampaignTitle={campaign.title}
      />
    </>
  );
}
