import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { courses } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (slug) {
    const rows = await db.select().from(courses).where(eq(courses.slug, slug));
    if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(rows[0]);
  }
  const rows = await db.select().from(courses).orderBy(desc(courses.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const [row] = await db.insert(courses).values(body).returning();
    return NextResponse.json(row);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
