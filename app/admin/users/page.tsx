"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  MoreVertical,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UserItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  role: string;
  status: string;
  createdAt: string;
  _count: {
    donations: number;
    volunteerApplications: number;
    eventRegistrations: number;
  };
}

export default function AdminUsersPage() {
  const { user: currentAdmin } = useAuth();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (roleFilter !== "ALL") params.append("role", roleFilter);

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleUpdateRoleStatus = async (userId: string, newRole: string, newStatus: string) => {
    setActionLoading(userId);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role: newRole, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "User updated successfully" });
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole, status: newStatus } : u))
        );
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update user" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error occurred" });
    } finally {
      setActionLoading(null);
    }
  };

  const exportCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "City", "Role", "Status", "Donations", "Joined"];
    const rows = users.map((u) => [
      u.id,
      `"${u.name}"`,
      u.email,
      u.phone || "",
      u.city || "",
      u.role,
      u.status,
      u._count?.donations || 0,
      new Date(u.createdAt).toISOString().split("T")[0],
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Arogya_Bandhan_Users_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0B2F2A]">User & Access Directory</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-[#087F5B]">
              {users.length} Users
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage authenticated members, role-based authorization, and account states.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={fetchUsers}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
            title="Refresh Directory"
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
          {message.type === "success" ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#087F5B]"
          />
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#087F5B]"
          >
            <option value="ALL">All Roles</option>
            <option value="USER">Standard User</option>
            <option value="VOLUNTEER">Volunteer</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-[#087F5B] mb-2" />
            <p className="text-sm">Loading users from database...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700">No users found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">User / Member</th>
                  <th className="py-3.5 px-6">Contact & Location</th>
                  <th className="py-3.5 px-6">Role</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-center">Activity</th>
                  <th className="py-3.5 px-6">Joined Date</th>
                  <th className="py-3.5 px-6 text-right">Role Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((item) => {
                  const isCurrent = currentAdmin?.id === item.id;
                  const isSuperAdmin = currentAdmin?.role === "SUPER_ADMIN";

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-800 flex items-center gap-2">
                          <span>{item.name}</span>
                          {isCurrent && (
                            <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">{item.email}</div>
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        <div>{item.phone || "—"}</div>
                        <div className="text-xs text-slate-400">{item.city || "Not specified"}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            item.role === "SUPER_ADMIN"
                              ? "bg-purple-100 text-purple-700 border border-purple-200"
                              : item.role === "ADMIN"
                              ? "bg-blue-100 text-blue-700 border border-blue-200"
                              : item.role === "VOLUNTEER"
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            item.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.status === "ACTIVE" ? "bg-emerald-500" : "bg-rose-500"
                            }`}
                          />
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="inline-flex items-center gap-3 text-xs text-slate-600 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
                          <span title="Total Donations">
                            💰 <strong className="font-bold">{item._count?.donations || 0}</strong>
                          </span>
                          <span className="text-slate-300">|</span>
                          <span title="Volunteer Applications">
                            🤝 <strong className="font-bold">{item._count?.volunteerApplications || 0}</strong>
                          </span>
                          <span className="text-slate-300">|</span>
                          <span title="Events Registered">
                            📅 <strong className="font-bold">{item._count?.eventRegistrations || 0}</strong>
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-500 text-xs">
                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {actionLoading === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-[#087F5B] inline-block" />
                        ) : isSuperAdmin && !isCurrent ? (
                          <div className="inline-flex items-center gap-2">
                            <select
                              value={item.role}
                              onChange={(e) => handleUpdateRoleStatus(item.id, e.target.value, item.status)}
                              className="text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:outline-none"
                            >
                              <option value="USER">USER</option>
                              <option value="VOLUNTEER">VOLUNTEER</option>
                              <option value="ADMIN">ADMIN</option>
                              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                            </select>
                            <button
                              onClick={() =>
                                handleUpdateRoleStatus(
                                  item.id,
                                  item.role,
                                  item.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"
                                )
                              }
                              className={`text-xs px-2 py-1 rounded-lg font-semibold transition-colors ${
                                item.status === "ACTIVE"
                                  ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                              }`}
                            >
                              {item.status === "ACTIVE" ? "Suspend" : "Activate"}
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Protected</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
