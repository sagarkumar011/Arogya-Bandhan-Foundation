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
    const search = searchParams.get("search");
    const role = searchParams.get("role");

    const where: any = {};
    if (role && role !== "ALL") {
      where.role = role;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        city: true,
        role: true,
        status: true,
        createdAt: true,
        _count: {
          select: { donations: true, volunteerApplications: true, eventRegistrations: true },
        },
      },
    });

    return NextResponse.json({ success: true, users });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: "Only Super Admin can change user roles and statuses" }, { status: 403 });
    }

    const body = await req.json();
    const { id, role, status } = body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        role: role || undefined,
        status: status || undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    await prisma.adminActivityLog.create({
      data: {
        adminId: auth.user.userId,
        adminEmail: auth.user.email,
        action: "UPDATE_USER_PERMISSIONS",
        entity: "USER",
        entityId: user.id,
        details: `Updated ${user.email} -> Role: ${user.role}, Status: ${user.status}`,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
