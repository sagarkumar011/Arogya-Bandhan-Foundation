import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const where: any = {};
    if (category && category !== "All") {
      where.category = category;
    }

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: { displayOrder: "asc" },
      include: {
        album: {
          select: { title: true },
        },
      },
    });

    const albums = await prisma.galleryAlbum.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, images, albums });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 });
  }
}
