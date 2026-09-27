"use client";

import React, { useState, useEffect } from "react";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import { generateDonationReceiptPDF } from "@/lib/receipt-generator";

export default function UserReceiptsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/donations/my-donations")
      .then((r) => r.json())
      .then((data) => {
        if (data.donations) {
          setDonations(data.donations.filter((d: any) => d.status === "SUCCESS"));
        }
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

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#17324D]">
          Official Donation Receipts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Each receipt is cryptographically sealed, assigned a permanent receipt number, and archived in the Foundation ledger.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 flex flex-col justify-between space-y-4 hover:shadow-card transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#087F5B] bg-[#EAF7F2] px-2.5 py-1 rounded-lg">
                  {d.receipt?.receiptNumber || d.donationNumber}
                </span>
                <span className="text-[11px] text-slate-400">
                  {new Date(d.createdAt).toLocaleDateString("en-IN")}
                </span>
              </div>

              <h4 className="font-heading font-bold text-base text-[#17324D] pt-1">
                {d.campaign?.title || "General Healthcare Fund"}
              </h4>

              <div className="pt-2 text-xs text-slate-600 space-y-1 border-t border-slate-100">
                <p>
                  <strong>Donor:</strong> {d.donorName}
                </p>
                <p>
                  <strong>Amount:</strong>{" "}
                  <span className="text-[#087F5B] font-bold">
                    ₹{d.amount.toLocaleString("en-IN")}
                  </span>
                </p>
                <p>
                  <strong>Payment ID:</strong> {d.razorpayPaymentId || "ONLINE"}
                </p>
              </div>
            </div>

            <button
              onClick={() => downloadReceipt(d)}
              className="w-full btn-primary py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Receipt</span>
            </button>
          </div>
        ))}

        {donations.length === 0 && (
          <div className="col-span-full bg-white p-12 rounded-3xl text-center text-slate-400 text-xs">
            No receipts generated yet. Contribute to a healthcare campaign to receive your official receipt.
          </div>
        )}
      </div>
    </div>
  );
}
