import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, hashPassword } from "@/lib/auth";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload || !payload.username) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { oldPassword, newPassword } = await req.json();
    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: "Old and new passwords are required" }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
    }

    const users = await db.select().from(adminUsers).where(eq(adminUsers.username, String(payload.username)));
    if (users.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const user = users[0];
    const valid = await verifyPassword(oldPassword, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Old password is incorrect" }, { status: 401 });
    }

    const newHash = await hashPassword(newPassword);
    await db.update(adminUsers).set({ passwordHash: newHash }).where(eq(adminUsers.id, user.id));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
