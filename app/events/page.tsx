import React from "react";
import prisma from "@/lib/prisma";
import EventCard from "@/components/EventCard";

export const metadata = {
  title: "Events & Health Camps | Arogya Bandhan Foundation",
  description: "Join upcoming free health screening camps, eye checkup drives, and blood donation sessions organized by Arogya Bandhan Foundation.",
};

export const revalidate = 60;

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { eventDate: "asc" },
  });

  return (
    <div className="space-y-0">
      {/* Banner */}
      <section className="bg-[#0B2F2A] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
              Community Outreach
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Upcoming Health Camps & Events
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Register online for free community health screening camps, specialized medical consultations, and blood donation drives.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-16 text-slate-400 text-sm">
              No upcoming events currently scheduled. Check back soon!
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
