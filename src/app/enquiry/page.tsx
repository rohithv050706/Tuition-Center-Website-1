"use client";
import { useState } from "react";

export default function EnquiryPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", classOrGrade: "", courseInterested: "", preferredTiming: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, honeypot: "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setForm({ name: "", phone: "", email: "", classOrGrade: "", courseInterested: "", preferredTiming: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-teal-900 mb-2">Admission Enquiry</h1>
      <p className="text-stone-500 mb-6">Fill in your details and we will get back to you shortly.</p>
      {status === "success" ? (
        <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-100">
          <h3 className="font-bold text-lg">Thank you!</h3>
          <p>Your enquiry has been submitted. Our team will contact you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 space-y-4">
          <input type="text" name="honeypot" className="hidden" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Name *</label>
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
              <label className="block text-sm font-medium text-stone-700 mb-1">Class / Grade</label>
              <input value={form.classOrGrade} onChange={e => setForm({ ...form, classOrGrade: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Course Interested</label>
              <input value={form.courseInterested} onChange={e => setForm({ ...form, courseInterested: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Preferred Timing</label>
            <input value={form.preferredTiming} onChange={e => setForm({ ...form, preferredTiming: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
            <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" disabled={status === "loading"} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 rounded-lg transition disabled:opacity-50">
            {status === "loading" ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      )}
    </div>
  );
}
