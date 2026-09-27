import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const where: any = {
      status: "ACTIVE",
    };

    if (category && category !== "All") {
      where.category = category;
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    const campaigns = await prisma.campaign.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { donations: true },
        },
      },
    });

    return NextResponse.json({ success: true, campaigns });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}
