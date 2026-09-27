"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If in admin dashboard or user dashboard, render custom dashboard chrome
  const isDashboard = pathname.startsWith("/admin/dashboard") ||
                      pathname.startsWith("/admin/users") ||
                      pathname.startsWith("/admin/donations") ||
                      pathname.startsWith("/admin/campaigns") ||
                      pathname.startsWith("/admin/programs") ||
                      pathname.startsWith("/admin/events") ||
                      pathname.startsWith("/admin/volunteers") ||
                      pathname.startsWith("/admin/gallery") ||
                      pathname.startsWith("/admin/blog") ||
                      pathname.startsWith("/admin/transparency") ||
                      pathname.startsWith("/admin/contact") ||
                      pathname.startsWith("/admin/analytics") ||
                      pathname.startsWith("/admin/audit-logs") ||
                      pathname.startsWith("/admin/settings") ||
                      pathname.startsWith("/user/dashboard") ||
                      pathname.startsWith("/user/profile") ||
                      pathname.startsWith("/user/donations") ||
                      pathname.startsWith("/user/receipts") ||
                      pathname.startsWith("/user/campaigns") ||
                      pathname.startsWith("/user/volunteer") ||
                      pathname.startsWith("/user/events") ||
                      pathname.startsWith("/user/notifications") ||
                      pathname.startsWith("/user/security");

  if (isDashboard) {
    return <main className="min-h-screen bg-slate-50">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
