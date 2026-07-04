import { db } from "@/db";
import { courses, faculty, results, adminUsers, galleryImages, jobOpenings } from "@/db/schema";
import { hashPassword } from "@/lib/auth";

async function seed() {
  const existing = await db.select().from(adminUsers).limit(1);
  if (existing.length === 0) {
    await db.insert(adminUsers).values({
      username: process.env.ADMIN_USERNAME || "admin",
      passwordHash: await hashPassword(process.env.ADMIN_PASSWORD || "admin123"),
    });
  }

  const courseCount = await db.select().from(courses).limit(1);
  if (courseCount.length === 0) {
    await db.insert(courses).values([
      {
        slug: "jee-mains-advanced",
        title: "JEE Mains & Advanced",
        titleTamil: "ஜேஇஇ மெயின்ஸ் & அட்வான்ஸ்டு",
        shortDescription: "Comprehensive coaching for IIT-JEE with expert faculty and proven results.",
        fullDescription: "Our JEE program covers Physics, Chemistry, and Mathematics with in-depth conceptual clarity, daily practice problems, and full-length mock tests. Designed for serious aspirants targeting IITs and NITs.",
        syllabus: "Complete NCERT + Advanced level coverage. Physics: Mechanics, Electrodynamics, Modern Physics, Optics. Chemistry: Organic, Inorganic, Physical. Mathematics: Algebra, Calculus, Coordinate Geometry, Trigonometry.",
        subjects: "Physics, Chemistry, Mathematics",
        duration: "2 Years (Integrated) / 1 Year (Crash)",
        fees: "₹85,000 per year",
        batchTiming: "Weekdays: 4:00 PM – 7:30 PM | Weekends: 9:00 AM – 1:00 PM",
        imageUrl: "",
      },
      {
        slug: "neet-ug",
        title: "NEET UG",
        titleTamil: "நீட் யுஜி",
        shortDescription: "Targeted medical entrance coaching with biology-focused curriculum.",
        fullDescription: "Our NEET program is designed to help students crack medical entrance exams with strong fundamentals in Biology, Physics, and Chemistry. Includes NCERT mastery, diagram practice, and previous year paper analysis.",
        syllabus: "Complete NCERT coverage for Classes 11 & 12. Biology: Zoology & Botany. Physics & Chemistry aligned with NEET pattern.",
        subjects: "Biology, Physics, Chemistry",
        duration: "2 Years (Integrated) / 1 Year (Crash)",
        fees: "₹75,000 per year",
        batchTiming: "Weekdays: 4:00 PM – 7:30 PM | Weekends: 9:00 AM – 1:00 PM",
        imageUrl: "",
      },
      {
        slug: "school-tuition-6-10",
        title: "School Tuition Classes 6–10",
        titleTamil: "பள்ளி டியூஷன் வகுப்புகள் 6–10",
        shortDescription: "Strong foundation in Maths, Science, and English for school students.",
        fullDescription: "We build strong academic foundations for students in classes 6 to 10. Our teaching focuses on conceptual understanding, regular tests, and personalized attention to ensure top scores in school exams.",
        syllabus: "Mathematics, Science (Physics, Chemistry, Biology), English, Social Science as per CBSE/State Board.",
        subjects: "Mathematics, Science, English, Social Science",
        duration: "Academic Year",
        fees: "₹25,000 per year",
        batchTiming: "Weekdays: 5:00 PM – 7:00 PM",
        imageUrl: "",
      },
      {
        slug: "school-tuition-11-12",
        title: "School Tuition Classes 11–12",
        titleTamil: "பள்ளி டியூஷன் வகுப்புகள் 11–12",
        shortDescription: "Board exam preparation with competitive exam orientation.",
        fullDescription: "Focused coaching for Class 11 and 12 students preparing for board exams. We cover all subjects with special emphasis on scoring topics and exam-writing techniques.",
        syllabus: "Complete board syllabus for all streams: Science, Commerce, and Arts.",
        subjects: "All Subjects",
        duration: "Academic Year",
        fees: "₹35,000 per year",
        batchTiming: "Weekdays: 4:00 PM – 7:00 PM",
        imageUrl: "",
      },
    ]);
  }

  const facultyCount = await db.select().from(faculty).limit(1);
  if (facultyCount.length === 0) {
    await db.insert(faculty).values([
      { name: "Dr. Ramesh Kumar", subject: "Physics", qualification: "Ph.D. Physics, IIT Madras", bio: "15+ years of experience coaching JEE and NEET aspirants." },
      { name: "Mrs. Lakshmi Devi", subject: "Chemistry", qualification: "M.Sc. Chemistry, Anna University", bio: "Expert in Organic Chemistry with a passion for making concepts simple." },
      { name: "Mr. Suresh Babu", subject: "Mathematics", qualification: "M.Sc. Mathematics, NIT Trichy", bio: "Specializes in Calculus and Algebra for competitive exams." },
      { name: "Dr. Priya Venkat", subject: "Biology", qualification: "M.D. (Pathology), JIPMER", bio: "NEET specialist with deep knowledge of Zoology and Botany." },
    ]);
  }

  const resultsCount = await db.select().from(results).limit(1);
  if (resultsCount.length === 0) {
    await db.insert(results).values([
      { studentName: "Arun Prakash", achievement: "AIR 342 in JEE Advanced 2024", year: "2024" },
      { studentName: "Meena Rajan", achievement: "NEET Score 685 / 720", year: "2024" },
      { studentName: "Karthik S", achievement: "State Rank 12 in Class 12 Board Exams", year: "2023" },
      { studentName: "Divya N", achievement: "AIR 890 in JEE Mains 2023", year: "2023" },
    ]);
  }

  const galleryCount = await db.select().from(galleryImages).limit(1);
  if (galleryCount.length === 0) {
    await db.insert(galleryImages).values([
      { title: "Classroom", imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80" },
      { title: "Library", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80" },
      { title: "Study Session", imageUrl: "https://images.unsplash.com/photo-1427504740708-5a99483c6bc1?w=600&q=80" },
      { title: "Science Lab", imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80" },
      { title: "Group Discussion", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80" },
      { title: "Award Ceremony", imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80" },
    ]);
  }

  const jobCount = await db.select().from(jobOpenings).limit(1);
  if (jobCount.length === 0) {
    await db.insert(jobOpenings).values([
      { title: "Physics Faculty", description: "Looking for experienced Physics teacher for JEE coaching. Minimum 3 years experience required.", isActive: true },
      { title: "Mathematics Faculty", description: "Seeking Mathematics faculty for school tuition and competitive exam coaching.", isActive: true },
    ]);
  }

  console.log("Seed completed");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
