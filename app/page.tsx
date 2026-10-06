import React from "react";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import HeroSlider from "@/components/HeroSlider";
import CampaignCard from "@/components/CampaignCard";
import ProgramCard from "@/components/ProgramCard";
import ImpactCounter from "@/components/ImpactCounter";
import EventCard from "@/components/EventCard";
import StoryCard from "@/components/StoryCard";
import {
  Heart,
  Users,
  ShieldCheck,
  Stethoscope,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Utensils,
  HeartHandshake,
  Baby,
  Trees,
  LifeBuoy,
  FileCheck,
  Eye,
  Award,
} from "lucide-react";
import { PROGRAM_LIST } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let campaigns: any[] = [];
  let programs: any[] = [];
  let events: any[] = [];
  let stories: any[] = [];
  let latestBlogs: any[] = [];
  let galleryImages: any[] = [];
  let settings: any[] = [];

  try {
    const results = await Promise.all([
      prisma.campaign.findMany({
        where: { status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      prisma.program.findMany({
        where: { status: "ACTIVE" },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.event.findMany({
        where: { status: "OPEN" },
        orderBy: { eventDate: "asc" },
        take: 3,
      }),
      prisma.successStory.findMany({
        where: { isPublished: true },
        take: 4,
      }),
      prisma.blogPost.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
        take: 3,
      }),
      prisma.galleryImage.findMany({
        where: { isFeatured: true },
        take: 6,
      }),
      prisma.setting.findMany(),
    ]);

    [campaigns, programs, events, stories, latestBlogs, galleryImages, settings] = results;
  } catch (error) {
    console.error("HomePage database query fallback:", error);
  }

  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  const displayPrograms = programs.length > 0 ? programs : PROGRAM_LIST;

  return (
    <div className="space-y-0 bg-white">
      {/* 1. HUMANITARIAN HERO SLIDER (Section 3 & 4) */}
      <HeroSlider />

      {/* 2. QUICK IMPACT / TRUST STRIP (Section 9) */}
      <section className="bg-slate-50 border-y border-slate-200 py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#087F5B] transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#087F5B] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#17324D]">Social Welfare</h4>
                <p className="text-[11px] text-slate-500">Community First</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#087F5B] transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F58220] flex items-center justify-center shrink-0">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#17324D]">Food Drives</h4>
                <p className="text-[11px] text-slate-500">Annapurna Seva</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#087F5B] transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#17324D]">Mass Marriage</h4>
                <p className="text-[11px] text-slate-500">Samuhik Vivah</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#087F5B] transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0877C9] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#17324D]">Child Education</h4>
                <p className="text-[11px] text-slate-500">Vidyadaan Kits</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#087F5B] transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#17324D]">Women Uplift</h4>
                <p className="text-[11px] text-slate-500">Skill & Dignity</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#087F5B] transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#17324D]">Health Camps</h4>
                <p className="text-[11px] text-slate-500">Free Care & Eyes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT FOUNDATION / WHO WE ARE (Section 10, 11, 12) */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Social Impact Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[420px] sm:h-[480px]">
              <Image
                src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop"
                alt="Arogya Bandhan Foundation Community Outreach"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2F2A]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 bg-[#F58220] text-white text-[11px] font-bold rounded-full uppercase tracking-wider">
                  Social Welfare & Humanity
                </span>
                <h3 className="text-xl font-bold mt-2">Serving Humanity, Strengthening Communities</h3>
                <p className="text-xs text-emerald-100/90 mt-1">
                  Reaching remote villages, urban slum settlements, and distressed families across India.
                </p>
              </div>
            </div>

            {/* Overlapping Floating Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EAF7F2] text-[#087F5B] flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <div className="text-lg font-black text-[#17324D]">100% Impact</div>
                  <div className="text-xs text-slate-500">Dedicated to grassroots service & transparent reporting</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission, Vision & Description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAF7F2] text-[#087F5B] border border-emerald-200">
                Who We Are
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#17324D] tracking-tight leading-tight">
                Empowering Lives Through{" "}
                <span className="text-[#087F5B]">Service, Compassion & Dignity</span>
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <strong>Arogya Bandhan Foundation</strong> is an Indian social welfare foundation and trust working
              tirelessly for vulnerable and marginalized communities. Our holistic intervention spans across
              <strong> community health camps, food distribution (Annadaan), mass marriage support (Samuhik Vivah),
              child welfare, education, women empowerment, and disaster relief</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#087F5B] flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h4 className="font-bold text-[#17324D] text-sm">Compassionate Care</h4>
                <p className="text-xs text-slate-500">Unconditional support for every citizen in need.</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0877C9] flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h4 className="font-bold text-[#17324D] text-sm">Human Dignity</h4>
                <p className="text-xs text-slate-500">Empowering families to live with pride and self-reliance.</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-[#F58220] flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h4 className="font-bold text-[#17324D] text-sm">Radical Trust</h4>
                <p className="text-xs text-slate-500">Total transparency and auditable financial stewardship.</p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/about"
                className="btn-primary px-7 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>Know Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/transparency"
                className="px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#087F5B] border border-slate-200 hover:border-[#087F5B] transition-all"
              >
                Transparency & Governance
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR WORK — MAIN COMPREHENSIVE SECTION (Section 6) */}
      <section className="py-20 bg-slate-50 px-4 sm:px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#087F5B]">
              Compassion in Action
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#17324D] tracking-tight">
              OUR WORK
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              Creating meaningful change through service, compassion, and community action. Explore our key social welfare pillars.
            </p>
          </div>

          {/* 10 Program Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {displayPrograms.map((prog: any) => (
              <div
                key={prog.slug || prog.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={prog.imageUrl || "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600&auto=format&fit=crop"}
                      alt={prog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-3 text-[11px] font-bold text-white bg-[#0B2F2A]/85 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                      {prog.category || "Social Welfare"}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-[#17324D] text-base leading-snug group-hover:text-[#087F5B] transition-colors line-clamp-2">
                      {prog.title}
                    </h3>
                    {prog.hindiTitle && (
                      <p className="text-xs text-slate-500 font-medium">{prog.hindiTitle}</p>
                    )}
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {prog.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                  <Link
                    href={`/programs/${prog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087F5B] group-hover:text-[#076b4d] transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#17324D] hover:text-[#087F5B] border border-slate-300 hover:border-[#087F5B] font-bold text-xs uppercase tracking-wider rounded-2xl shadow-xs transition-all"
            >
              <span>View All Social Initiatives</span>
              <ArrowRight className="w-4 h-4 text-[#F58220]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FEATURED CAMPAIGNS (Section 14 & 18) */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-[#F58220]">
              Active Impact Campaigns
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#17324D] tracking-tight">
              Support Urgent Community Needs
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Every rupee is strictly audited and directed toward verified on-ground beneficiaries. Real-time progress backed by our database.
            </p>
          </div>

          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087F5B] hover:text-[#076b4d]"
          >
            <span>View All Campaigns</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((camp) => (
            <CampaignCard key={camp.id} campaign={camp} />
          ))}
        </div>
      </section>

      {/* 6. DEDICATED HIGHLIGHT 1: SAMUHIK VIVAH / MASS MARRIAGE (Section 8) */}
      <section className="py-20 bg-[#FFF2E8]/40 border-y border-amber-200/60 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F58220]/15 text-[#F58220] border border-[#F58220]/30">
                Samuhik Vivah Mahotsav
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#17324D] tracking-tight">
                Supporting Families,{" "}
                <span className="text-[#F58220]">Celebrating New Beginnings</span>
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                For impoverished families, wedding expenses frequently lead to lifelong moneylender debt and acute distress.
                Arogya Bandhan Foundation organizes traditional, dignified <strong>Samuhik Vivah (Mass Marriage)</strong> ceremonies
                where couples are provided with bridal attire, household starter essentials, cooking utensils, bedding, and community blessings.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#F58220] shrink-0" />
                  <span>Dignified traditional Vedic ceremonies without cost to families</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#F58220] shrink-0" />
                  <span>Complete household starter kits, utensils, clothing & blankets</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#F58220] shrink-0" />
                  <span>Official legal marriage registration support & community feast</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/donate"
                  className="btn-accent px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  Support a Marriage
                </Link>
                <Link
                  href="/programs/mass-marriage"
                  className="px-6 py-3.5 rounded-2xl text-xs font-bold text-slate-700 hover:text-[#17324D] border border-slate-300 transition-all"
                >
                  Program Details
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl h-[380px] sm:h-[440px]">
                <Image
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop"
                  alt="Arogya Bandhan Foundation Samuhik Vivah"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DEDICATED HIGHLIGHT 2: ANNAPURNA FOOD DISTRIBUTION (Section 9) */}
      <section className="py-20 bg-white px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl h-[380px] sm:h-[440px]">
                <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop"
                  alt="Arogya Bandhan Foundation Food Distribution"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#087F5B]">
                Annapurna Food & Nutrition
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#17324D] tracking-tight">
                Because No One Should{" "}
                <span className="text-[#087F5B]">Go To Bed Hungry</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Hunger robs children of education and elders of health. Our <strong>Annapurna Food Program</strong>
                operates weekly community kitchens, delivers hot nutritious meals to slum settlements, and provides
                monthly grocery kits (flour, rice, dal, oil) to destitute elderly and daily-wage families.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#087F5B] shrink-0" />
                  <span>Fresh, wholesome, hygienic hot meals served weekly</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#087F5B] shrink-0" />
                  <span>Dry ration kits for destitute elderly, widows and disabled citizens</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#087F5B] shrink-0" />
                  <span>Fortified nutrition supplements for undernourished infants and mothers</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/donate"
                  className="btn-primary px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  Feed a Family
                </Link>
                <Link
                  href="/programs/food-drives"
                  className="px-6 py-3.5 rounded-2xl text-xs font-bold text-slate-700 hover:text-[#17324D] border border-slate-300 transition-all"
                >
                  View Food Drives
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DEDICATED HIGHLIGHT 3: EDUCATION & CHILD WELFARE (Section 10 & 12) */}
      <section className="py-20 bg-slate-50 px-4 sm:px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#0877C9]">
                Children & Education (Vidyadaan)
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#17324D] tracking-tight">
                Every Child Deserves{" "}
                <span className="text-[#0877C9]">An Opportunity to Learn</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Education is the most powerful tool to break generational poverty. Our <strong>Vidyadaan Project</strong>
                equips thousands of first-generation learners with school bags, textbooks, notebooks, solar study lamps,
                and weekend volunteer tutoring centers.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#0877C9] shrink-0" />
                  <span>Complete school starter kits (bag, textbooks, stationery)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#0877C9] shrink-0" />
                  <span>After-school remedial study centers preventing rural dropouts</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#0877C9] shrink-0" />
                  <span>Sports, creative arts, and digital literacy workshops</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/donate"
                  className="btn-accent px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  Support a Child
                </Link>
                <Link
                  href="/programs/child-education"
                  className="px-6 py-3.5 rounded-2xl text-xs font-bold text-slate-700 hover:text-[#17324D] border border-slate-300 transition-all"
                >
                  Education Programs
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl h-[380px] sm:h-[440px]">
                <Image
                  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop"
                  alt="Arogya Bandhan Foundation Child Education"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. DEDICATED HIGHLIGHT 4: WOMEN EMPOWERMENT & HEALTH CAMPS (Section 7 & 11) */}
      <section className="py-20 bg-white px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Women Empowerment Card */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="relative h-56 w-full rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=800&auto=format&fit=crop"
                    alt="Women Empowerment"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B2F2A]/85 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    Women Livelihood
                  </div>
                </div>
                <h3 className="font-heading font-black text-2xl text-[#17324D]">
                  Empowering Women, Strengthening Families
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Vocational skill training in tailoring, garment crafting, computer basics, and financial literacy.
                  Graduates receive free sewing machines to launch home enterprises.
                </p>
              </div>
              <Link
                href="/programs/women-empowerment"
                className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#087F5B]"
              >
                <span>Support Women Empowerment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Health Camps Card */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="relative h-56 w-full rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop"
                    alt="Health Camps"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B2F2A]/85 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    Healthcare Within Reach
                  </div>
                </div>
                <h3 className="font-heading font-black text-2xl text-[#17324D]">
                  Community Health Camps & Eye Screening
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Free general physician checkups, blood sugar & BP tests, cataract evaluations, free prescription glasses,
                  and life-saving medicine distribution in remote villages.
                </p>
              </div>
              <Link
                href="/programs/health-camps"
                className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0877C9]"
              >
                <span>Support Health Camps</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. IMPACT COUNTER SECTION (Section 15 & 16) */}
      <ImpactCounter />

      {/* 11. SUCCESS STORIES (Section 18) */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAF7F2] text-[#087F5B]">
              Real Lives, Real Change
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#17324D] tracking-tight">
              Stories of Hope & Transformation
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Authentic narratives of families supported through Samuhik Vivah, Annapurna meals, child education, and medical checkups.
            </p>
          </div>

          <Link
            href="/success-stories"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087F5B] hover:text-[#076b4d]"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* 12. UPCOMING COMMUNITY EVENTS (Section 20 & 25) */}
      <section className="py-20 bg-slate-50 px-4 sm:px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
                Community Calendar
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#17324D] tracking-tight">
                Upcoming Events & Service Drives
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                Join our mass marriages, community meal preparations, and free diagnostic camps as a participant or volunteer.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0877C9] hover:text-[#065e9e]"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        </div>
      </section>

      {/* 13. GALLERY PREVIEW (Section 19 & 24) */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#087F5B]">
              Field Visuals
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#17324D] tracking-tight">
              Moments of Service & Community
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Photographs capturing community meals, mass weddings, student smiles, and health screening camps.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087F5B]"
          >
            <span>Open Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className="relative h-44 rounded-2xl overflow-hidden shadow-xs group bg-slate-100"
            >
              <Image
                src={img.imageUrl}
                alt={img.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                <span className="text-[10px] text-amber-300 font-bold uppercase">{img.category}</span>
                <p className="text-xs text-white font-semibold line-clamp-1">{img.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 14. VOLUNTEER INVITATION (Section 21 & 26) */}
      <section className="py-20 bg-gradient-to-br from-[#087F5B] to-[#0B2F2A] text-white px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md">
            Join Hands With Us
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Be A Part of the Change
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-2xl mx-auto">
            Whether you want to serve meals during Annapurna drives, teach village children, coordinate mass marriages,
            or assist doctors during health camps—your time and heart can bring dignity to thousands.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/volunteer"
              className="btn-accent px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
            >
              Become a Volunteer
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              Explore Our Values
            </Link>
          </div>
        </div>
      </section>

      {/* 15. TRANSPARENCY & TRUST PROMISE (Section 25 & 28) */}
      <section className="py-16 bg-slate-50 px-4 sm:px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#087F5B] flex items-center justify-center shrink-0">
              <FileCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-heading font-black text-xl text-[#17324D]">
                Transparency & Institutional Accountability
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Official trust registration deeds, PAN acknowledgement, audited statements, and statutory filings are public records.
              </p>
            </div>
          </div>

          <Link
            href="/transparency"
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-[#17324D] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0"
          >
            Access Public Documents
          </Link>
        </div>
      </section>

      {/* 16. FINAL DONATION CTA (Section 16 & 20) */}
      <section className="py-20 bg-gradient-to-r from-[#0B2F2A] via-[#087F5B] to-[#0877C9] text-white px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md">
            Give Today
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
            Your Support Can Change a Life
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl mx-auto">
            Choose to support community meals, educational kits, dignified mass marriages, or rural health camps.
            Instant official tax-compliant receipts generated for every donation.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Link
              href="/donate"
              className="btn-accent px-10 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-transform active:scale-95 flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Donate Now</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
