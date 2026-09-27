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

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json({ success: true, posts });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}
