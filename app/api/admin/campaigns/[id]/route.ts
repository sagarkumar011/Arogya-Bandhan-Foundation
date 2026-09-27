import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = params;
    const body = await req.json();

    const campaign = await prisma.campaign.update({
      where: { id },
      data: {
        title: body.title,
        hindiTitle: body.hindiTitle,
        category: body.category,
        description: body.description,
        story: body.story,
        imageUrl: body.imageUrl,
        goalAmount: body.goalAmount ? Number(body.goalAmount) : undefined,
        beneficiariesCount: body.beneficiariesCount !== undefined ? Number(body.beneficiariesCount) : undefined,
        status: body.status,
        isFeatured: body.isFeatured !== undefined ? Boolean(body.isFeatured) : undefined,
      },
    });

    await prisma.adminActivityLog.create({
      data: {
        adminId: auth.user.userId,
        adminEmail: auth.user.email,
        action: "UPDATE_CAMPAIGN",
        entity: "CAMPAIGN",
        entityId: campaign.id,
        details: `Updated campaign "${campaign.title}" to status ${campaign.status}`,
      },
    });

    return NextResponse.json({ success: true, campaign });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(req, ["SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = params;

    // Check if campaign has donations
    const donationCount = await prisma.donation.count({ where: { campaignId: id } });
    if (donationCount > 0) {
      // Soft-delete per Section 70
      const campaign = await prisma.campaign.update({
        where: { id },
        data: { status: "ARCHIVED" },
      });
      return NextResponse.json({
        success: true,
        message: "Campaign has active financial records. Soft-deleted and marked as ARCHIVED.",
        campaign,
      });
    }

    await prisma.campaign.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Campaign deleted permanently" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 });
  }
}
