import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(3),
  hindiTitle: z.string().optional().nullable(),
  slug: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(10),
  category: z.string(),
  authorName: z.string().default("Arogya Bandhan Editorial"),
  authorRole: z.string().default("Communications Team"),
  featuredImage: z.string(),
  tags: z.string().optional().nullable(),
  isPublished: z.boolean().default(true),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
});

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, posts });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const validated = blogSchema.parse(body);

    const post = await prisma.blogPost.create({
      data: {
        title: validated.title,
        hindiTitle: validated.hindiTitle || null,
        slug: validated.slug,
        excerpt: validated.excerpt,
        content: validated.content,
        category: validated.category,
        authorName: validated.authorName,
        authorRole: validated.authorRole,
        featuredImage: validated.featuredImage,
        tags: validated.tags || null,
        isPublished: validated.isPublished,
        seoTitle: validated.seoTitle || validated.title,
        seoDescription: validated.seoDescription || validated.excerpt,
      },
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
