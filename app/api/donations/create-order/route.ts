import { NextRequest, NextResponse } from "next/server";
import { createRazorpayOrder } from "@/lib/razorpay";
import { z } from "zod";

const createOrderSchema = z.object({
  amount: z.number().min(10, "Minimum donation is ₹10"),
  campaignId: z.string().optional(),
  campaignName: z.string().optional(),
  donorName: z.string().min(2, "Name is required"),
  donorEmail: z.string().email("Valid email is required"),
  donorPhone: z.string().optional(),
  donorPan: z.string().optional(),
  donorAddress: z.string().optional(),
  frequency: z.enum(["ONE_TIME", "MONTHLY"]).default("ONE_TIME"),
  isAnonymous: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = createOrderSchema.parse(body);

    const receiptRef = `ABF-${Date.now().toString().slice(-6)}`;
    const order = await createRazorpayOrder({
      amount: validated.amount,
      currency: "INR",
      receipt: receiptRef,
      notes: {
        campaignId: validated.campaignId || "general",
        donorName: validated.donorName,
        donorEmail: validated.donorEmail,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: order.keyId,
      receiptRef,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to initiate donation order" }, { status: 500 });
  }
}
