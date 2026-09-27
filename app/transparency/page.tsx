import React from "react";
import prisma from "@/lib/prisma";
import { ShieldCheck, FileText, Download, AlertCircle, CheckCircle2, Lock } from "lucide-react";

export const metadata = {
  title: "Transparency & Accountability | Arogya Bandhan Foundation",
  description: "Review Arogya Bandhan Foundation institutional registrations, financial statements, annual impact reports, and statutory compliance status.",
};

export const revalidate = 60;

export default async function TransparencyPage() {
  const documents = await prisma.transparencyDocument.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-0">
      {/* Banner */}
      <section className="bg-[#0B2F2A] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0877C9]">
              Institutional Governance
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Transparency & Accountability
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              We hold ourselves to the highest benchmarks of ethical governance, financial stewardship, and legal compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-slate-50 min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Statutory Disclosure Notice per Prompt Section 24 & 25 */}
          <div className="bg-[#EAF4FB] p-6 rounded-3xl border border-blue-200 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-[#0877C9] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm text-[#17324D] leading-relaxed">
              <h4 className="font-heading font-bold text-base text-[#0877C9]">
                Compliance & Legal Disclosure Policy
              </h4>
              <p>
                Arogya Bandhan Foundation publishes official documents as they are formally issued
                and certified by competent regulatory authorities. We do not invent certificate
                numbers or display unverified statistics.
              </p>
              <p className="text-xs text-slate-500 pt-1">
                *Note regarding 80G/12A: Statutory applications and verifications are processed in strict accordance with the Income Tax Department guidelines. When filings are completed, authentic certificates will be made downloadable directly below.
              </p>
            </div>
          </div>

          {/* Compliance Ledger Grid */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl text-[#17324D]">
              Public Compliance Ledger & Filings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 flex flex-col justify-between space-y-4 hover:shadow-card transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-[#087F5B] border border-emerald-100">
                        {doc.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{doc.year}</span>
                    </div>

                    <h4 className="font-heading font-bold text-base text-[#17324D]">
                      {doc.title}
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {doc.statusNote || "Official foundation compliance filing record."}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{doc.fileSize || "PDF Document"}</span>
                    <a
                      href={doc.documentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-[#087F5B] hover:text-[#066b4c]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Record</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Governance Principles */}
          <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100 space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#17324D]">
              Ethical Governance Standards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
              <div className="space-y-1">
                <strong className="text-[#17324D] block font-bold text-sm">Independent Audits</strong>
                <p>Annual financial statements are examined and verified by independent chartered accountants.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-[#17324D] block font-bold text-sm">Zero Fund Diversion</strong>
                <p>Donations designated for specific programs or medical campaigns are ring-fenced exclusively for that cause.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-[#17324D] block font-bold text-sm">Public Transparency</strong>
                <p>Citizens and contributors can inspect operational activities, camp registers, and impact reports.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
