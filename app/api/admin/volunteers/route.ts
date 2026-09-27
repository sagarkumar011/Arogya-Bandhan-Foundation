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
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { city: { contains: search } },
        { occupation: { contains: search } },
      ];
    }

    const volunteers = await prisma.volunteerApplication.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, volunteers });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch volunteer applications" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const { id, status, reviewNotes } = body;

    const application = await prisma.volunteerApplication.update({
      where: { id },
      data: {
        status,
        reviewNotes,
        reviewedBy: auth.user.userId,
      },
    });

    // Notify applicant if user exists
    if (application.userId) {
      await prisma.notification.create({
        data: {
          userId: application.userId,
          title: `Volunteer Application ${status === "APPROVED" ? "Approved" : "Updated"}`,
          message:
            status === "APPROVED"
              ? "Congratulations! Your volunteer application has been approved. Welcome to the team!"
              : `Your volunteer application status is now ${status}. Notes: ${reviewNotes || "Updated by Admin"}`,
          type: "VOLUNTEER",
          linkUrl: "/user/volunteer",
        },
      });
    }

    await prisma.adminActivityLog.create({
      data: {
        adminId: auth.user.userId,
        adminEmail: auth.user.email,
        action: `VOLUNTEER_${status}`,
        entity: "VOLUNTEER",
        entityId: application.id,
        details: `Volunteer application for ${application.fullName} marked as ${status}`,
      },
    });

    return NextResponse.json({ success: true, application });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update volunteer status" }, { status: 500 });
  }
}
