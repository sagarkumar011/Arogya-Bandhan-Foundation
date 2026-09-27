import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const where: any = { isPublished: true };
    if (category && category !== "All") {
      where.category = category;
    }

    const faqs = await prisma.fAQ.findMany({
      where,
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ success: true, faqs });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}
