import { db } from "@/db";
import { faculty } from "@/db/schema";
import { desc } from "drizzle-orm";
import { GraduationCap } from "lucide-react";

export default async function FacultyPage() {
  const allFaculty = await db.select().from(faculty).orderBy(desc(faculty.createdAt));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-teal-900 mb-2">Our Faculty</h1>
      <p className="text-stone-500 mb-8">Experienced educators dedicated to your success.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {allFaculty.map((f) => (
          <div key={f.id} className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 text-center hover:shadow-md transition">
            <div className="w-20 h-20 mx-auto rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-2xl font-bold mb-4">
              {f.name.charAt(0)}
            </div>
            <h3 className="font-bold text-teal-900">{f.name}</h3>
            <p className="text-sm text-amber-600 font-medium mt-1">{f.subject}</p>
            <div className="flex items-center justify-center gap-1 text-stone-500 text-xs mt-2">
              <GraduationCap size={14} /> {f.qualification}
            </div>
            {f.bio && <p className="text-sm text-stone-600 mt-3">{f.bio}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
