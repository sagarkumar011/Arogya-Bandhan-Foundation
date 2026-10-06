import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetailView from "@/components/ProgramDetailView";
import { getProgramBySlug } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Community Awareness & Social Welfare | Arogya Bandhan Foundation",
  description:
    "Grassroots awareness drives on hygiene, sanitation, government welfare schemes, child rights, and legal literacy for underserved citizens.",
};

export default async function CommunityAwarenessPage() {
  const program = await getProgramBySlug("community-awareness");
  if (!program) notFound();
  return <ProgramDetailView program={program} />;
}
