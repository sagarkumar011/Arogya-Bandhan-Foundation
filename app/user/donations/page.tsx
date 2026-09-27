"use client";

import React, { useState, useEffect } from "react";
import { Download, Filter, Search, Heart } from "lucide-react";
import { generateDonationReceiptPDF } from "@/lib/receipt-generator";

export default function UserDonationsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetch("/api/donations/my-donations")
      .then((r) => r.json())
      .then((data) => {
        if (data.donations) setDonations(data.donations);
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

  const filtered = donations.filter((d) => {
    const matchesSearch =
      d.donationNumber.toLowerCase().includes(search.toLowerCase()) ||
      (d.campaign?.title || "General Healthcare Fund")
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#17324D]">
          My Contributions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review your lifetime giving history and download official computer-generated receipts.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-soft border border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by donation ref or campaign..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            <option value="ALL">All Statuses</option>
            <option value="SUCCESS">Success / Verified</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-5">Donation Ref</th>
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5">Purpose / Campaign</th>
                <th className="py-3.5 px-5">Amount</th>
                <th className="py-3.5 px-5">Payment Mode</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Official Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-5 font-mono font-medium text-slate-700">
                    {d.donationNumber}
                  </td>
                  <td className="py-4 px-5 text-slate-500">
                    {new Date(d.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="py-4 px-5 font-semibold text-[#17324D]">
                    {d.campaign?.title || "General Healthcare Fund"}
                  </td>
                  <td className="py-4 px-5 font-bold text-[#087F5B]">
                    ₹{d.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 px-5 text-slate-500">
                    {d.paymentMethod}
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF7F2] text-[#087F5B]">
                      {d.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => downloadReceipt(d)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-[#087F5B] hover:border-[#087F5B] hover:bg-[#EAF7F2] transition-all font-semibold text-[11px]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No contributions found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
