import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-teal-950 text-teal-100">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-amber-400 mb-3">Sri Tuition Center</h3>
          <p className="text-sm leading-relaxed">
            Empowering students in Tiruchirapalli with quality coaching for JEE, NEET, and school academics since 2010.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/courses" className="hover:text-amber-300">Courses</Link></li>
            <li><Link href="/faculty" className="hover:text-amber-300">Faculty</Link></li>
            <li><Link href="/results" className="hover:text-amber-300">Results</Link></li>
            <li><Link href="/careers" className="hover:text-amber-300">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-amber-300">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><MapPin size={16} className="text-amber-400" /> 45, Main Road, Tiruchirapalli, Tamil Nadu</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-amber-400" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-amber-400" /> info@srituition.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-teal-800 text-center text-xs py-4 text-teal-300">
        © {new Date().getFullYear()} Sri Tuition Center. All rights reserved.
      </div>
    </footer>
  );
}
