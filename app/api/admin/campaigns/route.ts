import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const campaignSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  hindiTitle: z.string().optional().nullable(),
  slug: z.string().min(3, "Slug is required"),
  category: z.string(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  story: z.string().min(10, "Story is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
  goalAmount: z.number().positive("Goal must be greater than 0"),
  beneficiariesCount: z.number().nonnegative().default(0),
  status: z.enum(["DRAFT", "ACTIVE", "PAUSED", "COMPLETED", "ARCHIVED"]).default("ACTIVE"),
  isFeatured: z.boolean().default(false),
});

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const campaigns = await prisma.campaign.findMany({
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

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const validated = campaignSchema.parse(body);

    const existingSlug = await prisma.campaign.findUnique({
      where: { slug: validated.slug },
    });
    if (existingSlug) {
      return NextResponse.json({ error: "A campaign with this slug already exists" }, { status: 400 });
    }

    const campaign = await prisma.campaign.create({
      data: {
        title: validated.title,
        hindiTitle: validated.hindiTitle || null,
        slug: validated.slug,
        category: validated.category,
        description: validated.description,
        story: validated.story,
        imageUrl: validated.imageUrl,
        goalAmount: validated.goalAmount,
        beneficiariesCount: validated.beneficiariesCount,
        status: validated.status,
        isFeatured: validated.isFeatured,
      },
    });

    await prisma.adminActivityLog.create({
      data: {
        adminId: auth.user.userId,
        adminEmail: auth.user.email,
        action: "CREATE_CAMPAIGN",
        entity: "CAMPAIGN",
        entityId: campaign.id,
        details: `Created campaign "${campaign.title}"`,
      },
    });

    return NextResponse.json({ success: true, campaign }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }
}
