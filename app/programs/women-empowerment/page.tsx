import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetailView from "@/components/ProgramDetailView";
import { getProgramBySlug } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Women Empowerment & Livelihood | Arogya Bandhan Foundation",
  description:
    "Vocational skill training in tailoring, handicrafts, computer basics, and financial literacy to empower rural women with dignified self-reliance.",
};

export default async function WomenEmpowermentPage() {
  const program = await getProgramBySlug("women-empowerment");
  if (!program) notFound();
  return <ProgramDetailView program={program} />;
}
