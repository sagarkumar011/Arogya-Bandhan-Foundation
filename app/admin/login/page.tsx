"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Lock, Mail, Loader2, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      if (data.user.role !== "ADMIN" && data.user.role !== "SUPER_ADMIN") {
        throw new Error("Access denied: You do not have administrative credentials.");
      }

      login(data.user);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071E1B] flex items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#087F5B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#0877C9]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <div className="relative h-12 w-48 mx-auto">
              <Image
                src="/logo.png"
                alt="Arogya Bandhan Foundation"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[#0B2F2A] text-xs font-bold uppercase tracking-wider mt-2">
            <Shield className="w-3.5 h-3.5 text-[#087F5B]" />
            <span>Secure Admin Command Portal</span>
          </div>
          <p className="text-xs text-slate-500">
            Authorized administrative personnel and trustees only.
          </p>
        </div>

        {error && (
          <div className="p-3.5 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@arogyabandhan.org"
                className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Master Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#0B2F2A] hover:bg-[#087F5B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-[#F58220]" />
                  <span>Authenticate to Admin Portal</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo Credentials Helper */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
          <p className="font-bold text-[#087F5B]">Authorized Demo Admin Account:</p>
          <p>
            <span className="text-slate-500">Email:</span>{" "}
            <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px]">admin@arogyabandhan.org</code>
          </p>
          <p>
            <span className="text-slate-500">Password:</span>{" "}
            <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px]">Admin@12345</code>
          </p>
        </div>

        <div className="text-center pt-1 text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-600 transition-colors">
            Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
