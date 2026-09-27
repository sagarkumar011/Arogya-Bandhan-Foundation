"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Clock, MapPin, Users, Ticket, CheckCircle2, Loader2, X } from "lucide-react";

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  eventDate: string | Date;
  startTime: string;
  endTime: string;
  location: string;
  venueAddress: string;
  registrationLimit: number;
  registeredCount: number;
  status: string;
}

export default function EventCard({ event }: { event: EventItem }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedTicket, setConfirmedTicket] = useState<string | null>(null);

  const eventDateObj = new Date(event.eventDate);
  const monthStr = eventDateObj.toLocaleDateString("en-IN", { month: "short" });
  const dayStr = eventDateObj.getDate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/events/${event.id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to register for event");
      }
      setConfirmedTicket(data.ticketNumber);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card-hover border border-slate-100 flex flex-col transition-all duration-300 group">
        {/* Event Banner */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <Image
            src={event.imageUrl || "/images/program_medical.jpg"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Date Badge */}
          <div className="absolute top-3 left-3 bg-white rounded-xl p-2 text-center shadow-md min-w-[50px] border border-slate-100">
            <span className="block text-[10px] font-extrabold uppercase text-[#087F5B] leading-none">
              {monthStr}
            </span>
            <span className="block text-lg font-black text-[#17324D] leading-none mt-1">
              {dayStr}
            </span>
          </div>

          <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#0877C9] text-white text-[11px] font-bold rounded-full shadow-sm">
            {event.category}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-[#17324D] group-hover:text-[#087F5B] transition-colors line-clamp-2">
              {event.title}
            </h3>
            <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Meta Info */}
          <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#0877C9]" />
              <span>{event.startTime} - {event.endTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#F58220]" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#087F5B]" />
              <span>{event.registeredCount} / {event.registrationLimit} {t("Registered", "पंजीकृत")}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setModalOpen(true)}
            disabled={event.status === "CLOSED" || event.registeredCount >= event.registrationLimit}
            className="w-full btn-primary py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            <Ticket className="w-4 h-4" />
            <span>
              {event.status === "CLOSED"
                ? t("Registration Closed", "पंजीकरण बंद")
                : t("Register Free", "निःशुल्क पंजीकरण करें")}
            </span>
          </button>
        </div>
      </div>

      {/* Registration Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="bg-[#0877C9] px-6 py-4 text-white flex items-center justify-between">
              <div>
                <h4 className="font-heading font-bold text-base leading-tight">
                  {t("Event Registration", "इवेंट पंजीकरण")}
                </h4>
                <p className="text-xs text-blue-100 line-clamp-1">{event.title}</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-blue-100 hover:text-white hover:bg-blue-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {confirmedTicket ? (
                <div className="text-center py-4 space-y-4">
                  <div className="w-16 h-16 bg-[#EAF7F2] text-[#087F5B] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-heading font-bold text-xl text-[#17324D]">
                    {t("Registration Confirmed!", "पंजीकरण सफल रहा!")}
                  </h4>
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-left text-xs space-y-2 text-[#17324D]">
                    <p>
                      <strong>Ticket Reference:</strong>{" "}
                      <span className="font-mono text-[#087F5B] font-bold">{confirmedTicket}</span>
                    </p>
                    <p>
                      <strong>Event:</strong> {event.title}
                    </p>
                    <p>
                      <strong>Date & Time:</strong> {eventDateObj.toLocaleDateString("en-IN")}, {event.startTime}
                    </p>
                    <p>
                      <strong>Venue:</strong> {event.venueAddress}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setConfirmedTicket(null);
                      setModalOpen(false);
                    }}
                    className="w-full btn-primary py-2.5 rounded-xl text-xs font-bold"
                  >
                    {t("Done", "पूर्ण")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  {error && (
                    <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="bg-[#EAF4FB] p-3 rounded-xl text-xs text-[#17324D] space-y-1">
                    <p><strong>Venue:</strong> {event.venueAddress}</p>
                    <p><strong>Date & Time:</strong> {eventDateObj.toLocaleDateString("en-IN")}, {event.startTime} - {event.endTime}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#17324D] mb-1">
                      {t("Full Name *", "पूरा नाम *")}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Suresh Varma"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#0877C9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#17324D] mb-1">
                      {t("Email Address *", "ईमेल पता *")}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="suresh@example.com"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#0877C9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#17324D] mb-1">
                      {t("Phone Number *", "फोन नंबर *")}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#0877C9]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-secondary py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t("Confirming Registration...", "पुष्टि हो रही है...")}</span>
                        </>
                      ) : (
                        <span>{t("Confirm Free Ticket", "निःशुल्क पास बुक करें")}</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
