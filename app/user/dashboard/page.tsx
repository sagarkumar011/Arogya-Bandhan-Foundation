"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  Heart,
  FileText,
  Users,
  Calendar,
  Bell,
  ArrowRight,
  TrendingUp,
  Download,
  CheckCircle2,
} from "lucide-react";
import { generateDonationReceiptPDF } from "@/lib/receipt-generator";

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [donations, setDonations] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/donations/my-donations").then((r) => r.json()),
      fetch("/api/volunteers/my-applications").then((r) => r.json()),
      fetch("/api/events/my-registrations").then((r) => r.json()),
      fetch("/api/notifications").then((r) => r.json()),
    ])
      .then(([donData, volData, evtData, notifData]) => {
        if (donData.donations) setDonations(donData.donations);
        if (volData.applications) setApplications(volData.applications);
        if (evtData.registrations) setEvents(evtData.registrations);
        if (notifData.notifications) setNotifications(notifData.notifications);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalDonated = donations
    .filter((d) => d.status === "SUCCESS")
    .reduce((sum, d) => sum + d.amount, 0);

  const downloadReceipt = (donation: any) => {
    const doc = generateDonationReceiptPDF({
      receiptNumber: donation.receipt?.receiptNumber || "ABF-REC-2026-0001",
      donationNumber: donation.donationNumber,
      donorName: donation.donorName,
      donorEmail: donation.donorEmail,
      donorPhone: donation.donorPhone,
      donorPan: donation.donorPan,
      amount: donation.amount,
      date: donation.createdAt,
      campaignName: donation.campaign?.title || "General Healthcare Fund",
      paymentMethod: donation.paymentMethod,
      paymentId: donation.razorpayPaymentId,
    });
    doc.save(`Arogya_Bandhan_Receipt_${donation.receipt?.receiptNumber || donation.donationNumber}.pdf`);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-soft border border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
            Welcome Back
          </span>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#17324D] mt-1">
            Hello, {user?.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your impact, download official receipts, and monitor your community engagements.
          </p>
        </div>

        <Link
          href="/donate"
          className="btn-accent px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm text-center justify-center shrink-0"
        >
          <Heart className="w-4 h-4 fill-current" />
          <span>Contribute Now</span>
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#EAF7F2] text-[#087F5B] flex items-center justify-center">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Total Contributions
          </span>
          <h3 className="font-heading font-black text-2xl text-[#17324D]">
            ₹{totalDonated.toLocaleString("en-IN")}
          </h3>
          <span className="text-[11px] text-[#087F5B] font-semibold">
            {donations.filter((d) => d.status === "SUCCESS").length} verified donations
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#EAF4FB] text-[#0877C9] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Official Receipts
          </span>
          <h3 className="font-heading font-black text-2xl text-[#17324D]">
            {donations.filter((d) => d.receiptNumber).length}
          </h3>
          <span className="text-[11px] text-[#0877C9] font-semibold">
            Available for PDF download
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#FFF2E8] text-[#F58220] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Volunteer Applications
          </span>
          <h3 className="font-heading font-black text-2xl text-[#17324D]">
            {applications.length}
          </h3>
          <span className="text-[11px] text-amber-700 font-semibold">
            {applications[0]?.status || "None submitted"}
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Registered Events
          </span>
          <h3 className="font-heading font-black text-2xl text-[#17324D]">
            {events.length}
          </h3>
          <span className="text-[11px] text-purple-600 font-semibold">
            Community health camps
          </span>
        </div>
      </div>

      {/* Recent Donations Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-100 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#17324D]">
              Recent Contribution History
            </h3>
            <p className="text-xs text-slate-400">
              Directly connected to our transparent compliance ledger
            </p>
          </div>
          <Link
            href="/user/donations"
            className="text-xs font-bold text-[#087F5B] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {donations.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs">
            No contributions made yet. Support an urgent healthcare mission today!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-100">
                <tr>
                  <th className="py-3 px-4">Donation Ref</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Campaign</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {donations.slice(0, 5).map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                      {d.donationNumber}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(d.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#17324D]">
                      {d.campaign?.title || "General Healthcare Fund"}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#087F5B]">
                      ₹{d.amount.toLocaleString("en-IN")}
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
        )}
      </div>

      {/* Notifications preview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-100 space-y-4">
        <h3 className="font-heading font-bold text-lg text-[#17324D]">
          Recent Account Notifications
        </h3>
        <div className="space-y-2">
          {notifications.slice(0, 3).map((n) => (
            <div
              key={n.id}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3 text-xs"
            >
              <div>
                <h5 className="font-bold text-[#17324D]">{n.title}</h5>
                <p className="text-slate-600 mt-0.5">{n.message}</p>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0">
                {new Date(n.createdAt).toLocaleDateString("en-IN")}
              </span>
            </div>
          ))}
          {notifications.length === 0 && (
            <p className="text-xs text-slate-400 py-4 text-center">No notifications.</p>
          )}
        </div>
      </div>
    </div>
  );
}
