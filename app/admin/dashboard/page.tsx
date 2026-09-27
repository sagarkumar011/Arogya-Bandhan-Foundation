"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  Target,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Download,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { generateDonationReceiptPDF } from "@/lib/receipt-generator";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/analytics?range=30d").then((r) => r.json()),
      fetch("/api/admin/donations").then((r) => r.json()),
    ])
      .then(([analyticsData, donData]) => {
        if (analyticsData.success) setData(analyticsData);
        if (donData.donations) setDonations(donData.donations.slice(0, 6));
      })
      .finally(() => setLoading(false));
  }, []);

  const downloadReceipt = (donation: any) => {
    const doc = generateDonationReceiptPDF({
      receiptNumber: donation.receipt?.receiptNumber || "ABF-REC-2026-0001",
      donationNumber: donation.donationNumber,
      donorName: donation.donorName,
      donorEmail: donation.donorEmail,
      donorPhone: donation.donorPhone,
      donorPan: donation.donorPan,
      donorAddress: donation.donorAddress,
      amount: donation.amount,
      date: donation.createdAt,
      campaignName: donation.campaign?.title || "General Healthcare Fund",
      paymentMethod: donation.paymentMethod,
      paymentId: donation.razorpayPaymentId,
    });
    doc.save(`Arogya_Bandhan_Receipt_${donation.receipt?.receiptNumber || donation.donationNumber}.pdf`);
  };

  const summary = data?.summary || {
    totalDonations: 0,
    donationCount: 0,
    monthDonations: 0,
    activeCampaigns: 0,
    totalUsers: 0,
    totalVolunteers: 0,
    pendingApplications: 0,
    upcomingEvents: 0,
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
            Arogya Bandhan Foundation Management
          </span>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#17324D] mt-1">
            Executive Admin Control
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time database analytics, financial oversight, campaign monitoring, and field volunteer coordination.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/donations"
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            Donations Ledger
          </Link>
          <Link
            href="/admin/campaigns"
            className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase"
          >
            + New Campaign
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid (Section 40) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Donations */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Raised
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#EAF7F2] text-[#087F5B] flex items-center justify-center">
              <Heart className="w-4 h-4 fill-current" />
            </div>
          </div>
          <h3 className="font-heading font-black text-3xl text-[#17324D]">
            ₹{summary.totalDonations.toLocaleString("en-IN")}
          </h3>
          <span className="text-xs text-emerald-700 font-semibold block">
            {summary.donationCount} successful verified donations
          </span>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Campaigns
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#EAF4FB] text-[#0877C9] flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-heading font-black text-3xl text-[#17324D]">
            {summary.activeCampaigns}
          </h3>
          <span className="text-xs text-[#0877C9] font-semibold block">
            Live public donation drives
          </span>
        </div>

        {/* Volunteers */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Volunteers
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FFF2E8] text-[#F58220] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-heading font-black text-3xl text-[#17324D]">
            {summary.totalVolunteers}
          </h3>
          <span className="text-xs text-amber-700 font-semibold block">
            {summary.pendingApplications} pending reviews
          </span>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Upcoming Camps
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-heading font-black text-3xl text-[#17324D]">
            {summary.upcomingEvents}
          </h3>
          <span className="text-xs text-purple-700 font-semibold block">
            {summary.totalRegistrations || 0} registered patients
          </span>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Donation Trends Area Chart */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-[#17324D]">
                Contribution Growth (Last 30 Days)
              </h3>
              <p className="text-xs text-slate-400">Real-time daily transaction amounts</p>
            </div>
            <Link
              href="/admin/analytics"
              className="text-xs font-bold text-[#087F5B] hover:underline"
            >
              Full Analytics →
            </Link>
          </div>

          <div className="h-64 w-full pt-4">
            {data?.donationTrends && data.donationTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.donationTrends}>
                  <defs>
                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#087F5B" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#087F5B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94A3B8" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#94A3B8" tickFormatter={(v) => `₹${v}`} />
                  <Tooltip
                    formatter={(val: any) => [`₹${val.toLocaleString("en-IN")}`, "Donations"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#087F5B"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorAmt)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No recent transactions in this date range.
              </div>
            )}
          </div>
        </div>

        {/* Campaign Breakdown */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#17324D]">
            Top Campaigns
          </h3>
          <div className="space-y-4 pt-1">
            {data?.campaignStats?.map((c: any) => {
              const pct = Math.min(100, Math.round((c.raisedAmount / (c.goalAmount || 1)) * 100));
              return (
                <div key={c.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#17324D] truncate max-w-[180px]">{c.title}</span>
                    <span className="text-[#087F5B]">₹{c.raisedAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#087F5B] to-[#0877C9] h-2 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{pct}% funded</span>
                    <span>{c.donorsCount} donors</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Donations Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#17324D]">
              Recent Verified Contributions
            </h3>
            <p className="text-xs text-slate-400">
              Live audit ledger of all incoming transactions
            </p>
          </div>
          <Link
            href="/admin/donations"
            className="text-xs font-bold text-[#087F5B] hover:underline"
          >
            View Full Table →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Ref Number</th>
                <th className="py-3 px-4">Donor Name</th>
                <th className="py-3 px-4">Campaign</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {donations.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                    {d.donationNumber}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#17324D]">
                    {d.donorName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {d.campaign?.title || "General Healthcare Fund"}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#087F5B]">
                    ₹{d.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(d.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF7F2] text-[#087F5B]">
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => downloadReceipt(d)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#087F5B] hover:bg-emerald-50 transition-colors"
                      title="Download Official Receipt"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
