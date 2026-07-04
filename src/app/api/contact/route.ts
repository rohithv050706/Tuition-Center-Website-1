import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

function getClientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message, honeypot } = body;

    if (honeypot) return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    if (!name || !phone || !message) return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    if (!/^\+?[0-9\s\-]{7,20}$/.test(phone)) return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });

    const ip = getClientIp(req);
    const recent = await db.select().from(enquiries).where(eq(enquiries.ipAddress, ip)).orderBy(desc(enquiries.createdAt)).limit(1);
    if (recent.length > 0 && recent[0].createdAt) {
      const diff = Date.now() - new Date(recent[0].createdAt).getTime();
      if (diff < 60000) return NextResponse.json({ error: "Please wait before submitting again" }, { status: 429 });
    }

    const [row] = await db.insert(enquiries).values({
      name, phone, email: email || null, message, source: "contact", ipAddress: ip,
    }).returning();

    return NextResponse.json({ success: true, id: row.id });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
