import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const programs = await prisma.program.findMany({
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ success: true, programs });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const {
      title,
      hindiTitle,
      slug,
      description,
      detailedContent,
      icon,
      imageUrl,
      targetGroup,
      location,
      status,
      displayOrder,
    } = body;

    if (!title || !slug || !description) {
      return NextResponse.json({ error: "Title, slug, and description are required" }, { status: 400 });
    }

    const program = await prisma.program.create({
      data: {
        title,
        hindiTitle: hindiTitle || null,
        slug: slug.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description,
        detailedContent: detailedContent || description,
        icon: icon || "Stethoscope",
        imageUrl: imageUrl || "/images/program_medical.jpg",
        targetGroup: targetGroup || "Community members & families",
        location: location || "Pan-India",
        status: status || "ACTIVE",
        displayOrder: displayOrder ? parseInt(displayOrder) : 0,
      },
    });

    await prisma.adminActivityLog.create({
      data: {
        adminId: auth.user.userId,
        adminEmail: auth.user.email,
        action: "CREATE_PROGRAM",
        entity: "PROGRAM",
        entityId: program.id,
        details: `Created program ${program.title}`,
      },
    });

    return NextResponse.json({ success: true, program }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create program" }, { status: 500 });
  }
}
