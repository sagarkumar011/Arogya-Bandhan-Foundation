import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Heart, MapPin, Users, CheckCircle2, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const program = await prisma.program.findFirst({
      where: { OR: [{ slug: params.slug }, { id: params.slug }] },
    });
    if (!program) return { title: "Program Not Found" };
    return {
      title: `${program.title} | Arogya Bandhan Foundation`,
      description: program.description,
    };
  } catch {
    return { title: "Program Focus | Arogya Bandhan Foundation" };
  }
}

export default async function ProgramDetailPage({ params }: { params: { slug: string } }) {
  let program = null;
  let otherPrograms: any[] = [];

  try {
    program = await prisma.program.findFirst({
      where: { OR: [{ slug: params.slug }, { id: params.slug }] },
    });

    if (program) {
      otherPrograms = await prisma.program.findMany({
        where: { id: { not: program.id } },
        take: 3,
        orderBy: { displayOrder: "asc" },
      });
    }
  } catch (error) {
    console.error("ProgramDetailPage database error:", error);
  }

  if (!program) notFound();

  return (
    <div className="space-y-0">
      {/* Hero Banner */}
      <section className="bg-[#0B2F2A] text-white py-16 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase">
              <span>Program Focus</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              {program.title}
            </h1>
            {program.hindiTitle && (
              <p className="text-lg text-emerald-200 font-semibold">{program.hindiTitle}</p>
            )}
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {program.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Body */}
            <div className="lg:col-span-8 space-y-8">
              <div className="relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-card">
                <Image
                  src={program.imageUrl || "/images/program_medical.jpg"}
                  alt={program.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-heading font-bold text-2xl text-[#17324D]">
                  Program Overview & Methodology
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {program.detailedContent}
                </p>
              </div>

              {/* Implementation Highlights */}
              <div className="bg-[#EAF7F2] p-6 rounded-2xl border border-emerald-100 space-y-3">
                <h4 className="font-heading font-bold text-base text-[#087F5B]">
                  Key Ground Objectives & Impact
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" />
                    <span>Direct grassroots distribution and execution ensuring zero middlemen leakage.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" />
                    <span>Active engagement of verified local community volunteers and village coordinators.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" />
                    <span>100% transparent reporting, verified beneficiary registries, and auditable outcomes.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4">
                <h4 className="font-heading font-bold text-base text-[#17324D]">
                  Program Information
                </h4>
                <div className="space-y-3 text-xs text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-400 block mb-0.5">Target Beneficiaries</span>
                    <span className="font-bold text-[#17324D]">{program.targetGroup}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400 block mb-0.5">Field Geography</span>
                    <span className="font-bold text-[#17324D]">{program.location}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400 block mb-0.5">Execution Model</span>
                    <span className="font-bold text-[#17324D]">Direct Grassroots Volunteer Drives & Community Mobilization</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <Link
                    href={`/donate?program=${encodeURIComponent(program.title)}`}
                    className="w-full btn-accent py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>Support This Program</span>
                  </Link>

                  <Link
                    href="/volunteer"
                    className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-white text-[#087F5B] border border-emerald-300 hover:bg-emerald-50 transition-colors"
                  >
                    <Users className="w-4 h-4" />
                    <span>Volunteer For This Cause</span>
                  </Link>
                </div>
              </div>

              {/* Other Programs */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-3">
                <h4 className="font-heading font-bold text-sm text-[#17324D]">
                  Other Programs
                </h4>
                <div className="space-y-2">
                  {otherPrograms.map((op) => (
                    <Link
                      key={op.id}
                      href={`/programs/${op.slug}`}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-xs text-slate-700 transition-colors"
                    >
                      <span className="font-medium truncate">{op.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
