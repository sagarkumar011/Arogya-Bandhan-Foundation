"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

export default function UserLoginPage() {
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

      login(data.user);

      if (data.user.role === "ADMIN" || data.user.role === "SUPER_ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-slate-100 space-y-6">
        {/* Logo Header */}
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
          <h2 className="font-heading font-bold text-2xl text-[#17324D] pt-2">
            Sign In to Your Account
          </h2>
          <p className="text-xs text-slate-500">
            Access your donation history, official receipts, and volunteer portal.
          </p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@arogyabandhan.org"
                className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#087F5B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
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
              className="btn-primary w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </div>
        </form>

        {/* Demo Credentials Helper Box */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-950 space-y-1">
          <p className="font-bold text-[#087F5B]">Demo Credentials:</p>
          <p>
            <span className="text-slate-500">Demo User:</span>{" "}
            <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px]">user@arogyabandhan.org</code> /{" "}
            <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px]">User@12345</code>
          </p>
          <p>
            <span className="text-slate-500">Admin Account:</span>{" "}
            <Link href="/admin/login" className="text-[#0877C9] underline font-medium">
              Go to Admin Login
            </Link>
          </p>
        </div>

        <div className="text-center pt-2 text-xs text-slate-500">
          Don't have an account yet?{" "}
          <Link href="/user/register" className="text-[#087F5B] font-bold hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
