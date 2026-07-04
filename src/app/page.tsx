import Link from "next/link";
import { Phone, MessageCircle, BookOpen, Users, Trophy, Clock } from "lucide-react";

export default function HomePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "919876543210";

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Build Your Future with <span className="text-amber-400">Expert Coaching</span>
            </h1>
            <p className="text-lg md:text-xl text-teal-100 mb-2">
              JEE · NEET · School Tuition (6–12)
            </p>
            <p className="text-teal-200 mb-8">
              ஜேஇஇ · நீட் · பள்ளி டியூஷன் (6–12)
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/enquiry" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-teal-950 px-6 py-3 rounded-lg font-bold transition">
                Enquire Now
              </Link>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold transition">
                <MessageCircle size={18} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Clock, label: "Years of Experience", value: "14+" },
            { icon: Trophy, label: "Pass Percentage", value: "95%" },
            { icon: Users, label: "Students Trained", value: "5000+" },
            { icon: BookOpen, label: "Courses Offered", value: "8+" },
          ].map((item) => (
            <div key={item.label} className="text-center p-6 rounded-xl bg-stone-50 border border-stone-100">
              <item.icon className="mx-auto text-teal-700 mb-3" size={32} />
              <div className="text-2xl font-bold text-teal-900">{item.value}</div>
              <div className="text-sm text-stone-500">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-teal-900 mb-8 text-center">Featured Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "JEE Mains & Advanced", titleTamil: "ஜேஇஇ மெயின்ஸ் & அட்வான்ஸ்டு", desc: "Comprehensive IIT-JEE coaching with expert faculty.", slug: "jee-mains-advanced" },
              { title: "NEET UG", titleTamil: "நீட் யுஜி", desc: "Targeted medical entrance coaching with biology focus.", slug: "neet-ug" },
              { title: "School Tuition 6–10", titleTamil: "பள்ளி டியூஷன் 6–10", desc: "Strong foundation in Maths, Science, and English.", slug: "school-tuition-6-10" },
              { title: "School Tuition 11–12", titleTamil: "பள்ளி டியூஷன் 11–12", desc: "Board exam prep with competitive exam orientation.", slug: "school-tuition-11-12" },
            ].map((c) => (
              <div key={c.slug} className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 hover:shadow-md transition">
                <h3 className="font-bold text-teal-900 text-lg">{c.title}</h3>
                <p className="text-sm text-stone-500 mt-1">{c.titleTamil}</p>
                <p className="text-stone-600 text-sm mt-3">{c.desc}</p>
                <Link href={`/courses/${c.slug}`} className="inline-block mt-4 text-teal-700 font-semibold text-sm hover:underline">
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-teal-900 mb-8 text-center">What Parents Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Mrs. Lakshmi", text: "My son got AIR 342 in JEE Advanced. The faculty here is truly dedicated and the study material is excellent." },
              { name: "Mr. Ramesh", text: "My daughter scored 685 in NEET. We are forever grateful to Sri Tuition Center for their guidance." },
              { name: "Mrs. Priya", text: "The personal attention each student gets here is remarkable. My child improved from 60% to 92% in boards." },
            ].map((t) => (
              <div key={t.name} className="bg-stone-50 rounded-xl p-6 border border-stone-100">
                <p className="text-stone-700 italic">"{t.text}"</p>
                <p className="text-teal-800 font-semibold mt-4">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-teal-200 mb-8">Admission open for 2024–25 batch. Limited seats available.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/enquiry" className="bg-amber-500 hover:bg-amber-600 text-teal-950 px-8 py-3 rounded-lg font-bold transition">
              Enquire Now
            </Link>
            <a href={`tel:+91${whatsappNumber.slice(2)}`} className="inline-flex items-center gap-2 bg-white text-teal-900 px-8 py-3 rounded-lg font-bold transition">
              <Phone size={18} /> Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-2 flex gap-2 z-50">
        <a href={`tel:+91${whatsappNumber.slice(2)}`} className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-teal-950 py-2.5 rounded-md font-bold text-sm">
          <Phone size={16} /> Call Now
        </a>
        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white py-2.5 rounded-md font-bold text-sm">
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </div>
  );
}
