import { db } from "@/db";
import { results } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Trophy } from "lucide-react";

export default async function ResultsPage() {
  const allResults = await db.select().from(results).orderBy(desc(results.createdAt));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-teal-900 mb-2">Results & Achievements</h1>
      <p className="text-stone-500 mb-8">Proud moments from our students&apos; success stories.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {allResults.map((r) => (
          <div key={r.id} className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 text-center hover:shadow-md transition">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-4">
              <Trophy size={28} />
            </div>
            <h3 className="font-bold text-teal-900">{r.studentName}</h3>
            <p className="text-sm text-stone-600 mt-2">{r.achievement}</p>
            <span className="inline-block mt-3 text-xs font-semibold bg-teal-100 text-teal-800 px-3 py-1 rounded-full">{r.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
