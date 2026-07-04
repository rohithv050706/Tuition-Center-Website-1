import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { results } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const rows = await db.select().from(results).orderBy(desc(results.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const [row] = await db.insert(results).values(body).returning();
    return NextResponse.json(row);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
