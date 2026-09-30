import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma, { isDatabaseConfigured } from "@/lib/prisma";
import { getInMemoryContacts, updateInMemoryContact } from "@/lib/inMemoryStore";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let messages: any[] = [];

    if (isDatabaseConfigured()) {
      try {
        const where: any = {};
        if (status && status !== "ALL") {
          where.status = status;
        }

        messages = await prisma.contactMessage.findMany({
          where,
          orderBy: { createdAt: "desc" },
        });
      } catch (dbErr) {
        console.warn("DB error in admin contact GET, using fallback:", dbErr);
      }
    }

    if (!messages || messages.length === 0) {
      let inMem = getInMemoryContacts();
      if (status && status !== "ALL") {
        inMem = inMem.filter((m) => m.status === status);
      }
      messages = inMem;
    }

    return NextResponse.json({ success: true, messages });
  } catch (err) {
    return NextResponse.json({ success: true, messages: getInMemoryContacts() });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const { id, status, adminNotes } = body;

    let updated: any = null;

    if (isDatabaseConfigured()) {
      try {
        updated = await prisma.contactMessage.update({
          where: { id },
          data: {
            status,
            adminNotes,
          },
        });
      } catch (dbErr) {
        console.warn("DB error in admin contact PUT, using in-memory update:", dbErr);
      }
    }

    if (!updated) {
      updated = updateInMemoryContact(id, {
        status,
        adminNotes,
      });
    }

    return NextResponse.json({ success: true, message: updated || { id, status, adminNotes } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update enquiry status" }, { status: 500 });
  }
}
