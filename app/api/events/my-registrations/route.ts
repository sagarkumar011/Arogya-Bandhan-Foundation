import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const registrations = await prisma.eventRegistration.findMany({
      where: {
        OR: [{ userId: session.userId }, { email: session.email }],
      },
      include: {
        event: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, registrations });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch event registrations" }, { status: 500 });
  }
}
