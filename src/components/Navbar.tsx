"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", labelTamil: "முகப்பு" },
  { href: "/about", label: "About", labelTamil: "எங்களைப் பற்றி" },
  { href: "/courses", label: "Courses", labelTamil: "பாடநெறிகள்" },
  { href: "/faculty", label: "Faculty", labelTamil: "ஆசிரியர்கள்" },
  { href: "/results", label: "Results", labelTamil: "முடிவுகள்" },
  { href: "/gallery", label: "Gallery", labelTamil: "காட்சியகம்" },
  { href: "/careers", label: "Careers", labelTamil: "வேலைவாய்ப்பு" },
  { href: "/contact", label: "Contact", labelTamil: "தொடர்பு" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "919876543210";

  return (
    <nav className="bg-teal-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-amber-400">Sri</span> Tuition Center
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-amber-300 transition">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:+91${whatsappNumber.slice(2)}`} className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-teal-950 px-3 py-1.5 rounded-md text-sm font-semibold transition">
              <Phone size={14} /> Call
            </a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-md text-sm font-semibold transition">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-teal-800 px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-2 hover:text-amber-300">
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <a href={`tel:+91${whatsappNumber.slice(2)}`} className="flex items-center gap-1 bg-amber-500 text-teal-950 px-3 py-1.5 rounded-md text-sm font-semibold">
              <Phone size={14} /> Call
            </a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-emerald-500 text-white px-3 py-1.5 rounded-md text-sm font-semibold">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
