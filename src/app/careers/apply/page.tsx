"use client";
import { useState } from "react";

export default function CareersApplyPage() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", position: "", qualification: "",
    experienceYears: "", subjects: "", message: "", resumeUrl: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/job-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, honeypot: "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setForm({ name: "", phone: "", email: "", position: "", qualification: "", experienceYears: "", subjects: "", message: "", resumeUrl: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-teal-900 mb-2">Job Application</h1>
      <p className="text-stone-500 mb-6">Apply for a position at Sri Tuition Center.</p>
      {status === "success" ? (
        <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-100">
          <h3 className="font-bold text-lg">Application Submitted!</h3>
          <p>We will review your application and get back to you.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 space-y-4">
          <input type="text" name="honeypot" className="hidden" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Full Name *</label>
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Phone *</label>
              <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Position Applying For *</label>
              <input required value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Qualification *</label>
              <input required value={form.qualification} onChange={e => setForm({ ...form, qualification: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Years of Experience</label>
              <input value={form.experienceYears} onChange={e => setForm({ ...form, experienceYears: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Subjects You Can Teach</label>
              <input value={form.subjects} onChange={e => setForm({ ...form, subjects: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Resume URL</label>
            <input value={form.resumeUrl} onChange={e => setForm({ ...form, resumeUrl: e.target.value })} placeholder="Paste a link to your resume (Google Drive, etc.)" className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
            <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" disabled={status === "loading"} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 rounded-lg transition disabled:opacity-50">
            {status === "loading" ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      )}
    </div>
  );
}
