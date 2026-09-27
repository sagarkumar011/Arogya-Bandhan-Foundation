import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { z } from "zod";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const validated = registerSchema.parse(body);

    const event = await prisma.event.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (event.status === "CLOSED" || event.status === "COMPLETED") {
      return NextResponse.json({ error: "Registration for this event is closed" }, { status: 400 });
    }

    if (event.registeredCount >= event.registrationLimit) {
      return NextResponse.json({ error: "Event capacity reached" }, { status: 400 });
    }

    const session = await getSessionUser(req);
    let userId = session?.userId || null;

    if (!userId) {
      const user = await prisma.user.findUnique({
        where: { email: validated.email.toLowerCase() },
      });
      if (user) userId = user.id;
    }

    // Check if already registered
    const existing = await prisma.eventRegistration.findFirst({
      where: {
        eventId: event.id,
        email: validated.email.toLowerCase(),
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You have already registered for this event", ticketNumber: existing.ticketNumber },
        { status: 400 }
      );
    }

    const ticketNumber = `ABF-TKT-${Date.now().toString().slice(-6)}`;

    const registration = await prisma.$transaction(async (tx) => {
      const reg = await tx.eventRegistration.create({
        data: {
          eventId: event.id,
          userId,
          fullName: validated.fullName,
          email: validated.email.toLowerCase(),
          phone: validated.phone,
          ticketNumber,
          status: "CONFIRMED",
        },
      });

      await tx.event.update({
        where: { id: event.id },
        data: { registeredCount: { increment: 1 } },
      });

      if (userId) {
        await tx.notification.create({
          data: {
            userId,
            title: "Event Registration Confirmed",
            message: `You are confirmed for "${event.title}". Ticket: ${ticketNumber}`,
            type: "EVENT",
            linkUrl: "/user/events",
          },
        });
      }

      return reg;
    });

    return NextResponse.json({
      success: true,
      message: "Event registration confirmed",
      ticketNumber: registration.ticketNumber,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to register for event" }, { status: 500 });
  }
}
