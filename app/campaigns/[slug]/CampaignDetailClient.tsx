"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import QuickDonationModal from "@/components/QuickDonationModal";
import {
  Heart,
  Users,
  Target,
  Calendar,
  Share2,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function CampaignDetailClient({ campaign }: { campaign: any }) {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const progressPercent = Math.min(
    100,
    Math.round((campaign.raisedAmount / (campaign.goalAmount || 1)) * 100)
  );

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Support "${campaign.title}" with Arogya Bandhan Foundation! Every contribution saves lives.`;

  const shareTo = (platform: "wa" | "fb" | "li" | "x") => {
    let url = "";
    if (platform === "wa") {
      url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareText}\n${shareUrl}`
      )}`;
    } else if (platform === "fb") {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`;
    } else if (platform === "li") {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`;
    } else if (platform === "x") {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`;
    }
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-0">
      {/* Hero Banner */}
      <section className="bg-[#0B2F2A] text-white py-14 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <span className="px-3.5 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-[#F58220]">
              {campaign.category}
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              {campaign.title}
            </h1>
            {campaign.hindiTitle && (
              <p className="text-lg text-emerald-200 font-semibold">{campaign.hindiTitle}</p>
            )}
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {campaign.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Campaign Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Feature Image */}
              <div className="relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-card">
                <Image
                  src={campaign.imageUrl || "/images/program_medical.jpg"}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Story */}
              <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100 space-y-4">
                <h3 className="font-heading font-bold text-2xl text-[#17324D]">
                  The Challenge & Our Campaign Mission
                </h3>
                <div className="text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
                  {campaign.story}
                </div>
              </div>

              {/* Verified Beneficiaries & Impact */}
              <div className="bg-[#EAF7F2] p-6 rounded-3xl border border-emerald-100 space-y-3">
                <h4 className="font-heading font-bold text-base text-[#087F5B]">
                  Direct Community Impact Delivery
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" />
                    <span>Targeting over {campaign.beneficiariesCount.toLocaleString("en-IN")} direct beneficiaries across vulnerable communities.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" />
                    <span>100% of community contributions go directly to procurement of materials, groceries, supplies, and field execution.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" />
                    <span>100% auditable 80G tax-compliant receipts generated automatically with each verified transaction.</span>
                  </li>
                </ul>
              </div>

              {/* Recent Verified Supporters */}
              {campaign.donations && campaign.donations.length > 0 && (
                <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-100 space-y-4">
                  <h4 className="font-heading font-bold text-base text-[#17324D]">
                    Recent Supporters ({campaign.donations.length})
                  </h4>
                  <div className="space-y-2">
                    {campaign.donations.map((d: any) => (
                      <div
                        key={d.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#EAF7F2] text-[#087F5B] font-bold flex items-center justify-center">
                            {d.isAnonymous ? "A" : d.donorName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-[#17324D] block">
                              {d.isAnonymous ? "Anonymous Contributor" : d.donorName}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {new Date(d.createdAt).toLocaleDateString("en-IN")}
                            </span>
                          </div>
                        </div>
                        <span className="font-extrabold text-[#087F5B]">
                          ₹{d.amount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Donation Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-card border border-slate-100 space-y-6 sticky top-24">
                {/* Numbers */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-black text-3xl sm:text-4xl text-[#087F5B]">
                      ₹{campaign.raisedAmount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold uppercase">
                      Raised
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    of ₹{campaign.goalAmount.toLocaleString("en-IN")} target goal ({progressPercent}%)
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#087F5B] via-[#0877C9] to-[#F58220] h-full rounded-full transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Meta stats */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-center text-xs">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="font-bold text-base text-[#17324D] block">
                      {campaign.donorsCount}
                    </span>
                    <span className="text-slate-400 text-[11px]">Donors</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="font-bold text-base text-[#17324D] block">
                      {campaign.beneficiariesCount}+
                    </span>
                    <span className="text-slate-400 text-[11px]">Beneficiaries</span>
                  </div>
                </div>

                {/* Donate CTA */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full btn-accent py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>DONATE TO THIS CAUSE</span>
                </button>

                {/* Security badge */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#087F5B]" />
                  <span>256-Bit SSL Encrypted Razorpay Ready</span>
                </div>

                {/* Social Share Section (Section 15) */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-[#0877C9]" />
                    <span>Share This Campaign</span>
                  </span>
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    <button
                      onClick={() => shareTo("wa")}
                      className="py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-colors"
                    >
                      WhatsApp
                    </button>
                    <button
                      onClick={() => shareTo("fb")}
                      className="py-2 rounded-xl bg-blue-50 text-[#0877C9] text-xs font-bold hover:bg-blue-100 transition-colors"
                    >
                      Facebook
                    </button>
                    <button
                      onClick={() => shareTo("li")}
                      className="py-2 rounded-xl bg-sky-50 text-sky-700 text-xs font-bold hover:bg-sky-100 transition-colors"
                    >
                      LinkedIn
                    </button>
                    <button
                      onClick={() => shareTo("x")}
                      className="py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuickDonationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultCampaignId={campaign.id}
        defaultCampaignTitle={campaign.title}
      />
    </div>
  );
}
