"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Clock, CheckCircle2, XCircle, AlertCircle, ArrowRight } from "lucide-react";

export default function UserVolunteerStatusPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/volunteers/my-applications")
      .then((r) => r.json())
      .then((data) => {
        if (data.applications) setApplications(data.applications);
      })
      .finally(() => setLoading(false));
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF7F2] text-[#087F5B]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approved & Active Volunteer</span>
          </span>
        );
      case "UNDER_REVIEW":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF4FB] text-[#0877C9]">
            <Clock className="w-3.5 h-3.5" />
            <span>Under Operational Review</span>
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700">
            <XCircle className="w-3.5 h-3.5" />
            <span>Application Closed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Review</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#17324D]">
            My Volunteer Engagement
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your volunteer application review status, assigned roles, and camp coordination notes.
          </p>
        </div>

        <Link
          href="/volunteer"
          className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase shrink-0 text-center"
        >
          New Application
        </Link>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white p-6 sm:p-8 rounded-3xl shadow-soft border border-slate-100 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-[#17324D]">
                  Application ID: <span className="font-mono text-xs">{app.id.slice(0, 8)}</span>
                </h3>
                <span className="text-[11px] text-slate-400">
                  Submitted on {new Date(app.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              {getStatusBadge(app.status)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="font-semibold text-slate-400 block mb-0.5">Areas of Interest</span>
                <span className="font-bold text-[#17324D]">{app.areasOfInterest}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="font-semibold text-slate-400 block mb-0.5">Availability</span>
                <span className="font-bold text-[#17324D]">{app.availability}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="font-semibold text-slate-400 block mb-0.5">Skills Logged</span>
                <span className="font-bold text-[#17324D]">{app.skills}</span>
              </div>
            </div>

            {app.reviewNotes && (
              <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl text-xs space-y-1">
                <strong className="text-[#087F5B] block font-bold">Admin Coordinator Note:</strong>
                <p className="text-emerald-950">{app.reviewNotes}</p>
              </div>
            )}
          </div>
        ))}

        {applications.length === 0 && (
          <div className="bg-white p-12 rounded-3xl text-center text-slate-400 text-xs space-y-3">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <p>You have not submitted a volunteer application yet.</p>
            <Link href="/volunteer" className="btn-primary inline-block px-5 py-2 rounded-xl text-xs font-bold">
              Apply to Volunteer
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
