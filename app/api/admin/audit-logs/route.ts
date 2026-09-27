import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const logs = await prisma.adminActivityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        admin: {
          select: { name: true, email: true },
        },
      },
    });

    return NextResponse.json({ success: true, logs });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 });
  }
}
