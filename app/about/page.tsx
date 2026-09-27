import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Shield,
  Eye,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Utensils,
  BookOpen,
  HeartHandshake,
  Baby,
  Trees,
  LifeBuoy,
  FileCheck,
} from "lucide-react";

export const metadata = {
  title: "About Us | Arogya Bandhan Foundation",
  description:
    "Learn about Arogya Bandhan Foundation, an Indian social welfare trust dedicated to community service, food distribution, mass marriages, child welfare, education, and health camps.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Compassion",
      desc: "Serving every struggling individual and family with empathy, respect, and unconditional love.",
      icon: Heart,
    },
    {
      title: "Dignity",
      desc: "Upholding the pride and self-worth of every beneficiary in all our welfare and marriage initiatives.",
      icon: Award,
    },
    {
      title: "Transparency",
      desc: "Every single rupee received is audited and accounted for in our public governance ledger.",
      icon: Shield,
    },
    {
      title: "Service (Seva)",
      desc: "Selfless grassroots volunteerism without discrimination based on caste, creed, or background.",
      icon: Users,
    },
    {
      title: "Community",
      desc: "Fostering collective solidarity and mutual support across rural and urban neighborhoods.",
      icon: HeartHandshake,
    },
    {
      title: "Equality",
      desc: "Ensuring equal access to food, basic healthcare, education, and opportunities for all.",
      icon: CheckCircle2,
    },
    {
      title: "Empowerment",
      desc: "Providing tools, sewing machines, and learning materials that enable sustainable self-reliance.",
      icon: Sparkles,
    },
    {
      title: "Accountability",
      desc: "Commitment to strict legal compliance, verified numbers, and auditable social stewardship.",
      icon: FileCheck,
    },
  ];

  return (
    <div className="space-y-0 bg-white">
      {/* 1. Executive Banner */}
      <section className="bg-[#0B2F2A] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2F2A] via-[#087F5B]/30 to-[#0B2F2A]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-emerald-300 border border-white/20">
              About Arogya Bandhan Foundation
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Serving Humanity, Strengthening Communities
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              "Healthy People | Stronger Communities" — A broad social welfare foundation and trust dedicated to community service, food distribution, mass marriages, child education, women empowerment, and health camps across India.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative h-[440px] rounded-3xl overflow-hidden shadow-card border-4 border-slate-50">
                <Image
                  src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop"
                  alt="Arogya Bandhan Foundation Community Outreach"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
                  Who We Are
                </span>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#17324D] tracking-tight">
                  A Social Impact Trust Grounded in Grassroots Service
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                <strong>Arogya Bandhan Foundation</strong> is a registered social welfare organization founded on the
                timeless Indian ideal of <em>Sarve Bhavantu Sukhinah</em> (May all be happy and healthy). We believe that
                true societal wellbeing encompasses physical health, food security, educational dignity, women's self-reliance,
                and community harmony.
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                Our initiatives reach beyond medical assistance: we organize dignified <strong>Samuhik Vivah (Mass Marriages)</strong>
                for economically distressed families, operate <strong>Annapurna Food Drives</strong> to ensure no child goes hungry,
                distribute <strong>Vidyadaan School Kits</strong> to first-generation learners, train women in tailoring for dignified
                livelihoods, and conduct <strong>Free Community Health & Eye Screening Camps</strong> across underserved villages.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/programs"
                  className="btn-primary px-7 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Explore Our Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/transparency"
                  className="px-6 py-3 rounded-2xl text-xs font-bold text-slate-700 hover:text-[#087F5B] border border-slate-200 hover:border-[#087F5B] transition-all"
                >
                  Statutory Records
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#087F5B] flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-2xl text-[#17324D]">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To serve humanity and strengthen communities through accessible healthcare camps, food security programs,
                mass marriage assistance for disadvantaged families, child education kits, women vocational training, and
                emergency relief—building an India where every individual lives with health, dignity, and opportunity.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0877C9] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-2xl text-[#17324D]">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                An inclusive, empowered, and compassionate society where economic hardship does not hinder education, where no
                family bears the burden of debt for marriage or medicine, where nutritious food is accessible to all, and where
                grassroots communities are self-reliant and resilient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Core Values (Section 22) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
              Guiding Principles
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#17324D] tracking-tight">
              Our Core Values
            </h2>
            <p className="text-sm text-slate-600">
              The ethical commitments that anchor every field drive, partnership, and donation we undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-[#087F5B] transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs text-[#087F5B] flex items-center justify-center">
                  <v.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-[#17324D]">{v.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Approach */}
      <section className="py-20 bg-[#0B2F2A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-emerald-300">
              Our Methodology
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
              How We Create Lasting Social Impact
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              We partner directly with village panchayats, community elders, volunteer doctors, and local youth to identify
              authentic needs. By eliminating bureaucratic intermediaries, we ensure that 100% of support reaches the
              destitute, whether in the form of hot meals, school kits, wedding blessings, or free medicines.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="font-heading font-black text-3xl text-[#17324D]">
            Stand With Us in Service to Humanity
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Whether you donate, volunteer your time, or spread awareness, your contribution brings joy and dignity to families in need.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/donate"
              className="btn-accent px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md"
            >
              Donate Now
            </Link>
            <Link
              href="/volunteer"
              className="px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all"
            >
              Join As Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
