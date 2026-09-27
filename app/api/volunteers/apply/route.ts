import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { z } from "zod";

const volunteerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  city: z.string().min(2, "City is required"),
  occupation: z.string().min(2, "Occupation is required"),
  skills: z.string().min(2, "Please provide your skills or background"),
  areasOfInterest: z.string().min(2, "Select at least one area of interest"),
  availability: z.string().min(2, "Select your availability"),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = volunteerSchema.parse(body);

    const session = await getSessionUser(req);
    let userId = session?.userId || null;

    if (!userId) {
      const existing = await prisma.user.findUnique({
        where: { email: validated.email.toLowerCase() },
      });
      if (existing) userId = existing.id;
    }

    const application = await prisma.volunteerApplication.create({
      data: {
        userId,
        fullName: validated.fullName,
        email: validated.email.toLowerCase(),
        phone: validated.phone,
        city: validated.city,
        occupation: validated.occupation,
        skills: validated.skills,
        areasOfInterest: validated.areasOfInterest,
        availability: validated.availability,
        message: validated.message || null,
        status: "PENDING",
      },
    });

    if (userId) {
      await prisma.notification.create({
        data: {
          userId,
          title: "Volunteer Application Submitted",
          message: "Your application to join Arogya Bandhan Foundation has been received and is under review.",
          type: "VOLUNTEER",
          linkUrl: "/user/volunteer",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Your volunteer application has been submitted successfully!",
      applicationId: application.id,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
