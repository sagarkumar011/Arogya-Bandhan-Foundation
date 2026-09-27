"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit3, Trash2, Target, CheckCircle2, Loader2, X } from "lucide-react";

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [hindiTitle, setHindiTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Healthcare");
  const [description, setDescription] = useState("");
  const [story, setStory] = useState("");
  const [imageUrl, setImageUrl] = useState("/images/program_medical.jpg");
  const [goalAmount, setGoalAmount] = useState(500000);
  const [beneficiariesCount, setBeneficiariesCount] = useState(1000);
  const [status, setStatus] = useState("ACTIVE");
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = () => {
    setLoading(true);
    fetch("/api/admin/campaigns")
      .then((r) => r.json())
      .then((data) => {
        if (data.campaigns) setCampaigns(data.campaigns);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const openCreateModal = () => {
    setEditId(null);
    setTitle("");
    setHindiTitle("");
    setSlug("");
    setCategory("Healthcare");
    setDescription("");
    setStory("");
    setImageUrl("/images/program_medical.jpg");
    setGoalAmount(500000);
    setBeneficiariesCount(1000);
    setStatus("ACTIVE");
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (c: any) => {
    setEditId(c.id);
    setTitle(c.title);
    setHindiTitle(c.hindiTitle || "");
    setSlug(c.slug);
    setCategory(c.category);
    setDescription(c.description);
    setStory(c.story);
    setImageUrl(c.imageUrl);
    setGoalAmount(c.goalAmount);
    setBeneficiariesCount(c.beneficiariesCount);
    setStatus(c.status);
    setError(null);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);

    const payload = {
      title,
      hindiTitle,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category,
      description,
      story,
      imageUrl,
      goalAmount: Number(goalAmount),
      beneficiariesCount: Number(beneficiariesCount),
      status,
    };

    try {
      const url = editId ? `/api/admin/campaigns/${editId}` : "/api/admin/campaigns";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save campaign");

      setModalOpen(false);
      fetchCampaigns();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to archive or delete this campaign?")) return;
    try {
      const res = await fetch(`/api/admin/campaigns/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchCampaigns();
    } catch {
      alert("Failed to delete campaign");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#17324D]">
            Campaign Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, publish, monitor, and update public donation campaigns.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Launch Campaign</span>
        </button>
      </div>

      {/* Grid of Campaigns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c) => {
          const pct = Math.min(100, Math.round((c.raisedAmount / (c.goalAmount || 1)) * 100));
          return (
            <div
              key={c.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100">
                  <Image
                    src={c.imageUrl || "/images/program_medical.jpg"}
                    alt={c.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 rounded-full text-[10px] font-bold text-[#087F5B]">
                    {c.category}
                  </span>
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      c.status === "ACTIVE"
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-700 text-white"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-heading font-bold text-base text-[#17324D] line-clamp-1">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#087F5B]">
                        ₹{c.raisedAmount.toLocaleString("en-IN")}
                      </span>
                      <span className="text-slate-400">
                        {pct}% of ₹{c.goalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#087F5B] to-[#0877C9] h-2 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">{c.donorsCount} Donors</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(c)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-[#087F5B] hover:bg-white"
                    title="Edit Campaign"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-1.5 rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50"
                    title="Archive / Delete Campaign"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
            <div className="bg-[#0B2F2A] px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg">
                {editId ? "Edit Campaign" : "Create New Campaign"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleSave} className="space-y-4">
                {error && (
                  <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-xl">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Campaign Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Mobile Health Clinics"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Hindi Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={hindiTitle}
                      onChange={(e) => setHindiTitle(e.target.value)}
                      placeholder="e.g. सचल स्वास्थ्य क्लीनिक"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="mobile-health-clinics"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B] bg-white"
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Child Health">Child Health</option>
                      <option value="Women's Welfare">Women's Welfare</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Community">Community</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Fundraising Goal (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1000"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Beneficiaries Count
                    </label>
                    <input
                      type="number"
                      value={beneficiariesCount}
                      onChange={(e) => setBeneficiariesCount(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Image URL *
                    </label>
                    <input
                      type="text"
                      required
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="/images/hero_healthcare.jpg"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B] bg-white"
                    >
                      <option value="ACTIVE">ACTIVE (Publicly visible)</option>
                      <option value="DRAFT">DRAFT (Hidden)</option>
                      <option value="PAUSED">PAUSED</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Short Description *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief 1-2 sentence overview for cards..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Campaign Story & Challenge *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Detailed explanation of community challenges, methodology, and ground intervention..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="btn-primary px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    <span>{editId ? "Update Campaign" : "Publish Campaign"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
