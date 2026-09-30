import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import prisma, { isDatabaseConfigured } from "@/lib/prisma";
import { getInMemoryVolunteers } from "@/lib/inMemoryStore";

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let applications: any[] = [];
    if (isDatabaseConfigured()) {
      try {
        applications = await prisma.volunteerApplication.findMany({
          where: {
            OR: [{ userId: session.userId }, { email: session.email }],
          },
          orderBy: { createdAt: "desc" },
        });
      } catch (dbErr) {
        console.warn("DB query error in my-applications, using memory fallback:", dbErr);
      }
    }

    if (!applications || applications.length === 0) {
      const inMem = getInMemoryVolunteers();
      applications = inMem.filter(
        (v) =>
          (session.userId && v.userId === session.userId) ||
          (session.email && v.email.toLowerCase() === session.email.toLowerCase())
      );
    }

    return NextResponse.json({ success: true, applications });
  } catch (err) {
    return NextResponse.json({ success: true, applications: [] });
  }
}
