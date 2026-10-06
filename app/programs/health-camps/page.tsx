import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetailView from "@/components/ProgramDetailView";
import { getProgramBySlug } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Community Health Camps | Arogya Bandhan Foundation",
  description:
    "Free medical checkups, doctor consultations, essential medicine distribution, and specialized eye and diagnostic screenings in remote and underserved villages.",
};

export default async function HealthCampsPage() {
  const program = await getProgramBySlug("health-camps");
  if (!program) notFound();
  return <ProgramDetailView program={program} />;
}
