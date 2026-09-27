import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const program = await prisma.program.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, program });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch program" }, { status: 500 });
  }
}
