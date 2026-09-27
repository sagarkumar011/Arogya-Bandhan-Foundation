import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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

    const program = await prisma.program.update({
      where: { id: params.id },
      data: {
        title,
        hindiTitle,
        slug: slug ? slug.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined,
        description,
        detailedContent,
        icon,
        imageUrl,
        targetGroup,
        location,
        status,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder) : undefined,
      },
    });

    await prisma.adminActivityLog.create({
      data: {
        adminId: auth.user.userId,
        adminEmail: auth.user.email,
        action: "UPDATE_PROGRAM",
        entity: "PROGRAM",
        entityId: program.id,
        details: `Updated program ${program.title} (${program.status})`,
      },
    });

    return NextResponse.json({ success: true, program });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update program" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(req, ["SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: "Only Super Admin can delete programs" }, { status: 403 });
    }

    // Soft delete / archive
    const program = await prisma.program.update({
      where: { id: params.id },
      data: { status: "ARCHIVED" },
    });

    await prisma.adminActivityLog.create({
      data: {
        adminId: auth.user.userId,
        adminEmail: auth.user.email,
        action: "ARCHIVE_PROGRAM",
        entity: "PROGRAM",
        entityId: program.id,
        details: `Archived program ${program.title}`,
      },
    });

    return NextResponse.json({ success: true, message: "Program archived" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to archive program" }, { status: 500 });
  }
}
