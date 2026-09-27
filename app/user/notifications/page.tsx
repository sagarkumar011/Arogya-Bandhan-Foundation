"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, CheckCircle2, ArrowRight } from "lucide-react";

export default function UserNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifs = () => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((data) => {
        if (data.notifications) setNotifications(data.notifications);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  const markAllRead = async () => {
    await fetch("/api/notifications/mark-all/read", { method: "POST" });
    fetchNotifs();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#17324D]">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Receipt alerts, volunteer application updates, and event confirmations.
          </p>
        </div>

        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={markAllRead}
            className="text-xs font-bold text-[#087F5B] hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-5 rounded-3xl border transition-all ${
              n.isRead
                ? "bg-white border-slate-100 shadow-soft"
                : "bg-emerald-50/50 border-emerald-200 shadow-sm"
            } flex items-start justify-between gap-4`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm text-[#17324D]">
                  {n.title}
                </span>
                {!n.isRead && (
                  <span className="w-2 h-2 rounded-full bg-[#087F5B]" />
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
              {n.linkUrl && (
                <Link
                  href={n.linkUrl}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#087F5B] hover:underline pt-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>

            <span className="text-[10px] text-slate-400 shrink-0 font-medium">
              {new Date(n.createdAt).toLocaleDateString("en-IN")}
            </span>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="bg-white p-12 rounded-3xl text-center text-slate-400 text-xs">
            No notifications yet.
          </div>
        )}
      </div>
    </div>
  );
}
