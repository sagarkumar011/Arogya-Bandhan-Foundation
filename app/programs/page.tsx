import React from "react";
import prisma from "@/lib/prisma";
import ProgramCard from "@/components/ProgramCard";

import { PROGRAM_LIST } from "@/lib/constants";

export const metadata = {
  title: "Our Work & Social Initiatives | Arogya Bandhan Foundation",
  description:
    "Explore the foundational social welfare programs of Arogya Bandhan Foundation: Health Camps, Food Distribution, Mass Marriage, Child Welfare, Education, Women Empowerment, and Rural Development.",
};

export const dynamic = "force-dynamic";

export default async function ProgramsPage() {
  let programs: any[] = [];
  try {
    programs = await prisma.program.findMany({
      where: { status: "ACTIVE" },
      orderBy: { displayOrder: "asc" },
    });
  } catch (error) {
    console.error("ProgramsPage database query fallback:", error);
  }

  const displayPrograms = programs.length > 0 ? programs : PROGRAM_LIST;

  return (
    <div className="space-y-0">
      {/* Banner */}
      <section className="bg-[#0B2F2A] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-emerald-300 border border-white/20">
              Community Service & Welfare Pillars
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Our Work Across Key Social Verticals
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Targeted, sustained interventions designed to serve humanity: food security, dignified mass marriages, school kits for rural children, women self-reliance, emergency relief, and community health camps.
            </p>
          </div>
        </div>
      </section>

      {/* Program Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPrograms.map((program) => (
              <ProgramCard key={program.id || program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
