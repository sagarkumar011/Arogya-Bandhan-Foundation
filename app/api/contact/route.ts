import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = contactSchema.parse(body);

    const enquiry = await prisma.contactMessage.create({
      data: {
        fullName: validated.fullName,
        email: validated.email.toLowerCase(),
        phone: validated.phone || null,
        subject: validated.subject,
        message: validated.message,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Our team will contact you shortly.",
      enquiryId: enquiry.id,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
