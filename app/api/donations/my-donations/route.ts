import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const donations = await prisma.donation.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      include: {
        campaign: {
          select: { title: true, slug: true },
        },
        receipt: true,
      },
    });

    return NextResponse.json({ success: true, donations });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch user donations" }, { status: 500 });
  }
}
