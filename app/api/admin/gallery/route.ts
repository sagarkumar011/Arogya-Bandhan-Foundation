import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const gallerySchema = z.object({
  title: z.string().min(2),
  caption: z.string().optional(),
  category: z.string().default("Healthcare"),
  imageUrl: z.string().min(1),
  albumId: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
});

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
      include: { album: true },
    });

    const albums = await prisma.galleryAlbum.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, images, albums });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const validated = gallerySchema.parse(body);

    const image = await prisma.galleryImage.create({
      data: {
        title: validated.title,
        caption: validated.caption || null,
        category: validated.category,
        imageUrl: validated.imageUrl,
        albumId: validated.albumId || null,
        isFeatured: validated.isFeatured,
      },
    });

    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Image ID required" }, { status: 400 });

    await prisma.galleryImage.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Image deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
