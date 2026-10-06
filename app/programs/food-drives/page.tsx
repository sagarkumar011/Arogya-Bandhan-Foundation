import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetailView from "@/components/ProgramDetailView";
import { getProgramBySlug } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Food Distribution & Annadaan | Arogya Bandhan Foundation",
  description:
    "Weekly community food drives, nutritious meal distribution for impoverished children, and grocery ration kits for destitute elderly and daily-wage families.",
};

export default async function FoodDrivesPage() {
  const program = await getProgramBySlug("food-drives");
  if (!program) notFound();
  return <ProgramDetailView program={program} />;
}
