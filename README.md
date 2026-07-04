# Sri Tuition Center — Full-Stack Website

A production-ready Next.js tuition center website with bilingual (English + Tamil) support, fully functional admin panel, and PostgreSQL backend via Drizzle ORM.

## Features
- Modern, parent-friendly design with deep teal + warm gold palette
- All public pages: Home, About, Courses, Course Details, Faculty, Results, Gallery, Careers, Contact, Enquiry, Enrollment
- Fully functional forms with server-side validation, honeypot, and rate-limiting
- Database-driven Courses, Faculty, Results, Gallery, Job Openings
- Admin dashboard with complete CRUD for content + submissions management
- Secure admin authentication (JWT + httpOnly cookies)
- Password change functionality (must enter old password)
- WhatsApp click-to-chat integration (via env var)
- Export to CSV for all lists

## Environment Variables (.env)

Copy `.env.example` or create `.env` with:

```
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@srituition.com
ADMIN_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_ADMIN_WHATSAPP=919876543210

JWT_SECRET=change-this-to-a-long-random-string

RESEND_API_KEY=
```

**Admin accounts (default):**
- `admin` / `admin123`
- `sriacademy` / `123456`

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start PostgreSQL and apply schema:
   ```bash
   npx drizzle-kit push
   ```

3. Seed initial data:
   ```bash
   npx tsx src/scripts/seed.ts
   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```

5. Visit:
   - Site: http://localhost:3000
   - Admin Login: http://localhost:3000/admin/login

## Admin Panel
- Login at `/admin/login`
- Protected dashboard at `/admin/dashboard`
- Tabs for Enquiries, Enrollments, Job Applications, Courses, Faculty, Results, Gallery, Job Openings
- Change Password: From the dashboard header, use the "Change Password" button (requires old password)

## Deployment (Vercel)
- Connect your repo to Vercel
- Add all environment variables in the Vercel dashboard
- Run `npx drizzle-kit push` once after initial deployment (or use a build hook)
- The app is fully serverless compatible

## Forms
- `/enquiry` — Admission Enquiry
- `/enrollment` — Course Enrollment (can prefill via `?course=...`)
- `/contact` — General Contact
- `/careers/apply` — Job Application

All submissions are stored and trigger email notifications (when RESEND_API_KEY is configured).

## Security
- All admin routes protected with JWT
- Passwords hashed with bcrypt
- Server-side validation + honeypot on all forms
- Rate limiting per IP

---

Built with Next.js App Router + Drizzle ORM + PostgreSQL.
