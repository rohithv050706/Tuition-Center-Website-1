import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  titleTamil: varchar("title_tamil", { length: 255 }),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  syllabus: text("syllabus").notNull(),
  subjects: text("subjects").notNull(),
  duration: varchar("duration", { length: 255 }).notNull(),
  fees: varchar("fees", { length: 255 }).notNull(),
  batchTiming: text("batch_timing").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const faculty = pgTable("faculty", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  qualification: text("qualification").notNull(),
  photoUrl: text("photo_url"),
  bio: text("bio"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const results = pgTable("results", {
  id: serial("id").primaryKey(),
  studentName: varchar("student_name", { length: 255 }).notNull(),
  achievement: text("achievement").notNull(),
  year: varchar("year", { length: 20 }).notNull(),
  photoUrl: text("photo_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }),
  classOrGrade: varchar("class_or_grade", { length: 100 }),
  courseInterested: varchar("course_interested", { length: 255 }),
  preferredTiming: varchar("preferred_timing", { length: 255 }),
  message: text("message"),
  status: varchar("status", { length: 50 }).default("new").notNull(),
  source: varchar("source", { length: 50 }).default("admission").notNull(),
  ipAddress: varchar("ip_address", { length: 100 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id"),
  studentName: varchar("student_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }),
  classOrGrade: varchar("class_or_grade", { length: 100 }),
  preferredTiming: varchar("preferred_timing", { length: 255 }),
  parentName: varchar("parent_name", { length: 255 }),
  parentPhone: varchar("parent_phone", { length: 50 }),
  status: varchar("status", { length: 50 }).default("new").notNull(),
  ipAddress: varchar("ip_address", { length: 100 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }),
  position: varchar("position", { length: 255 }).notNull(),
  qualification: text("qualification").notNull(),
  experienceYears: varchar("experience_years", { length: 50 }),
  subjects: text("subjects"),
  message: text("message"),
  resumeUrl: text("resume_url"),
  status: varchar("status", { length: 50 }).default("new").notNull(),
  ipAddress: varchar("ip_address", { length: 100 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const jobOpenings = pgTable("job_openings", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
