"use client";

import React, { useState, useEffect } from "react";
import { Download, Search, Filter, FileSpreadsheet, Loader2, Heart } from "lucide-react";
import { generateDonationReceiptPDF } from "@/lib/receipt-generator";

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchDonations = () => {
    setLoading(true);
    let url = "/api/admin/donations";
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (statusFilter !== "ALL") params.append("status", statusFilter);
    if (params.toString()) url += `?${params.toString()}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.donations) setDonations(data.donations);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDonations();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDonations();
  };

  const exportCSV = () => {
    if (donations.length === 0) return;
    const headers = [
      "DonationRef",
      "Date",
      "DonorName",
      "DonorEmail",
      "DonorPhone",
      "DonorPAN",
      "Campaign",
      "Amount",
      "PaymentMethod",
      "RazorpayPaymentID",
      "Status",
      "ReceiptNumber",
    ];
    const rows = donations.map((d) => [
      d.donationNumber,
      new Date(d.createdAt).toISOString(),
      `"${d.donorName.replace(/"/g, '""')}"`,
      d.donorEmail,
      d.donorPhone || "",
      d.donorPan || "",
      `"${(d.campaign?.title || "General Fund").replace(/"/g, '""')}"`,
      d.amount,
      d.paymentMethod,
      d.razorpayPaymentId || "",
      d.status,
      d.receiptNumber || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Arogya_Bandhan_Donations_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadReceipt = (donation: any) => {
    const doc = generateDonationReceiptPDF({
      receiptNumber: donation.receipt?.receiptNumber || donation.receiptNumber || "ABF-REC-2026-0001",
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
    doc.save(`Arogya_Bandhan_Receipt_${donation.receiptNumber || donation.donationNumber}.pdf`);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#17324D]">
            Financial & Donation Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete record of all incoming contributions, payment signatures, and issued statutory receipts.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-sm shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#087F5B]" />
          <span>Export Ledger CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, or ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
          />
        </form>

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
                  <th className="py-3.5 px-5">Ref Number</th>
                  <th className="py-3.5 px-5">Date</th>
                  <th className="py-3.5 px-5">Donor Details</th>
                  <th className="py-3.5 px-5">Campaign</th>
                  <th className="py-3.5 px-5">Amount</th>
                  <th className="py-3.5 px-5">Payment ID</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-5 font-mono font-medium text-slate-700">
                      {d.donationNumber}
                    </td>
                    <td className="py-4 px-5 text-slate-500">
                      {new Date(d.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-4 px-5">
                      <span className="font-bold text-[#17324D] block">{d.donorName}</span>
                      <span className="text-[11px] text-slate-400 block">{d.donorEmail}</span>
                      {d.donorPhone && (
                        <span className="text-[10px] text-slate-400 block">{d.donorPhone}</span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-slate-600 font-medium">
                      {d.campaign?.title || "General Healthcare Fund"}
                    </td>
                    <td className="py-4 px-5 font-extrabold text-[#087F5B]">
                      ₹{d.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-5 font-mono text-[11px] text-slate-400">
                      {d.razorpayPaymentId || "DIRECT"}
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
                {donations.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-slate-400">
                      No donation records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
