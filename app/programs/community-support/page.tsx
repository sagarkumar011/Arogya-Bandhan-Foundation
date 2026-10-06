import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetailView from "@/components/ProgramDetailView";
import { getProgramBySlug } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Community Support & Social Service | Arogya Bandhan Foundation",
  description:
    "Elderly care companionship, winter clothing distribution, destitute family aid, and fostering grassroots mutual-aid volunteer networks.",
};

export default async function CommunitySupportPage() {
  const program = await getProgramBySlug("community-support");
  if (!program) notFound();
  return <ProgramDetailView program={program} />;
}
