"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Trash2, Search, Download, Plus, X, Key } from "lucide-react";

type Tab = "enquiries" | "enrollments" | "jobApplications" | "courses" | "faculty" | "results" | "gallery" | "jobOpenings";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("enquiries");
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ type: string; item?: any } | null>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [cpForm, setCpForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [cpError, setCpError] = useState("");
  const [cpSuccess, setCpSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then(r => {
      if (r.ok) setAuthenticated(true);
      else router.push("/admin/login");
    });
  }, [router]);

  useEffect(() => {
    if (!authenticated) return;
    loadData();
  }, [authenticated, tab, statusFilter]);

  async function loadData() {
    setLoading(true);
    const url = `/api/${tab}?${statusFilter ? `status=${statusFilter}&` : ""}${search ? `search=${encodeURIComponent(search)}&` : ""}`;
    const res = await fetch(url);
    const json = await res.json();
    setData(Array.isArray(json) ? json : []);
    setLoading(false);
  }

  function handleSearch() { loadData(); }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/${tab}/${id}`, { method: "DELETE" });
    loadData();
  }

  async function handleUpdateStatus(id: number, status: string) {
    await fetch(`/api/${tab}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    loadData();
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setCpError("");
    if (cpForm.newPassword !== cpForm.confirmPassword) {
      setCpError("New passwords do not match");
      return;
    }
    if (cpForm.newPassword.length < 6) {
      setCpError("New password must be at least 6 characters");
      return;
    }
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword: cpForm.oldPassword, newPassword: cpForm.newPassword }),
    });
    const json = await res.json();
    if (!res.ok) {
      setCpError(json.error || "Failed to change password");
      return;
    }
    setCpSuccess(true);
    setCpForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => {
      setShowChangePassword(false);
      setCpSuccess(false);
    }, 1600);
  }

  function exportCSV(rows: any[], filename: string) {
    if (rows.length === 0) return;
    const headers = Object.keys(rows[0]).join(",");
    const csv = [headers, ...rows.map(r => Object.values(r).map(v => {
      const s = String(v).replace(/"/g, '""');
      return '"' + s + '"';
    }).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (authenticated === null) return <div className="p-10 text-center">Loading...</div>;

  const tabs: { key: Tab; label: string }[] = [
    { key: "enquiries", label: "Enquiries" },
    { key: "enrollments", label: "Enrollments" },
    { key: "jobApplications", label: "Job Applications" },
    { key: "courses", label: "Courses" },
    { key: "faculty", label: "Faculty" },
    { key: "results", label: "Results" },
    { key: "gallery", label: "Gallery" },
    { key: "jobOpenings", label: "Job Openings" },
  ];

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-teal-900 text-white px-4 py-3 flex items-center justify-between">
        <h1 className="font-bold text-lg">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowChangePassword(true)} className="flex items-center gap-1 text-sm hover:text-amber-300 transition">
            <Key size={16} /> Change Password
          </button>
          <button onClick={handleLogout} className="flex items-center gap-1 text-sm hover:text-amber-300 transition">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === t.key ? "bg-teal-700 text-white" : "bg-white text-teal-900 hover:bg-teal-50"}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex gap-2">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <button onClick={handleSearch} className="bg-teal-700 text-white px-3 py-2 rounded-lg text-sm hover:bg-teal-800 transition"><Search size={16} /></button>
          </div>
          {["enquiries", "enrollments", "jobApplications"].includes(tab) && (
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="confirmed">Confirmed</option>
              <option value="closed">Closed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          )}
          <button onClick={() => exportCSV(data, `${tab}.csv`)} className="flex items-center gap-1 bg-white border border-stone-200 text-stone-700 px-3 py-2 rounded-lg text-sm hover:bg-stone-50 transition">
            <Download size={16} /> Export CSV
          </button>
          {tab !== "enquiries" && tab !== "enrollments" && tab !== "jobApplications" && (
            <button onClick={() => setModal({ type: tab })} className="flex items-center gap-1 bg-amber-500 text-teal-950 px-3 py-2 rounded-lg text-sm font-bold hover:bg-amber-600 transition">
              <Plus size={16} /> Add
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-stone-500">Loading...</p>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-stone-600">
                <tr>
                  {data.length > 0 && Object.keys(data[0]).map(k => (
                    <th key={k} className="text-left px-4 py-3 font-semibold capitalize whitespace-nowrap">{k.replace(/_/g, " ")}</th>
                  ))}
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((row: any) => (
                  <tr key={row.id} className="border-t border-stone-100 hover:bg-stone-50">
                    {Object.keys(data[0]).map(k => (
                      <td key={k} className="px-4 py-3 text-stone-700 whitespace-nowrap max-w-xs truncate">
                        {k === "status" ? (
                          <select value={row[k]} onChange={e => handleUpdateStatus(row.id, e.target.value)} className="border border-stone-200 rounded px-2 py-1 text-xs">
                            <option value="new">New</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="closed">Closed</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        ) : k === "resumeUrl" && row[k] ? (
                          <a href={row[k]} target="_blank" rel="noreferrer" className="text-teal-700 underline">View</a>
                        ) : (
                          String(row[k] ?? "")
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {tab !== "enquiries" && tab !== "enrollments" && tab !== "jobApplications" && (
                          <button onClick={() => setModal({ type: tab, item: row })} className="text-teal-700 hover:text-teal-900 text-xs font-semibold">Edit</button>
                        )}
                        <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length === 0 && <p className="p-6 text-stone-500 text-center">No records found.</p>}
          </div>
        )}
      </div>

      {modal && (
        <CrudModal type={modal.type} item={modal.item} onClose={() => { setModal(null); loadData(); }} />
      )}

      {showChangePassword && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-teal-900 flex items-center gap-2"><Key size={18} /> Change Password</h2>
              <button onClick={() => { setShowChangePassword(false); setCpError(""); setCpSuccess(false); }}><X size={20} /></button>
            </div>
            {cpSuccess ? (
              <div className="text-emerald-700 font-semibold py-6 text-center">Password changed successfully!</div>
            ) : (
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Old Password</label>
                  <input type="password" required value={cpForm.oldPassword} onChange={e => setCpForm({ ...cpForm, oldPassword: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">New Password</label>
                  <input type="password" required value={cpForm.newPassword} onChange={e => setCpForm({ ...cpForm, newPassword: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Confirm New Password</label>
                  <input type="password" required value={cpForm.confirmPassword} onChange={e => setCpForm({ ...cpForm, confirmPassword: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                {cpError && <p className="text-red-600 text-sm">{cpError}</p>}
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded-lg transition">Change Password</button>
                  <button type="button" onClick={() => { setShowChangePassword(false); setCpError(""); }} className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2 px-4 rounded-lg transition">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CrudModal({ type, item, onClose }: { type: string; item?: any; onClose: () => void }) {
  const [form, setForm] = useState<any>(item || {});
  const [saving, setSaving] = useState(false);

  const fields: Record<string, { key: string; label: string; type?: string }[]> = {
    courses: [
      { key: "slug", label: "Slug" },
      { key: "title", label: "Title" },
      { key: "titleTamil", label: "Title (Tamil)" },
      { key: "shortDescription", label: "Short Description" },
      { key: "fullDescription", label: "Full Description" },
      { key: "syllabus", label: "Syllabus" },
      { key: "subjects", label: "Subjects" },
      { key: "duration", label: "Duration" },
      { key: "fees", label: "Fees" },
      { key: "batchTiming", label: "Batch Timing" },
      { key: "imageUrl", label: "Image URL" },
    ],
    faculty: [
      { key: "name", label: "Name" },
      { key: "subject", label: "Subject" },
      { key: "qualification", label: "Qualification" },
      { key: "photoUrl", label: "Photo URL" },
      { key: "bio", label: "Bio" },
    ],
    results: [
      { key: "studentName", label: "Student Name" },
      { key: "achievement", label: "Achievement" },
      { key: "year", label: "Year" },
      { key: "photoUrl", label: "Photo URL" },
    ],
    gallery: [
      { key: "title", label: "Title" },
      { key: "imageUrl", label: "Image URL" },
    ],
    jobOpenings: [
      { key: "title", label: "Title" },
      { key: "description", label: "Description" },
      { key: "isActive", label: "Is Active", type: "checkbox" },
    ],
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const url = item ? `/api/${type}/${item.id}` : `/api/${type}`;
    const method = item ? "PUT" : "POST";
    const body = { ...form };
    if (type === "jobOpenings") body.isActive = !!body.isActive;
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-teal-900">{item ? "Edit" : "Add"} {type}</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {(fields[type] || []).map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-stone-700 mb-1">{f.label}</label>
              {f.type === "checkbox" ? (
                <input type="checkbox" checked={!!form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.checked })} className="w-5 h-5" />
              ) : (
                <input value={form[f.key] || ""} onChange={e => setForm({ ...form, [f.key]: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50">
              {saving ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={onClose} className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2 px-4 rounded-lg transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
