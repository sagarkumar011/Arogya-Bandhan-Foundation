import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const campaign = await prisma.campaign.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        donations: {
          where: { status: "SUCCESS" },
          orderBy: { createdAt: "desc" },
          take: 10,
          select: {
            id: true,
            donorName: true,
            amount: true,
            isAnonymous: true,
            createdAt: true,
          },
        },
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, campaign });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch campaign" }, { status: 500 });
  }
}
