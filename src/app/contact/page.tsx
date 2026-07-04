"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const whatsappNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "919876543210";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, honeypot: "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-teal-900 mb-2">Contact Us</h1>
      <p className="text-stone-500 mb-8">We would love to hear from you.</p>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="flex items-start gap-4 bg-white rounded-xl p-5 border border-stone-100 shadow-sm">
            <MapPin className="text-teal-700 shrink-0" size={22} />
            <div>
              <h3 className="font-bold text-teal-900">Address</h3>
              <p className="text-stone-600 text-sm mt-1">45, Main Road, Tiruchirapalli, Tamil Nadu — 620001</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white rounded-xl p-5 border border-stone-100 shadow-sm">
            <Phone className="text-teal-700 shrink-0" size={22} />
            <div>
              <h3 className="font-bold text-teal-900">Phone</h3>
              <p className="text-stone-600 text-sm mt-1">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white rounded-xl p-5 border border-stone-100 shadow-sm">
            <Mail className="text-teal-700 shrink-0" size={22} />
            <div>
              <h3 className="font-bold text-teal-900">Email</h3>
              <p className="text-stone-600 text-sm mt-1">info@srituition.com</p>
            </div>
          </div>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold transition">
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
          <div className="rounded-xl overflow-hidden border border-stone-100 shadow-sm h-64 bg-stone-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0!2d78.68!3d10.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ3JzI0LjAiTiA3OMKwNDAnNDguMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div>
          {status === "success" ? (
            <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-100">
              <h3 className="font-bold text-lg">Message Sent!</h3>
              <p>We will get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 space-y-4">
              <input type="text" name="honeypot" className="hidden" />
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Name *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Phone *</label>
                <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Message *</label>
                <textarea required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button type="submit" disabled={status === "loading"} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 rounded-lg transition disabled:opacity-50">
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
