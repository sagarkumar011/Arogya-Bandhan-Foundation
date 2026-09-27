import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");
    const campaignId = searchParams.get("campaignId");

    const where: any = {};

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (campaignId && campaignId !== "ALL") {
      where.campaignId = campaignId;
    }

    if (search) {
      where.OR = [
        { donorName: { contains: search } },
        { donorEmail: { contains: search } },
        { donationNumber: { contains: search } },
        { receiptNumber: { contains: search } },
      ];
    }

    const donations = await prisma.donation.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        campaign: { select: { title: true } },
        receipt: true,
      },
    });

    return NextResponse.json({ success: true, donations });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
  }
}
