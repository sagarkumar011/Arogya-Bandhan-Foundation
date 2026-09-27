import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await prisma.volunteerApplication.findMany({
      where: {
        OR: [{ userId: session.userId }, { email: session.email }],
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, applications });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
