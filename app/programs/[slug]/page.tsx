import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetailView from "@/components/ProgramDetailView";
import { getProgramBySlug } from "@/lib/programs-data";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const program = await getProgramBySlug(params.slug);
  if (!program) {
    return {
      title: "Program Focus | Arogya Bandhan Foundation",
    };
  }
  return {
    title: `${program.title} | Arogya Bandhan Foundation`,
    description: program.description,
  };
}

export function generateStaticParams() {
  return [
    { slug: "food-distribution" },
    { slug: "child-welfare" },
    { slug: "education-support" },
    { slug: "rural-development" },
    { slug: "emergency-relief" },
    { slug: "blood-donation-camps" },
    { slug: "community-welfare" },
  ];
}

export default async function DynamicProgramDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const program = await getProgramBySlug(params.slug);

  if (!program) {
    notFound();
  }

  return <ProgramDetailView program={program} />;
}
