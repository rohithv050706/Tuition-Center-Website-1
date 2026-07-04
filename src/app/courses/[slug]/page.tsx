import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Clock, BookOpen, Users, Calendar } from "lucide-react";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rows = await db.select().from(courses).where(eq(courses.slug, slug));
  if (rows.length === 0) return notFound();
  const course = rows[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-teal-800 to-teal-600 flex items-center justify-center text-white text-5xl font-bold">
          {course.title.charAt(0)}
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-teal-900">{course.title}</h1>
          {course.titleTamil && <p className="text-stone-500 mt-1">{course.titleTamil}</p>}
          <p className="text-stone-700 mt-4 leading-relaxed">{course.fullDescription}</p>

          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div className="flex items-center gap-3 bg-stone-50 p-4 rounded-lg">
              <Clock className="text-teal-700" size={20} />
              <div>
                <p className="text-xs text-stone-500">Duration</p>
                <p className="font-semibold text-teal-900">{course.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-stone-50 p-4 rounded-lg">
              <BookOpen className="text-teal-700" size={20} />
              <div>
                <p className="text-xs text-stone-500">Subjects</p>
                <p className="font-semibold text-teal-900">{course.subjects}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-stone-50 p-4 rounded-lg">
              <Calendar className="text-teal-700" size={20} />
              <div>
                <p className="text-xs text-stone-500">Batch Timing</p>
                <p className="font-semibold text-teal-900">{course.batchTiming}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-stone-50 p-4 rounded-lg">
              <Users className="text-teal-700" size={20} />
              <div>
                <p className="text-xs text-stone-500">Fees</p>
                <p className="font-semibold text-teal-900">{course.fees}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-teal-900 text-lg mb-2">Syllabus</h3>
            <p className="text-stone-700 leading-relaxed whitespace-pre-line">{course.syllabus}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`/enrollment?course=${encodeURIComponent(course.title)}`} className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-teal-950 px-6 py-3 rounded-lg font-bold transition">
              Enroll Now
            </Link>
            <Link href="/enquiry" className="inline-flex items-center gap-2 bg-teal-100 hover:bg-teal-200 text-teal-900 px-6 py-3 rounded-lg font-bold transition">
              Ask a Question
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
