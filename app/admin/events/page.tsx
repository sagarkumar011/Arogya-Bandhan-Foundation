"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Plus, Edit3, Trash2, Users, MapPin, Clock, X, Loader2 } from "lucide-react";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Health Camp");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("/images/program_medical.jpg");
  const [eventDate, setEventDate] = useState("2026-10-15");
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("04:30 PM");
  const [location, setLocation] = useState("Lucknow Community Center");
  const [venueAddress, setVenueAddress] = useState("Vikas Nagar, Lucknow, Uttar Pradesh");
  const [registrationLimit, setRegistrationLimit] = useState(200);
  const [status, setStatus] = useState("OPEN");
  const [saving, setSaving] = useState(false);

  const fetchEvents = () => {
    setLoading(true);
    fetch("/api/admin/events")
      .then((r) => r.json())
      .then((data) => {
        if (data.events) setEvents(data.events);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openCreateModal = () => {
    setEditId(null);
    setTitle("");
    setSlug("");
    setCategory("Health Camp");
    setDescription("");
    setImageUrl("/images/program_medical.jpg");
    setEventDate("2026-10-15");
    setStartTime("09:00 AM");
    setEndTime("04:30 PM");
    setLocation("Lucknow Community Center");
    setVenueAddress("Vikas Nagar, Lucknow, Uttar Pradesh");
    setRegistrationLimit(200);
    setStatus("OPEN");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category,
      description,
      imageUrl,
      eventDate,
      startTime,
      endTime,
      location,
      venueAddress,
      registrationLimit: Number(registrationLimit),
      status,
    };

    try {
      const url = editId ? `/api/admin/events/${editId}` : "/api/admin/events";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save event");

      setModalOpen(false);
      fetchEvents();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
      fetchEvents();
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#17324D]">
            Events & Free Health Camps
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Schedule medical checkup camps, eye screening drives, and manage community attendance quotas.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Event</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 w-full bg-slate-100">
                <Image
                  src={evt.imageUrl || "/images/program_medical.jpg"}
                  alt={evt.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 rounded-full text-[10px] font-bold text-[#0877C9]">
                  {evt.category}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#087F5B] text-white rounded-full text-[10px] font-bold">
                  {evt.status}
                </span>
              </div>

              <div className="p-5 space-y-2.5">
                <h3 className="font-heading font-bold text-base text-[#17324D] line-clamp-2">
                  {evt.title}
                </h3>
                <div className="text-xs text-slate-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#087F5B]" />
                    <span>{new Date(evt.eventDate).toLocaleDateString("en-IN")} ({evt.startTime})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#F58220]" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#0877C9]" />
                    <span>{evt.registrations?.length || 0} / {evt.registrationLimit} Registered</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">{evt.slug}</span>
              <button
                onClick={() => handleDelete(evt.id)}
                className="p-1.5 rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50"
                title="Delete Event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
            <div className="bg-[#0B2F2A] px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-base">Schedule New Community Event</h3>
              <button onClick={() => setModalOpen(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Free Diagnostic & Dental Camp"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B] bg-white"
                  >
                    <option value="Health Camp">Health Camp</option>
                    <option value="Awareness Drive">Awareness Drive</option>
                    <option value="Blood Donation">Blood Donation</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Start Time</label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="09:00 AM"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">End Time</label>
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="04:30 PM"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Center Name *</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Vikas Nagar Community Hall"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Venue Address *</label>
                <input
                  type="text"
                  required
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                  placeholder="Plot number, Sector, District, PIN"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Max Registration Quota</label>
                  <input
                    type="number"
                    value={registrationLimit}
                    onChange={(e) => setRegistrationLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B] bg-white"
                  >
                    <option value="OPEN">OPEN (Accepting Registrations)</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Overview of medical facilities and services offered..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary px-5 py-2 rounded-xl font-bold uppercase tracking-wider"
                >
                  {saving ? "Scheduling..." : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
