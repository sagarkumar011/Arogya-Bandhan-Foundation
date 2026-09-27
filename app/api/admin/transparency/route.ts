import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const docSchema = z.object({
  title: z.string().min(2),
  category: z.string(),
  year: z.string(),
  documentUrl: z.string().min(1),
  fileSize: z.string().optional(),
  isPublic: z.boolean().default(true),
  statusNote: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const documents = await prisma.transparencyDocument.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, documents });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const validated = docSchema.parse(body);

    const doc = await prisma.transparencyDocument.create({
      data: {
        title: validated.title,
        category: validated.category,
        year: validated.year,
        documentUrl: validated.documentUrl,
        fileSize: validated.fileSize || "1.0 MB",
        isPublic: validated.isPublic,
        statusNote: validated.statusNote || "Official Institutional Documentation",
      },
    });

    return NextResponse.json({ success: true, document: doc }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to add document" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const { id, isPublic, statusNote, title, category, year } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const doc = await prisma.transparencyDocument.update({
      where: { id },
      data: {
        isPublic: isPublic !== undefined ? Boolean(isPublic) : undefined,
        statusNote: statusNote !== undefined ? statusNote : undefined,
        title: title !== undefined ? title : undefined,
        category: category !== undefined ? category : undefined,
        year: year !== undefined ? year : undefined,
      },
    });

    return NextResponse.json({ success: true, document: doc });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update document" }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.transparencyDocument.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Document deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
  }
}

