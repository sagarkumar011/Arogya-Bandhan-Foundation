"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  BarChart3,
  Heart,
  Target,
  Sparkles,
  Users,
  Calendar,
  UserCheck,
  Image as ImageIcon,
  BookOpen,
  FileCheck,
  Mail,
  History,
  Settings,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Loader2,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout, isAdmin } = useAuth();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !isLoginPage) {
      if (!user || (!isAdmin)) {
        router.push("/admin/login");
      }
    }
  }, [user, loading, isAdmin, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#087F5B] animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const adminNav = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/analytics", label: "Analytics & Trends", icon: BarChart3 },
    { href: "/admin/donations", label: "Donations & Ledger", icon: Heart },
    { href: "/admin/campaigns", label: "Campaigns CMS", icon: Target },
    { href: "/admin/programs", label: "Programs CMS", icon: Sparkles },
    { href: "/admin/volunteers", label: "Volunteer Registry", icon: Users },
    { href: "/admin/events", label: "Events & Camps", icon: Calendar },
    { href: "/admin/users", label: "User Directory", icon: UserCheck },
    { href: "/admin/gallery", label: "Media Gallery", icon: ImageIcon },
    { href: "/admin/blog", label: "Blog & Insights CMS", icon: BookOpen },
    { href: "/admin/transparency", label: "Transparency Docs", icon: FileCheck },
    { href: "/admin/contact", label: "Contact Enquiries", icon: Mail },
    { href: "/admin/audit-logs", label: "Security Audit Logs", icon: History },
    { href: "/admin/settings", label: "Foundation Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Executive Dark Sidebar */}
      <aside className="w-full md:w-64 bg-[#0B2F2A] text-white p-5 flex flex-col justify-between shrink-0 shadow-xl border-r border-emerald-950">
        <div className="space-y-6">
          {/* Logo & Admin Badge */}
          <div>
            <Link href="/" className="inline-block bg-white p-2 rounded-xl">
              <div className="relative h-9 w-40">
                <Image
                  src="/logo.png"
                  alt="Arogya Bandhan Foundation"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <div className="mt-3 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {user.role} COMMAND
              </span>
              <Link
                href="/"
                target="_blank"
                className="text-[11px] text-emerald-300/70 hover:text-white flex items-center gap-1"
                title="Open Live Public Site"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Admin user info */}
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0877C9] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-emerald-200/70 truncate">{user.email}</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="space-y-0.5 max-h-[58vh] overflow-y-auto pr-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#087F5B] text-white shadow-md font-bold"
                      : "text-emerald-100/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-emerald-300/70"}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Logout */}
        <div className="pt-4 border-t border-emerald-900/60">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-950/50 hover:text-rose-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
