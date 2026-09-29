import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import CampaignDetailClient from "./CampaignDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const campaign = await prisma.campaign.findFirst({
      where: { OR: [{ slug: params.slug }, { id: params.slug }] },
    });
    if (!campaign) return { title: "Campaign Not Found" };
    return {
      title: `${campaign.title} | Arogya Bandhan Foundation`,
      description: campaign.description,
    };
  } catch {
    return { title: "Campaign Details | Arogya Bandhan Foundation" };
  }
}

export default async function CampaignDetailPage({ params }: { params: { slug: string } }) {
  let campaign = null;

  try {
    campaign = await prisma.campaign.findFirst({
      where: { OR: [{ slug: params.slug }, { id: params.slug }] },
      include: {
        donations: {
          where: { status: "SUCCESS" },
          orderBy: { createdAt: "desc" },
          take: 10,
          select: {
            id: true,
            donorName: true,
            amount: true,
            isAnonymous: true,
            createdAt: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("CampaignDetailPage database error:", error);
  }

  if (!campaign) notFound();

  return <CampaignDetailClient campaign={campaign} />;
}
