import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, DEMO_ADMIN, DEMO_USER } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    // Check if session belongs to controlled demo users
    if (session.email === DEMO_ADMIN.email || session.userId === DEMO_ADMIN.id) {
      return NextResponse.json({
        authenticated: true,
        user: DEMO_ADMIN,
      });
    }

    if (session.email === DEMO_USER.email || session.userId === DEMO_USER.id) {
      return NextResponse.json({
        authenticated: true,
        user: DEMO_USER,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        city: true,
        address: true,
        profileImage: true,
        status: true,
        createdAt: true,
      },
    });

    if (!user || user.status !== "ACTIVE") {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    return NextResponse.json({
      authenticated: true,
      user,
    });
  } catch (err) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 500 });
  }
}
