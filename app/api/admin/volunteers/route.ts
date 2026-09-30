import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma, { isDatabaseConfigured } from "@/lib/prisma";
import { getInMemoryVolunteers, updateInMemoryVolunteer } from "@/lib/inMemoryStore";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let volunteers: any[] = [];

    if (isDatabaseConfigured()) {
      try {
        const where: any = {};
        if (status && status !== "ALL") {
          where.status = status;
        }
        if (search) {
          where.OR = [
            { fullName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { city: { contains: search, mode: "insensitive" } },
            { occupation: { contains: search, mode: "insensitive" } },
          ];
        }

        volunteers = await prisma.volunteerApplication.findMany({
          where,
          orderBy: { createdAt: "desc" },
        });
      } catch (dbErr) {
        console.warn("DB error in admin volunteers GET, using fallback:", dbErr);
      }
    }

    if (!volunteers || volunteers.length === 0) {
      let inMem = getInMemoryVolunteers();
      if (status && status !== "ALL") {
        inMem = inMem.filter((v) => v.status === status);
      }
      if (search) {
        const q = search.toLowerCase();
        inMem = inMem.filter(
          (v) =>
            v.fullName.toLowerCase().includes(q) ||
            v.email.toLowerCase().includes(q) ||
            v.city.toLowerCase().includes(q) ||
            v.occupation.toLowerCase().includes(q)
        );
      }
      volunteers = inMem;
    }

    return NextResponse.json({ success: true, volunteers });
  } catch (err) {
    return NextResponse.json({ success: true, volunteers: getInMemoryVolunteers() });
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

    let application: any = null;

    if (isDatabaseConfigured()) {
      try {
        application = await prisma.volunteerApplication.update({
          where: { id },
          data: {
            status,
            reviewNotes,
            reviewedBy: auth.user.userId,
          },
        });

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
          }).catch(() => {});
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
        }).catch(() => {});
      } catch (dbErr) {
        console.warn("DB error in admin volunteers PUT, using in-memory update:", dbErr);
      }
    }

    if (!application) {
      application = updateInMemoryVolunteer(id, {
        status,
        reviewNotes,
        reviewedBy: auth.user.userId,
      });
    }

    return NextResponse.json({ success: true, application: application || { id, status, reviewNotes } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update volunteer status" }, { status: 500 });
  }
}
