import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = params;
    const body = await req.json();

    const event = await prisma.event.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        imageUrl: body.imageUrl,
        eventDate: body.eventDate ? new Date(body.eventDate) : undefined,
        startTime: body.startTime,
        endTime: body.endTime,
        location: body.location,
        venueAddress: body.venueAddress,
        registrationLimit: body.registrationLimit ? Number(body.registrationLimit) : undefined,
        status: body.status,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = params;
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Event deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
