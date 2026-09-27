"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  ExternalLink,
  Eye,
  EyeOff,
} from "lucide-react";

interface ProgramItem {
  id: string;
  title: string;
  hindiTitle: string | null;
  slug: string;
  description: string;
  detailedContent: string;
  icon: string;
  imageUrl: string;
  targetGroup: string;
  location: string;
  status: string;
  displayOrder: number;
}

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<ProgramItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states
  const [form, setForm] = useState({
    title: "",
    hindiTitle: "",
    slug: "",
    description: "",
    detailedContent: "",
    icon: "Stethoscope",
    imageUrl: "/images/program_medical.jpg",
    targetGroup: "Underprivileged rural and urban families",
    location: "Pan-India / Remote Centers",
    status: "ACTIVE",
    displayOrder: 1,
  });

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/programs");
      const data = await res.json();
      if (data.success) {
        setPrograms(data.programs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const openCreateModal = () => {
    setEditingProgram(null);
    setForm({
      title: "",
      hindiTitle: "",
      slug: "",
      description: "",
      detailedContent: "",
      icon: "Stethoscope",
      imageUrl: "/images/program_medical.jpg",
      targetGroup: "Underprivileged rural and urban families",
      location: "Pan-India / Remote Centers",
      status: "ACTIVE",
      displayOrder: programs.length + 1,
    });
    setShowModal(true);
  };

  const openEditModal = (p: ProgramItem) => {
    setEditingProgram(p);
    setForm({
      title: p.title,
      hindiTitle: p.hindiTitle || "",
      slug: p.slug,
      description: p.description,
      detailedContent: p.detailedContent,
      icon: p.icon,
      imageUrl: p.imageUrl,
      targetGroup: p.targetGroup,
      location: p.location,
      status: p.status,
      displayOrder: p.displayOrder,
    });
    setShowModal(true);
  };

  const handleTitleChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: editingProgram ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const url = editingProgram
        ? `/api/admin/programs/${editingProgram.id}`
        : "/api/admin/programs";
      const method = editingProgram ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({
          type: "success",
          text: `Program ${editingProgram ? "updated" : "created"} successfully!`,
        });
        setShowModal(false);
        fetchPrograms();
      } else {
        setMessage({ type: "error", text: data.error || "Operation failed" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error occurred" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (p: ProgramItem) => {
    const newStatus = p.status === "ACTIVE" ? "ARCHIVED" : "ACTIVE";
    try {
      const res = await fetch(`/api/admin/programs/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setPrograms((prev) =>
          prev.map((item) => (item.id === p.id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0B2F2A]">Programs & Initiatives CMS</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-[#087F5B]">
              {programs.length} Programs
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage official Foundation welfare programs, descriptions, images, and public display priority.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#087F5B] hover:bg-[#076b4d] text-white font-bold rounded-xl text-sm transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Program</span>
          </button>
          <button
            onClick={fetchPrograms}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Programs Grid */}
      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="w-8 h-8 animate-spin text-[#087F5B] mb-2" />
          <p className="text-sm">Loading programs...</p>
        </div>
      ) : programs.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700">No programs configured</h3>
          <p className="text-sm text-slate-400 mb-4">Click below to add your first foundation program.</p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-[#087F5B] text-white text-sm font-bold rounded-xl"
          >
            Add Program
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div
              key={p.id}
              className={`bg-white rounded-2xl border overflow-hidden shadow-sm flex flex-col justify-between transition-all ${
                p.status === "ACTIVE" ? "border-slate-200 hover:shadow-md" : "border-slate-200 opacity-60 bg-slate-50"
              }`}
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100">
                  <Image
                    src={p.imageUrl || "/images/program_medical.jpg"}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B2F2A]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                    Order #{p.displayOrder}
                  </div>
                  <div
                    className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      p.status === "ACTIVE"
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-700 text-slate-200"
                    }`}
                  >
                    {p.status}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0877C9] uppercase tracking-wider mb-1">
                    <span>Icon: {p.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{p.title}</h3>
                  {p.hindiTitle && (
                    <p className="text-xs text-slate-500 font-medium mb-2">{p.hindiTitle}</p>
                  )}
                  <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                    <div>
                      <span className="font-semibold text-slate-700">Target:</span> {p.targetGroup}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Scope:</span> {p.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-4">
                <a
                  href={`/programs/${p.slug}`}
                  target="_blank"
                  className="p-2 text-slate-400 hover:text-[#0877C9] hover:bg-slate-100 rounded-lg text-xs flex items-center gap-1"
                  title="View Public Page"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Preview</span>
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleStatus(p)}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                    title={p.status === "ACTIVE" ? "Archive Program" : "Activate Program"}
                  >
                    {p.status === "ACTIVE" ? (
                      <EyeOff className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-2 text-slate-500 hover:text-[#087F5B] hover:bg-emerald-50 rounded-lg"
                    title="Edit Program"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 my-8">
            <h2 className="text-xl font-bold text-slate-800 mb-1">
              {editingProgram ? "Edit Program Details" : "Create New Foundation Program"}
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Enter official details for public website showcase.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Program Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Healthcare & Medical Support"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Hindi Title (हिंदी)
                  </label>
                  <input
                    type="text"
                    value={form.hindiTitle}
                    onChange={(e) => setForm({ ...form, hindiTitle: e.target.value })}
                    placeholder="उदा. स्वास्थ्य एवं चिकित्सा सहायता"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="healthcare-medical-support"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Icon Identifier
                  </label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                  >
                    <option value="Stethoscope">Stethoscope (Medical)</option>
                    <option value="HeartHandshake">HeartHandshake (Care)</option>
                    <option value="BookOpen">BookOpen (Education)</option>
                    <option value="ShieldCheck">ShieldCheck (Welfare)</option>
                    <option value="Sparkles">Sparkles (Empowerment)</option>
                    <option value="Users">Users (Community)</option>
                    <option value="HandHeart">HandHeart (Relief)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={form.displayOrder}
                    onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="/images/program_medical.jpg or https://..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Short Summary / Card Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Summary for program card showcase..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Detailed Page Content (Comprehensive Details)
                </label>
                <textarea
                  rows={4}
                  value={form.detailedContent}
                  onChange={(e) => setForm({ ...form, detailedContent: e.target.value })}
                  placeholder="Detailed multi-paragraph background, key interventions, and long-term impact objectives..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Beneficiary Target Group
                  </label>
                  <input
                    type="text"
                    value={form.targetGroup}
                    onChange={(e) => setForm({ ...form, targetGroup: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Operational Scope / Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-2 bg-[#087F5B] hover:bg-[#076b4d] text-white rounded-xl text-sm font-bold shadow-md transition-all disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingProgram ? "Update Program" : "Save Program"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
