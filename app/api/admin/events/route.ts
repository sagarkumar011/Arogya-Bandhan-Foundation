import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  detailedStory: z.string().optional(),
  category: z.string(),
  imageUrl: z.string(),
  eventDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string(),
  venueAddress: z.string(),
  registrationLimit: z.number().int().positive().default(100),
  status: z.enum(["UPCOMING", "OPEN", "CLOSED", "COMPLETED", "CANCELLED"]).default("OPEN"),
});

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const events = await prisma.event.findMany({
      orderBy: { eventDate: "desc" },
      include: {
        registrations: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json({ success: true, events });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const validated = eventSchema.parse(body);

    const event = await prisma.event.create({
      data: {
        title: validated.title,
        slug: validated.slug,
        description: validated.description,
        detailedStory: validated.detailedStory || null,
        category: validated.category,
        imageUrl: validated.imageUrl,
        eventDate: new Date(validated.eventDate),
        startTime: validated.startTime,
        endTime: validated.endTime,
        location: validated.location,
        venueAddress: validated.venueAddress,
        registrationLimit: validated.registrationLimit,
        status: validated.status,
      },
    });

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
