"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  User,
  Heart,
  FileText,
  Users,
  Calendar,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Home,
  Loader2,
} from "lucide-react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  // If in login or register page, render without dashboard shell
  const isAuthPage = pathname === "/user/login" || pathname === "/user/register";

  useEffect(() => {
    if (!loading && !user && !isAuthPage) {
      router.push("/user/login");
    }
  }, [user, loading, isAuthPage, router]);

  if (isAuthPage) return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#087F5B] animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const navItems = [
    { href: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/user/profile", label: "My Profile", icon: User },
    { href: "/user/donations", label: "My Donations", icon: Heart },
    { href: "/user/receipts", label: "Receipts", icon: FileText },
    { href: "/user/volunteer", label: "Volunteer Status", icon: Users },
    { href: "/user/events", label: "My Events", icon: Calendar },
    { href: "/user/notifications", label: "Notifications", icon: Bell },
    { href: "/user/security", label: "Security", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 p-5 flex flex-col justify-between shrink-0 shadow-sm">
        <div className="space-y-6">
          {/* Logo & Portal Label */}
          <div>
            <Link href="/" className="inline-block">
              <div className="relative h-10 w-44">
                <Image
                  src="/logo.png"
                  alt="Arogya Bandhan Foundation"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <div className="mt-2 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EAF7F2] text-[#087F5B] text-[11px] font-bold uppercase tracking-wider w-fit">
              <span>Donor & Member Portal</span>
            </div>
          </div>

          {/* User mini badge */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#087F5B] text-white flex items-center justify-center font-bold text-sm shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#17324D] truncate">{user.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#EAF7F2] text-[#087F5B] shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#17324D]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#087F5B]" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-slate-100 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-[#087F5B] hover:bg-slate-50"
          >
            <Home className="w-4 h-4" />
            <span>Return to Website</span>
          </Link>

          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
