"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Settings,
  Save,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Building,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminSettingsPage() {
  const { user: currentAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [settings, setSettings] = useState({
    foundationName: "Arogya Bandhan Foundation",
    tagline: "Healthy People | Stronger Communities",
    email: "info@arogyabandhan.org",
    phone: "+91 98765 43210",
    address: "Registered Office, New Delhi - 110001, India",
    facebookUrl: "https://facebook.com/arogyabandhan",
    instagramUrl: "https://instagram.com/arogyabandhan",
    youtubeUrl: "https://youtube.com/@arogyabandhan",
    linkedinUrl: "https://linkedin.com/company/arogyabandhan",
    twitterUrl: "https://x.com/arogyabandhan",
    stat_people_reached: "10,000+",
    stat_volunteers: "500+",
    stat_health_camps: "100+",
    stat_communities_reached: "50+",
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings((prev) => ({
          ...prev,
          ...data.settings,
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Foundation settings saved and synchronized live!" });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save settings" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error occurred" });
    } finally {
      setSaving(false);
    }
  };

  const isSuperAdmin = currentAdmin?.role === "SUPER_ADMIN";

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0B2F2A]">Foundation Profile & System Settings</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-[#087F5B]">
              Master Config
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Centrally control identity, branding, contact details, social links, and public impact metrics.
          </p>
        </div>
        <button
          onClick={fetchSettings}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all self-start md:self-auto"
          title="Reload Settings"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
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

      {!isSuperAdmin && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-amber-800 text-xs font-medium">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            You are logged in as <strong>{currentAdmin?.role}</strong>. Only <strong>SUPER_ADMIN</strong> has write authorization to commit modifications to global settings.
          </span>
        </div>
      )}

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="w-8 h-8 animate-spin text-[#087F5B] mb-2" />
          <p className="text-sm">Loading system settings...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Official Brand Identity */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building className="w-5 h-5 text-[#087F5B]" />
              <h2 className="text-base font-bold text-slate-800">Official Brand Identity</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Official Foundation Name *
                </label>
                <input
                  type="text"
                  required
                  disabled={!isSuperAdmin}
                  value={settings.foundationName}
                  onChange={(e) => handleChange("foundationName", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B] disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Official Brand Tagline *
                </label>
                <input
                  type="text"
                  required
                  disabled={!isSuperAdmin}
                  value={settings.tagline}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B] disabled:opacity-60"
                />
              </div>
            </div>

            {/* Official Logo Display */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Official Brand Logo (Uploaded Asset)
              </label>
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="relative h-14 w-48 bg-white p-2 rounded-lg border border-slate-200">
                  <Image
                    src="/logo.png"
                    alt="Arogya Bandhan Foundation Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-xs text-slate-500">
                  <p className="font-semibold text-slate-700">Official Brand Logo in use</p>
                  <p>Preserved with original colors, aspect ratio, and healthcare iconography.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Secretariat */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Phone className="w-5 h-5 text-[#0877C9]" />
              <h2 className="text-base font-bold text-slate-800">Official Contact & Address</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  disabled={!isSuperAdmin}
                  value={settings.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B] disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Helpline / Phone *
                </label>
                <input
                  type="text"
                  required
                  disabled={!isSuperAdmin}
                  value={settings.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B] disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Registered Secretariat / Office Address *
              </label>
              <textarea
                rows={2}
                required
                disabled={!isSuperAdmin}
                value={settings.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B] disabled:opacity-60"
              />
            </div>
          </div>

          {/* Section 3: Verified Impact Numbers */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Activity className="w-5 h-5 text-emerald-600" />
              <div>
                <h2 className="text-base font-bold text-slate-800">Public Impact Statistics</h2>
                <p className="text-xs text-slate-400">
                  Update database numbers shown in the homepage Impact counter. Never hardcoded.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  People Reached
                </label>
                <input
                  type="text"
                  disabled={!isSuperAdmin}
                  value={settings.stat_people_reached}
                  onChange={(e) => handleChange("stat_people_reached", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B] disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Active Volunteers
                </label>
                <input
                  type="text"
                  disabled={!isSuperAdmin}
                  value={settings.stat_volunteers}
                  onChange={(e) => handleChange("stat_volunteers", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B] disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Health Camps Conducted
                </label>
                <input
                  type="text"
                  disabled={!isSuperAdmin}
                  value={settings.stat_health_camps}
                  onChange={(e) => handleChange("stat_health_camps", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B] disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Communities Reached
                </label>
                <input
                  type="text"
                  disabled={!isSuperAdmin}
                  value={settings.stat_communities_reached}
                  onChange={(e) => handleChange("stat_communities_reached", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B] disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Social Channels */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Share2 className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-slate-800">Official Social Media Profiles</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Facebook URL
                </label>
                <input
                  type="url"
                  disabled={!isSuperAdmin}
                  value={settings.facebookUrl}
                  onChange={(e) => handleChange("facebookUrl", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B] disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Instagram URL
                </label>
                <input
                  type="url"
                  disabled={!isSuperAdmin}
                  value={settings.instagramUrl}
                  onChange={(e) => handleChange("instagramUrl", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B] disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  disabled={!isSuperAdmin}
                  value={settings.youtubeUrl}
                  onChange={(e) => handleChange("youtubeUrl", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B] disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  LinkedIn Organization URL
                </label>
                <input
                  type="url"
                  disabled={!isSuperAdmin}
                  value={settings.linkedinUrl}
                  onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B] disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  X (formerly Twitter) URL
                </label>
                <input
                  type="url"
                  disabled={!isSuperAdmin}
                  value={settings.twitterUrl}
                  onChange={(e) => handleChange("twitterUrl", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B] disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          {isSuperAdmin && (
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 bg-[#087F5B] hover:bg-[#076b4d] text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50"
              >
                {saving && <Loader2 className="w-5 h-5 animate-spin" />}
                <Save className="w-5 h-5" />
                <span>Save Foundation Settings</span>
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
