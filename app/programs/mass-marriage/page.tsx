import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetailView from "@/components/ProgramDetailView";
import { getProgramBySlug } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Samuhik Vivah / Mass Marriage | Arogya Bandhan Foundation",
  description:
    "Assisting economically weaker families by organizing dignified mass wedding ceremonies, providing essential household starter kits, and blessing new beginnings.",
};

export default async function MassMarriagePage() {
  const program = await getProgramBySlug("mass-marriage");
  if (!program) notFound();
  return <ProgramDetailView program={program} />;
}
