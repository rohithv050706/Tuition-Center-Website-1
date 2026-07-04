import Link from "next/link";
import { db } from "@/db";
import { courses } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function CoursesPage() {
  const allCourses = await db.select().from(courses).orderBy(desc(courses.createdAt));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-teal-900 mb-2">Our Courses</h1>
      <p className="text-stone-500 mb-8">Choose the right program for your academic goals.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition">
            <div className="h-40 bg-teal-100 flex items-center justify-center text-teal-700 text-4xl font-bold">
              {course.title.charAt(0)}
            </div>
            <div className="p-6">
              <h3 className="font-bold text-teal-900 text-lg">{course.title}</h3>
              {course.titleTamil && <p className="text-sm text-stone-500">{course.titleTamil}</p>}
              <p className="text-stone-600 text-sm mt-3 line-clamp-3">{course.shortDescription}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-teal-700">{course.fees}</span>
                <Link href={`/courses/${course.slug}`} className="text-amber-600 font-semibold text-sm hover:underline">
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
