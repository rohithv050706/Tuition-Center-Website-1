import { db } from "@/db";
import { jobOpenings } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export default async function CareersPage() {
  const openings = await db.select().from(jobOpenings).where(eq(jobOpenings.isActive, true)).orderBy(desc(jobOpenings.createdAt));

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-teal-900 mb-2">Careers</h1>
      <p className="text-stone-500 mb-8">Join our team of passionate educators.</p>

      <div className="space-y-4 mb-10">
        {openings.length === 0 && <p className="text-stone-500">No open positions at the moment. Check back later!</p>}
        {openings.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm border border-stone-100 p-6">
            <div className="flex items-start gap-3">
              <Briefcase className="text-teal-700 shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold text-teal-900">{job.title}</h3>
                <p className="text-stone-600 text-sm mt-1">{job.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
        <h3 className="font-bold text-teal-900 text-lg mb-2">Apply Now</h3>
        <p className="text-stone-600 mb-4">Interested in joining us? Submit your application below.</p>
        <Link href="/careers/apply" className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 rounded-lg font-bold transition">
          Submit Application
        </Link>
      </div>
    </div>
  );
}
