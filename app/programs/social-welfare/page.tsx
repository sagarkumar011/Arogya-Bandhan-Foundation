import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetailView from "@/components/ProgramDetailView";
import { getProgramBySlug } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Social Welfare & Community Upliftment | Arogya Bandhan Foundation",
  description:
    "Comprehensive social welfare initiatives by Arogya Bandhan Foundation: child education, health camps, food drives, mass marriages, and women upliftment.",
};

export default async function SocialWelfarePage() {
  const program = await getProgramBySlug("social-welfare");
  if (!program) notFound();
  return <ProgramDetailView program={program} />;
}
