"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, Ticket, CheckCircle2 } from "lucide-react";

export default function UserEventsPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events/my-registrations")
      .then((r) => r.json())
      .then((data) => {
        if (data.registrations) setRegistrations(data.registrations);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#17324D]">
            My Event Passes & Health Camps
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View your confirmed entry passes and venue instructions for registered camps.
          </p>
        </div>

        <Link
          href="/events"
          className="btn-secondary px-5 py-2.5 rounded-xl text-xs font-bold uppercase shrink-0 text-center"
        >
          Browse All Events
        </Link>
      </div>

      <div className="space-y-4">
        {registrations.map((reg) => (
          <div
            key={reg.id}
            className="bg-white p-6 sm:p-8 rounded-3xl shadow-soft border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-lg">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF4FB] text-[#0877C9]">
                  {reg.event?.category || "Health Camp"}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Pass: {reg.ticketNumber}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-[#17324D]">
                {reg.event?.title}
              </h3>

              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#087F5B]" />
                  <span>
                    {reg.event?.eventDate &&
                      new Date(reg.event.eventDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                  </span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5 text-[#0877C9]" />
                  <span>{reg.event?.startTime} - {reg.event?.endTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F58220]" />
                  <span>{reg.event?.venueAddress}</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#087F5B]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmed</span>
              </span>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center font-mono text-xs font-bold text-slate-700">
                {reg.ticketNumber}
              </div>
            </div>
          </div>
        ))}

        {registrations.length === 0 && (
          <div className="bg-white p-12 rounded-3xl text-center text-slate-400 text-xs space-y-3">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
            <p>You have not registered for any upcoming events yet.</p>
            <Link href="/events" className="btn-secondary inline-block px-5 py-2 rounded-xl text-xs font-bold">
              Explore Upcoming Camps
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
