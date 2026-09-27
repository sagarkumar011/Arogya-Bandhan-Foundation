"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileCheck,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Eye,
  EyeOff,
  ShieldCheck,
  FileText,
} from "lucide-react";

interface TransparencyDoc {
  id: string;
  title: string;
  category: string;
  year: string;
  documentUrl: string;
  fileSize: string | null;
  isPublic: boolean;
  statusNote: string | null;
  createdAt: string;
}

const CATEGORIES = [
  "Legal Registration",
  "Statutory Compliances",
  "Annual Impact Reports",
  "Financial Audits",
  "CSR & Government Accreditations",
];

export default function AdminTransparencyPage() {
  const [documents, setDocuments] = useState<TransparencyDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [form, setForm] = useState({
    title: "",
    category: "Legal Registration",
    year: "2025-26",
    documentUrl: "#",
    fileSize: "1.2 MB",
    isPublic: true,
    statusNote: "Application Filed & Under Statutory Verification",
  });

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/transparency");
      const data = await res.json();
      if (data.success) {
        setDocuments(data.documents);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/transparency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Transparency document saved successfully!" });
        setShowAddModal(false);
        setForm({
          title: "",
          category: "Legal Registration",
          year: "2025-26",
          documentUrl: "#",
          fileSize: "1.2 MB",
          isPublic: true,
          statusNote: "Application Filed & Under Statutory Verification",
        });
        fetchDocs();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to add document" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error occurred" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublic = async (doc: TransparencyDoc) => {
    try {
      const res = await fetch("/api/admin/transparency", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: doc.id, isPublic: !doc.isPublic }),
      });
      if (res.ok) {
        setDocuments((prev) =>
          prev.map((d) => (d.id === doc.id ? { ...d, isPublic: !doc.isPublic } : d))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this governance document record?")) return;
    try {
      const res = await fetch(`/api/admin/transparency?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setDocuments((prev) => prev.filter((d) => d.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0B2F2A]">Transparency & Governance Docs</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-[#087F5B]">
              {documents.length} Records
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Maintain statutory records, tax exemptions, registration filings, and audited statements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/transparency"
            target="_blank"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Public Transparency Page</span>
          </Link>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#087F5B] hover:bg-[#076b4d] text-white font-bold rounded-xl text-sm shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Governance Doc</span>
          </button>
          <button
            onClick={fetchDocs}
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

      {/* Docs Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-[#087F5B] mb-2" />
            <p className="text-sm">Loading governance records...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <FileCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700">No transparency documents recorded</h3>
            <p className="text-sm text-slate-400 mb-4">Add your foundation's official registration filings.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-[#087F5B] text-white text-sm font-bold rounded-xl"
            >
              Add Document
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Document Title & Status</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Fiscal Year</th>
                  <th className="py-3.5 px-6">Visibility</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-50 text-[#087F5B]">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{doc.title}</div>
                          <div className="text-xs text-slate-500 font-medium">
                            {doc.statusNote || "Institutional Record"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-700 text-xs">{doc.year}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleTogglePublic(doc)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
                          doc.isPublic
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                        title="Click to toggle Public / Confidential visibility"
                      >
                        {doc.isPublic ? (
                          <>
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Publicly Visible</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                            <span>Internal Confidential</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      {doc.documentUrl && doc.documentUrl !== "#" ? (
                        <a
                          href={doc.documentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block p-1.5 text-slate-400 hover:text-[#0877C9] hover:bg-slate-100 rounded-lg transition-colors"
                          title="Open Document File"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400 italic">No File</span>
                      )}
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Document Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-1">Add Governance / Compliance Record</h2>
            <p className="text-xs text-slate-500 mb-6">
              Official document details strictly adhering to compliance standards (no fabricated numbers).
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Document / Certificate Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Trust Registration Deed or PAN Acknowledgement"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Fiscal / Filing Year *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    placeholder="2025-26"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Document URL / Cloud PDF Link
                </label>
                <input
                  type="text"
                  value={form.documentUrl}
                  onChange={(e) => setForm({ ...form, documentUrl: e.target.value })}
                  placeholder="/documents/reg.pdf or https://..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Status / Statutory Note
                </label>
                <input
                  type="text"
                  value={form.statusNote}
                  onChange={(e) => setForm({ ...form, statusNote: e.target.value })}
                  placeholder="e.g. Application Filed & Under Verification"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="docPublicCheck"
                  checked={form.isPublic}
                  onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
                  className="w-4 h-4 text-[#087F5B] rounded border-slate-300 focus:ring-[#087F5B]"
                />
                <label htmlFor="docPublicCheck" className="text-xs font-bold text-slate-700">
                  Visible to Public Donors on Website
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
