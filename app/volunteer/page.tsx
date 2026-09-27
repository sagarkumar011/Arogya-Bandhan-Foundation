"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Users, CheckCircle2, Loader2, Sparkles, HeartHandshake } from "lucide-react";

export default function VolunteerPage() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [city, setCity] = useState(user?.city || "");
  const [occupation, setOccupation] = useState("");
  const [skills, setSkills] = useState("");
  const [areasOfInterest, setAreasOfInterest] = useState<string[]>([]);
  const [availability, setAvailability] = useState("Weekends");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const interestOptions = [
    "Health Camps",
    "Food Distribution",
    "Education",
    "Events & Mass Marriage",
    "Women Empowerment",
    "Child Welfare",
    "Fundraising",
    "Digital / Social Media",
    "Community Outreach",
  ];

  const handleInterestToggle = (opt: string) => {
    if (areasOfInterest.includes(opt)) {
      setAreasOfInterest(areasOfInterest.filter((i) => i !== opt));
    } else {
      setAreasOfInterest([...areasOfInterest, opt]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (areasOfInterest.length === 0) {
      setError("Please select at least one area of interest");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/volunteers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          city,
          occupation,
          skills,
          areasOfInterest: areasOfInterest.join(", "),
          availability,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit application");

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-0 bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAF7F2] text-[#087F5B] border border-emerald-200">
            Join Our Volunteer Movement
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#17324D] tracking-tight">
            Be a Part of the Change
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Students, working professionals, homemakers, and citizens: your skills and heart can bring dignity, food, education, and health to vulnerable communities across India.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-slate-100 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 bg-[#EAF7F2] text-[#087F5B] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-[#17324D]">
              Application Submitted Successfully!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <strong>{fullName}</strong>. Our volunteer coordinator team will review your application and contact you at <strong>{email}</strong> within 3-5 business days.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setSubmitted(false)}
                className="btn-primary px-6 py-2.5 rounded-full text-xs font-bold uppercase"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-xl">
                  {error}
                </div>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-400">
                  1. Personal Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ananya Roy"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ananya@example.com"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Lucknow / Delhi / Patna"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>
                </div>
              </div>

              {/* Skills & Background */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-400">
                  2. Skills & Background
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Occupation *
                    </label>
                    <input
                      type="text"
                      required
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      placeholder="e.g. Doctor, Nursing Student, Teacher"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Availability *
                    </label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B] bg-white text-slate-700"
                    >
                      <option value="Weekends">Weekends Only</option>
                      <option value="Weekdays">Weekdays</option>
                      <option value="Full-time">Full-Time Commitment</option>
                      <option value="Flexible">Flexible / On-Call for Camps</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Relevant Skills & Experience *
                    </label>
                    <input
                      type="text"
                      required
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="e.g. Medical diagnosis, First Aid, Translation, Photography, Logistics"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                    />
                  </div>
                </div>
              </div>

              {/* Areas of Interest */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-400">
                  3. Areas of Interest (Select All That Apply)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {interestOptions.map((opt) => {
                    const isSelected = areasOfInterest.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleInterestToggle(opt)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-[#087F5B] bg-[#EAF7F2] text-[#087F5B] font-bold"
                            : "border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 text-[#087F5B]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700">
                  Why do you wish to volunteer with Arogya Bandhan Foundation? (Optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a short note on your motivation..."
                  className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <span>Submit Volunteer Application</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
