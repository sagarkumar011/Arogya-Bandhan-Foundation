"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Download,
  Loader2,
  Lock,
} from "lucide-react";
import confetti from "canvas-confetti";
import { generateDonationReceiptPDF } from "@/lib/receipt-generator";
import { DONATION_CATEGORIES } from "@/lib/constants";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function DonatePage() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const amounts = [100, 500, 1000, 2500, 5000];

  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<"ONE_TIME" | "MONTHLY">(
    "ONE_TIME"
  );
  const [campaignId, setCampaignId] = useState<string>("");
  const [campaigns, setCampaigns] = useState<any[]>([]);

  const [donorName, setDonorName] = useState(user?.name || "");
  const [donorEmail, setDonorEmail] = useState(user?.email || "");
  const [donorPhone, setDonorPhone] = useState(user?.phone || "");
  const [donorPan, setDonorPan] = useState("");
  const [donorAddress, setDonorAddress] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/campaigns")
      .then((r) => r.json())
      .then((data) => {
        if (data.campaigns) {
          setCampaigns(data.campaigns);

          if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);

            const cId = params.get("campaignId");
            const cSlug = params.get("campaign");
            const prog = params.get("program");

            if (cId) {
              setCampaignId(cId);
            } else if (cSlug) {
              const found = data.campaigns.find(
                (c: any) => c.slug === cSlug || c.id === cSlug
              );

              if (found) {
                setCampaignId(found.id);
              }
            } else if (prog) {
              const query = prog.toLowerCase();

              const found = data.campaigns.find(
                (c: any) =>
                  c.title.toLowerCase().includes(query) ||
                  c.category.toLowerCase().includes(query)
              );

              if (found) {
                setCampaignId(found.id);
              }
            }
          }
        }
      })
      .catch(() => {});
  }, []);

  const currentAmount = customAmount
    ? parseFloat(customAmount) || 0
    : selectedAmount;

  const loadRazorpayScript = async () => {
    if (typeof window === "undefined") {
      throw new Error("Razorpay can only be loaded in the browser.");
    }

    if (window.Razorpay) {
      return true;
    }

    return new Promise<boolean>((resolve, reject) => {
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(true));
        existingScript.addEventListener("error", () =>
          reject(new Error("Failed to load Razorpay Checkout."))
        );
        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => resolve(true);

      script.onerror = () =>
        reject(new Error("Failed to load Razorpay Checkout."));

      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    if (currentAmount < 10) {
      setError("Minimum contribution is ₹10");
      return;
    }

    if (!donorName || donorName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!donorEmail) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      // ---------------------------------------------------------
      // 1. Create Razorpay Order on Backend
      // ---------------------------------------------------------

      const orderRes = await fetch("/api/donations/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: currentAmount,
          campaignId: campaignId || null,
          donorName,
          donorEmail,
          donorPhone,
          donorPan,
          donorAddress,
          frequency,
          isAnonymous,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(
          orderData.error || "Failed to create donation order."
        );
      }

      if (!orderData.orderId) {
        throw new Error("Razorpay order ID was not received.");
      }

      if (!orderData.keyId) {
        throw new Error("Razorpay key was not received.");
      }

      // ---------------------------------------------------------
      // 2. Load Razorpay Checkout
      // ---------------------------------------------------------

      await loadRazorpayScript();

      if (!window.Razorpay) {
        throw new Error("Razorpay Checkout failed to load.");
      }

      // ---------------------------------------------------------
      // 3. Open REAL Razorpay Checkout
      // ---------------------------------------------------------

      const options = {
        key: orderData.keyId,

        amount: orderData.amount,

        currency: orderData.currency || "INR",

        name: "Arogya Bandhan Foundation",

        description: "Donation to Arogya Bandhan Foundation",

        order_id: orderData.orderId,

        prefill: {
          name: donorName,
          email: donorEmail,
          contact: donorPhone || "",
        },

        notes: {
          donorName,
          donorEmail,
          campaignId: campaignId || "general",
        },

        theme: {
          color: "#087F5B",
        },

        handler: async function (response: any) {
          try {
            setLoading(true);
            setError(null);

            // ---------------------------------------------------
            // 4. Verify ACTUAL Razorpay Payment
            // ---------------------------------------------------

            const verifyRes = await fetch("/api/donations/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,

                amount: currentAmount,
                campaignId: campaignId || null,

                donorName,
                donorEmail,
                donorPhone,
                donorPan,
                donorAddress,

                frequency,
                isAnonymous,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(
                verifyData.error || "Payment verification failed."
              );
            }

            // ---------------------------------------------------
            // 5. Payment Successfully Verified
            // ---------------------------------------------------

            try {
              confetti({
                particleCount: 100,
                spread: 70,
                origin: {
                  y: 0.6,
                },
              });
            } catch {}

            const matchedCampaign = campaigns.find(
              (c) => c.id === campaignId
            );

            setSuccessData({
              ...verifyData,

              amount: currentAmount,

              donorName,
              donorEmail,
              donorPhone,
              donorPan,
              donorAddress,

              campaignName: matchedCampaign
                ? matchedCampaign.title
                : "Arogya Bandhan Social Welfare Fund",
            });
          } catch (err: any) {
            setError(
              err.message ||
                "Payment was completed but verification failed. Please contact support."
            );
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
            setError("Payment was cancelled.");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      // ---------------------------------------------------------
      // Handle Payment Failure
      // ---------------------------------------------------------

      razorpay.on("payment.failed", function (response: any) {
        setLoading(false);

        setError(
          response?.error?.description ||
            "Payment failed. Please try again."
        );
      });

      // ---------------------------------------------------------
      // Open Razorpay
      // ---------------------------------------------------------

      razorpay.open();
    } catch (err: any) {
      setError(
        err.message ||
          "Something went wrong while processing your contribution."
      );

      setLoading(false);
    }
  };

  const downloadReceipt = () => {
    if (!successData) return;

    const doc = generateDonationReceiptPDF({
      receiptNumber:
        successData.receiptNumber || "ABF-REC-2026-0001",

      donationNumber:
        successData.donation?.donationNumber ||
        "ABF-DON-2026-0001",

      donorName: successData.donorName,

      donorEmail: successData.donorEmail,

      donorPhone: successData.donorPhone,

      donorPan: successData.donorPan,

      donorAddress: successData.donorAddress,

      amount: successData.amount,

      date: new Date(),

      campaignName: successData.campaignName,

      paymentMethod: "RAZORPAY",

      paymentId:
        successData.donation?.razorpayPaymentId ||
        "PAY-ONLINE-VERIFIED",
    });

    doc.save(
      `Arogya_Bandhan_Receipt_${successData.receiptNumber}.pdf`
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAF7F2] text-[#087F5B] border border-emerald-200">
            Arogya Bandhan Foundation Giving Portal
          </span>

          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#17324D] tracking-tight">
            Your Support Can Change a Life
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Supporting community welfare, food distribution (Annadaan),
            mass marriages (Samuhik Vivah), child education, women
            empowerment, and free rural health camps across India.
          </p>
        </div>

        {/* Success Card */}
        {successData ? (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-slate-100 text-center space-y-6 animate-fadeIn">

            <div className="w-20 h-20 bg-[#EAF7F2] text-[#087F5B] rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h2 className="font-heading font-black text-3xl text-[#17324D]">
                Contribution Confirmed!
              </h2>

              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Thank you, <strong>{successData.donorName}</strong>.
                Your donation of{" "}
                <span className="text-[#087F5B] font-bold">
                  ₹{successData.amount.toLocaleString("en-IN")}
                </span>{" "}
                has been received and securely accounted for in our
                official foundation ledger.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="max-w-md mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left text-xs space-y-2 text-[#17324D]">

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">
                  Receipt Reference:
                </span>

                <span className="font-mono font-bold text-[#087F5B]">
                  {successData.receiptNumber}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">
                  Donation Ref:
                </span>

                <span className="font-mono">
                  {successData.donation?.donationNumber}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">
                  Purpose / Campaign:
                </span>

                <span className="font-semibold">
                  {successData.campaignName}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">
                  Status:
                </span>

                <span className="text-emerald-700 font-bold">
                  Verified & Active
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-500">
                  Email Confirmation:
                </span>

                <span>{successData.donorEmail}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">

              <button
                onClick={downloadReceipt}
                className="btn-primary px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <Download className="w-4 h-4" />

                <span>
                  Download Official PDF Receipt
                </span>
              </button>

              <button
                onClick={() => setSuccessData(null)}
                className="px-6 py-3.5 rounded-2xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Make Another Contribution
              </button>
            </div>
          </div>
        ) : (
          /* Two-Column Donation Experience */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column */}
            <div className="lg:col-span-5 space-y-6">

              {/* Trust Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-2xl bg-[#EAF7F2] text-[#087F5B] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-heading font-black text-lg text-[#17324D]">
                      Trust & Transparency Pledge
                    </h3>

                    <p className="text-xs text-slate-500">
                      Registered Social Welfare Trust
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every rupee contributed to Arogya Bandhan Foundation
                  is deployed directly to on-ground programs: feeding
                  families, organizing mass marriages, funding children's
                  school kits, empowering women with sewing machines,
                  and conducting rural health checkups.
                </p>

                <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">

                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" />

                    <span>
                      Instant official PDF receipt generated upon payment
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" />

                    <span>
                      Real-time mathematical update on campaign progress bars
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" />

                    <span>
                      100% secure payment gateway with SSL encryption
                    </span>
                  </div>
                </div>
              </div>

              {/* Supported Social Causes */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">

                <h4 className="font-bold text-sm text-[#17324D] uppercase tracking-wider">
                  Where Your Donation Goes
                </h4>

                <div className="grid grid-cols-1 gap-2">

                  {DONATION_CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-slate-800">
                        {cat.label}
                      </span>

                      <span className="text-[11px] text-slate-500 max-w-[200px] text-right truncate">
                        {cat.desc}
                      </span>
                    </div>
                  ))}

                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-slate-200">

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* Error */}
                {error && (
                  <div className="p-4 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-medium">
                    {error}
                  </div>
                )}

                {/* Frequency */}
                <div>

                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    1. Giving Frequency
                  </label>

                  <div className="grid grid-cols-2 gap-3 bg-slate-100 p-1.5 rounded-2xl">

                    <button
                      type="button"
                      onClick={() => setFrequency("ONE_TIME")}
                      className={`py-3 text-xs font-bold rounded-xl transition-all ${
                        frequency === "ONE_TIME"
                          ? "bg-white text-[#087F5B] shadow-sm"
                          : "text-slate-600 hover:text-[#17324D]"
                      }`}
                    >
                      One-Time Contribution
                    </button>

                    <button
                      type="button"
                      onClick={() => setFrequency("MONTHLY")}
                      className={`py-3 text-xs font-bold rounded-xl transition-all ${
                        frequency === "MONTHLY"
                          ? "bg-white text-[#087F5B] shadow-sm"
                          : "text-slate-600 hover:text-[#17324D]"
                      }`}
                    >
                      Monthly Seva Supporter
                    </button>

                  </div>
                </div>

                {/* Amount */}
                <div>

                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    2. Select Donation Amount (INR)
                  </label>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-3">

                    {amounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount("");
                        }}
                        className={`py-3 px-2 rounded-2xl font-black text-sm transition-all border ${
                          selectedAmount === amt && !customAmount
                            ? "border-[#F58220] bg-orange-50 text-[#F58220] shadow-sm"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        ₹{amt.toLocaleString("en-IN")}
                      </button>
                    ))}

                  </div>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                      ₹
                    </span>

                    <input
                      type="number"
                      min="10"
                      placeholder="Or enter custom amount in Rupees"
                      value={customAmount}
                      onChange={(e) =>
                        setCustomAmount(e.target.value)
                      }
                      className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-[#17324D] focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>
                </div>

                {/* Campaign */}
                <div>

                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    3. Direct Your Gift Toward a Specific Cause
                  </label>

                  <select
                    value={campaignId}
                    onChange={(e) =>
                      setCampaignId(e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-[#17324D] focus:outline-none focus:border-[#087F5B]"
                  >
                    <option value="">
                      Arogya Bandhan Social Welfare General Fund
                      (Where Most Needed)
                    </option>

                    {campaigns.map((c) => (
                      <option
                        key={c.id}
                        value={c.id}
                      >
                        {c.category}: {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Donor Details */}
                <div className="space-y-4 pt-2 border-t border-slate-100">

                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    4. Donor Identification (For Official Receipt)
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Full Name *"
                        value={donorName}
                        onChange={(e) =>
                          setDonorName(e.target.value)
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-[#17324D] focus:outline-none focus:border-[#087F5B]"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address (for Receipt) *"
                        value={donorEmail}
                        onChange={(e) =>
                          setDonorEmail(e.target.value)
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-[#17324D] focus:outline-none focus:border-[#087F5B]"
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>
                      <input
                        type="tel"
                        placeholder="Mobile Number (Optional)"
                        value={donorPhone}
                        onChange={(e) =>
                          setDonorPhone(e.target.value)
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-[#17324D] focus:outline-none focus:border-[#087F5B]"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="PAN Card Number (Optional)"
                        value={donorPan}
                        onChange={(e) =>
                          setDonorPan(e.target.value.toUpperCase())
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-[#17324D] uppercase focus:outline-none focus:border-[#087F5B]"
                      />
                    </div>

                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Postal Address (Optional)"
                      value={donorAddress}
                      onChange={(e) =>
                        setDonorAddress(e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-[#17324D] focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">

                    <input
                      type="checkbox"
                      id="anonCheck"
                      checked={isAnonymous}
                      onChange={(e) =>
                        setIsAnonymous(e.target.checked)
                      }
                      className="w-4 h-4 text-[#087F5B] rounded border-slate-300 focus:ring-[#087F5B]"
                    />

                    <label
                      htmlFor="anonCheck"
                      className="text-xs text-slate-600 font-medium"
                    >
                      Make my contribution anonymous in public donor rolls
                    </label>

                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-slate-100 space-y-3">

                  <button
                    type="submit"
                    disabled={loading || currentAmount < 10}
                    className="w-full btn-accent py-4 rounded-2xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >

                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />

                        <span>
                          Processing Payment...
                        </span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 fill-current" />

                        <span>
                          Proceed to Donate ₹
                          {currentAmount.toLocaleString("en-IN")}
                        </span>
                      </>
                    )}

                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">

                    <Lock className="w-3.5 h-3.5" />

                    <span>
                      256-bit Encrypted Transaction • Razorpay Secure Checkout
                    </span>

                  </div>
                </div>

              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
