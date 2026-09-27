import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;

    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
        isPublished: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Get related posts
    const related = await prisma.blogPost.findMany({
      where: {
        category: post.category,
        id: { not: post.id },
        isPublished: true,
      },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        publishedAt: true,
      },
    });

    return NextResponse.json({ success: true, post, related });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
