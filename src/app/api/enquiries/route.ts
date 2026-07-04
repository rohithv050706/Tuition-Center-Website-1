import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

function getClientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, classOrGrade, courseInterested, preferredTiming, message, honeypot, source } = body;

    if (honeypot) return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    if (!name || !phone) return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    if (!/^\+?[0-9\s\-]{7,20}$/.test(phone)) return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });

    const ip = getClientIp(req);
    const recent = await db.select().from(enquiries).where(eq(enquiries.ipAddress, ip)).orderBy(desc(enquiries.createdAt)).limit(1);
    if (recent.length > 0 && recent[0].createdAt) {
      const diff = Date.now() - new Date(recent[0].createdAt).getTime();
      if (diff < 60000) return NextResponse.json({ error: "Please wait before submitting again" }, { status: 429 });
    }

    const [row] = await db.insert(enquiries).values({
      name, phone, email: email || null, classOrGrade: classOrGrade || null,
      courseInterested: courseInterested || null, preferredTiming: preferredTiming || null,
      message: message || null, source: source || "admission", ipAddress: ip,
    }).returning();

    return NextResponse.json({ success: true, id: row.id });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  let query = db.select().from(enquiries).orderBy(desc(enquiries.createdAt));
  if (status) query = db.select().from(enquiries).where(eq(enquiries.status, status)).orderBy(desc(enquiries.createdAt)) as any;

  const rows = await query;
  const filtered = search ? rows.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.phone.includes(search) ||
    (r.email && r.email.toLowerCase().includes(search.toLowerCase()))
  ) : rows;
  return NextResponse.json(filtered);
}
