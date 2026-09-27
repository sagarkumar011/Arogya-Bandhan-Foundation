import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    return NextResponse.json({ success: true, settings: settingsMap });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: "Only Super Admin can modify system settings" }, { status: 403 });
    }

    const body = await req.json(); // key-value map

    for (const [key, value] of Object.entries(body)) {
      if (typeof value === "string") {
        await prisma.setting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }

    await prisma.adminActivityLog.create({
      data: {
        adminId: auth.user.userId,
        adminEmail: auth.user.email,
        action: "UPDATE_SYSTEM_SETTINGS",
        entity: "SETTINGS",
        details: "Super Admin updated foundation settings & contact details",
      },
    });

    return NextResponse.json({ success: true, message: "Settings updated successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
