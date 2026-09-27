"use client";

import React, { useState, useEffect } from "react";
import { Users, CheckCircle2, XCircle, Clock, Search, Filter, FileSpreadsheet, Loader2, MessageSquare } from "lucide-react";

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [reviewStatus, setReviewStatus] = useState("APPROVED");
  const [reviewNotes, setReviewNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchVolunteers = () => {
    setLoading(true);
    let url = "/api/admin/volunteers";
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (statusFilter !== "ALL") params.append("status", statusFilter);
    if (params.toString()) url += `?${params.toString()}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.volunteers) setVolunteers(data.volunteers);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVolunteers();
  }, [statusFilter]);

  const openReview = (v: any) => {
    setSelectedApp(v);
    setReviewStatus(v.status);
    setReviewNotes(v.reviewNotes || "");
    setReviewModalOpen(true);
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;
    setUpdating(true);

    try {
      const res = await fetch("/api/admin/volunteers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedApp.id,
          status: reviewStatus,
          reviewNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update status");

      setReviewModalOpen(false);
      fetchVolunteers();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const exportCSV = () => {
    if (volunteers.length === 0) return;
    const headers = ["ID", "FullName", "Email", "Phone", "City", "Occupation", "AreasOfInterest", "Availability", "Status", "Date"];
    const rows = volunteers.map((v) => [
      v.id,
      `"${v.fullName.replace(/"/g, '""')}"`,
      v.email,
      v.phone,
      `"${v.city}"`,
      `"${v.occupation}"`,
      `"${v.areasOfInterest}"`,
      v.availability,
      v.status,
      new Date(v.createdAt).toISOString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Arogya_Bandhan_Volunteers_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#17324D]">
            Volunteer Applications Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review applicant credentials, assign health camp roles, approve certifications, and export volunteer rosters.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-sm shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#087F5B]" />
          <span>Export Volunteers CSV</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, city, occupation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchVolunteers()}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B] bg-white text-slate-700"
          >
            <option value="ALL">All Application Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="UNDER_REVIEW">UNDER REVIEW</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-16 text-center flex items-center justify-center">
            <Loader2 className="w-7 h-7 text-[#087F5B] animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-5">Applicant</th>
                  <th className="py-3.5 px-5">Contact</th>
                  <th className="py-3.5 px-5">City</th>
                  <th className="py-3.5 px-5">Occupation</th>
                  <th className="py-3.5 px-5">Interest</th>
                  <th className="py-3.5 px-5">Availability</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {volunteers.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-5">
                      <span className="font-bold text-[#17324D] block">{v.fullName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(v.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-slate-600 block">{v.email}</span>
                      <span className="text-slate-400 text-[11px] block">{v.phone}</span>
                    </td>
                    <td className="py-4 px-5 text-slate-600 font-medium">{v.city}</td>
                    <td className="py-4 px-5 text-slate-600">{v.occupation}</td>
                    <td className="py-4 px-5 text-slate-600 max-w-[160px] truncate">
                      {v.areasOfInterest}
                    </td>
                    <td className="py-4 px-5 text-slate-600">{v.availability}</td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          v.status === "APPROVED"
                            ? "bg-[#EAF7F2] text-[#087F5B]"
                            : v.status === "REJECTED"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => openReview(v)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-[#087F5B] hover:border-[#087F5B] hover:bg-[#EAF7F2] transition-all font-semibold"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
                {volunteers.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-slate-400">
                      No volunteer applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {reviewModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="bg-[#0B2F2A] px-6 py-4 text-white flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base">Review Volunteer Application</h3>
                <p className="text-xs text-emerald-200">{selectedApp.fullName} ({selectedApp.email})</p>
              </div>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="p-1 rounded-full text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateStatus} className="p-6 space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <p><strong>Skills:</strong> {selectedApp.skills}</p>
                <p><strong>Areas of Interest:</strong> {selectedApp.areasOfInterest}</p>
                <p><strong>Availability:</strong> {selectedApp.availability}</p>
                {selectedApp.message && (
                  <p><strong>Applicant Message:</strong> "{selectedApp.message}"</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Update Status *
                </label>
                <select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B] bg-white text-slate-800"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="UNDER_REVIEW">UNDER REVIEW</option>
                  <option value="APPROVED">APPROVED (Active Volunteer)</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Coordinator Review Notes (Visible to Applicant)
                </label>
                <textarea
                  rows={3}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="e.g. Approved for Lucknow medical screening camp coordination..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="btn-primary px-5 py-2 rounded-xl font-bold uppercase tracking-wider"
                >
                  {updating ? "Saving..." : "Save Review Decision"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
