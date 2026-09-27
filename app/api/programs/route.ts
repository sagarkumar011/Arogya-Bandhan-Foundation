import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      where: { status: "ACTIVE" },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ success: true, programs });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
  }
}
