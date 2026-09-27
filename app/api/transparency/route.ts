import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const documents = await prisma.transparencyDocument.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, documents });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch transparency documents" }, { status: 500 });
  }
}
