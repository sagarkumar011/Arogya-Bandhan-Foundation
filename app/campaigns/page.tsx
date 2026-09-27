import React from "react";
import prisma from "@/lib/prisma";
import CampaignCard from "@/components/CampaignCard";

export const metadata = {
  title: "Active Campaigns | Arogya Bandhan Foundation",
  description: "Support active healthcare campaigns by Arogya Bandhan Foundation. Every contribution is verified, tracked, and utilized directly on the ground.",
};

export const revalidate = 60;

export default async function CampaignsPage() {
  const campaigns = await prisma.campaign.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-0">
      {/* Banner */}
      <section className="bg-[#0B2F2A] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
              Give Hope & Healing
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Active Healthcare Campaigns
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Transparent, verified causes addressing urgent medical, nutritional, and hygiene needs across vulnerable communities in India.
            </p>
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((camp) => (
              <CampaignCard key={camp.id} campaign={camp} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
