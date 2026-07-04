import { Award, Target, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-teal-900 mb-6">About Us</h1>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-stone-700 leading-relaxed mb-4">
            Sri Tuition Center was founded in 2010 in Tiruchirapalli, Tamil Nadu, with a single mission: to provide
            affordable, high-quality coaching that helps every student reach their full potential.
          </p>
          <p className="text-stone-700 leading-relaxed mb-4">
            Over the past 14 years, we have trained over 5,000 students, many of whom have gone on to secure top ranks
            in JEE, NEET, and state board examinations. Our approach combines rigorous academics with personalized
            mentoring.
          </p>
          <p className="text-stone-700 leading-relaxed">
            We believe every child can excel with the right guidance. Our faculty are not just teachers — they are
            mentors who invest in each student&apos;s success.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm flex items-start gap-4">
            <Target className="text-teal-700 shrink-0" size={28} />
            <div>
              <h3 className="font-bold text-teal-900">Our Mission</h3>
              <p className="text-sm text-stone-600 mt-1">To make quality education accessible and help students achieve their dreams through dedicated coaching.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm flex items-start gap-4">
            <Award className="text-teal-700 shrink-0" size={28} />
            <div>
              <h3 className="font-bold text-teal-900">Our Vision</h3>
              <p className="text-sm text-stone-600 mt-1">To be the most trusted coaching center in Tamil Nadu, known for transforming students into top performers.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm flex items-start gap-4">
            <Users className="text-teal-700 shrink-0" size={28} />
            <div>
              <h3 className="font-bold text-teal-900">Our Values</h3>
              <p className="text-sm text-stone-600 mt-1">Integrity, discipline, personalized attention, and a relentless focus on student outcomes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
