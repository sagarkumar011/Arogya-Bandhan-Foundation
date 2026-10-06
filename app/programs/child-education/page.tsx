import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetailView from "@/components/ProgramDetailView";
import { getProgramBySlug } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Child Welfare & Education (Vidyadaan) | Arogya Bandhan Foundation",
  description:
    "Distribution of school bags, textbooks, stationery kits, digital learning aids, and remedial coaching camps to prevent dropouts in rural schools.",
};

export default async function ChildEducationPage() {
  const program = await getProgramBySlug("child-education");
  if (!program) notFound();
  return <ProgramDetailView program={program} />;
}
