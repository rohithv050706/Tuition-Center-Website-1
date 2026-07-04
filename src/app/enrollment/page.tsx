"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function EnrollmentForm() {
  const searchParams = useSearchParams();
  const prefillCourse = searchParams.get("course") || "";

  const [form, setForm] = useState({
    studentName: "", phone: "", email: "", classOrGrade: "",
    course: prefillCourse, preferredTiming: "", parentName: "", parentPhone: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(prev => ({ ...prev, course: prefillCourse }));
  }, [prefillCourse]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, honeypot: "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setForm({ studentName: "", phone: "", email: "", classOrGrade: "", course: "", preferredTiming: "", parentName: "", parentPhone: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-teal-900 mb-2">Enrollment</h1>
      <p className="text-stone-500 mb-6">Ready to join? Fill in your details to enroll.</p>
      {status === "success" ? (
        <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-100">
          <h3 className="font-bold text-lg">Enrollment Submitted!</h3>
          <p>We have received your enrollment request. Our team will contact you to complete the admission process.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 space-y-4">
          <input type="text" name="honeypot" className="hidden" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Student Name *</label>
              <input required value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Phone *</label>
              <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Class / Grade</label>
              <input value={form.classOrGrade} onChange={e => setForm({ ...form, classOrGrade: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Course *</label>
            <input required value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Preferred Timing</label>
            <input value={form.preferredTiming} onChange={e => setForm({ ...form, preferredTiming: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Parent / Guardian Name</label>
              <input value={form.parentName} onChange={e => setForm({ ...form, parentName: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Parent Phone</label>
              <input value={form.parentPhone} onChange={e => setForm({ ...form, parentPhone: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" disabled={status === "loading"} className="w-full bg-amber-500 hover:bg-amber-600 text-teal-950 font-bold py-2.5 rounded-lg transition disabled:opacity-50">
            {status === "loading" ? "Submitting..." : "Enroll Now"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function EnrollmentPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-12 text-center">Loading...</div>}>
      <EnrollmentForm />
    </Suspense>
  );
}
