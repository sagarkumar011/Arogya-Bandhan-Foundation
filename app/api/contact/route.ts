import { NextRequest, NextResponse } from "next/server";
import prisma, { isDatabaseConfigured } from "@/lib/prisma";
import { addInMemoryContact } from "@/lib/inMemoryStore";
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

    let enquiryId = `contact_${Date.now()}`;
    let savedToDb = false;

    if (isDatabaseConfigured()) {
      try {
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
        enquiryId = enquiry.id;
        savedToDb = true;
      } catch (dbErr) {
        console.warn("Prisma error during contact message save, using memory store:", dbErr);
      }
    }

    if (!savedToDb) {
      addInMemoryContact({
        id: enquiryId,
        fullName: validated.fullName,
        email: validated.email.toLowerCase(),
        phone: validated.phone || null,
        subject: validated.subject,
        message: validated.message,
        status: "NEW",
        createdAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Our team will contact you shortly.",
      enquiryId,
    }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    console.error("Contact enquiry error:", err);
    return NextResponse.json({ error: "Failed to submit enquiry. Please try again." }, { status: 500 });
  }
}
