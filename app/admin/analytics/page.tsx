"use client";

import React, { useState, useEffect } from "react";
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
import { TrendingUp, Calendar, Heart, Users, Target, Loader2 } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState("30d"); // 7d, 30d, 3m, 6m, 1y
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = (r: string) => {
    setLoading(true);
    fetch(`/api/admin/analytics?range=${r}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAnalytics(range);
  }, [range]);

  const ranges = [
    { key: "7d", label: "Last 7 Days" },
    { key: "30d", label: "Last 30 Days" },
    { key: "3m", label: "3 Months" },
    { key: "6m", label: "6 Months" },
    { key: "1y", label: "1 Year" },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header & Date Range Filter (Section 68) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#17324D]">
            Analytics & Growth Metrics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Auditable mathematical intelligence derived from live database transactions and user actions.
          </p>
        </div>

        {/* Date Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
          {ranges.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                range === r.key
                  ? "bg-white text-[#087F5B] shadow-sm"
                  : "text-slate-600 hover:text-[#17324D]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="p-20 text-center flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#087F5B] animate-spin" />
        </div>
      ) : (
        <>
          {/* Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Raised ({range})
              </span>
              <h3 className="font-heading font-black text-3xl text-[#087F5B] mt-1">
                ₹{(data?.summary?.totalDonations || 0).toLocaleString("en-IN")}
              </h3>
              <span className="text-xs text-slate-500 mt-1 block">
                {data?.summary?.donationCount || 0} completed transactions
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Platform Users
              </span>
              <h3 className="font-heading font-black text-3xl text-[#0877C9] mt-1">
                {data?.summary?.totalUsers || 0}
              </h3>
              <span className="text-xs text-slate-500 mt-1 block">
                Verified donor & member accounts
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Volunteers Registered
              </span>
              <h3 className="font-heading font-black text-3xl text-[#F58220] mt-1">
                {data?.summary?.totalVolunteers || 0}
              </h3>
              <span className="text-xs text-slate-500 mt-1 block">
                Approved field healthcare champions
              </span>
            </div>
          </div>

          {/* Large Trend Chart */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#17324D]">
              Contribution Volume Trend
            </h3>
            <div className="h-80 w-full pt-4">
              {data?.donationTrends && data.donationTrends.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.donationTrends}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#087F5B" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#087F5B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94A3B8" />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      stroke="#94A3B8"
                      tickFormatter={(v) => `₹${v}`}
                    />
                    <Tooltip
                      formatter={(val: any) => [`₹${val.toLocaleString("en-IN")}`, "Contributions"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#087F5B"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#areaGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">
                  No transaction data available for the chosen date range.
                </div>
              )}
            </div>
          </div>

          {/* Campaign Bar Chart */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#17324D]">
              Campaign Raised Amounts Comparison
            </h3>
            <div className="h-72 w-full pt-4">
              {data?.campaignStats && data.campaignStats.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.campaignStats}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                      dataKey="title"
                      tick={{ fontSize: 10 }}
                      stroke="#94A3B8"
                      tickFormatter={(t) => (t.length > 18 ? `${t.slice(0, 18)}...` : t)}
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      stroke="#94A3B8"
                      tickFormatter={(v) => `₹${v}`}
                    />
                    <Tooltip
                      formatter={(val: any) => [`₹${val.toLocaleString("en-IN")}`, "Raised"]}
                    />
                    <Bar dataKey="raisedAmount" fill="#0877C9" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">
                  No active campaigns found.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
