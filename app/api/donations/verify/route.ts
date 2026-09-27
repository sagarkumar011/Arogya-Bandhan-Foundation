import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { getSessionUser } from "@/lib/auth";
import { sendTransactionalEmail, generateDonationSuccessEmail } from "@/lib/email";
import { z } from "zod";

const verifySchema = z.object({
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
  amount: z.number().positive(),
  campaignId: z.string().optional().nullable(),
  donorName: z.string(),
  donorEmail: z.string().email(),
  donorPhone: z.string().optional().nullable(),
  donorPan: z.string().optional().nullable(),
  donorAddress: z.string().optional().nullable(),
  frequency: z.string().default("ONE_TIME"),
  isAnonymous: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = verifySchema.parse(body);

    // 1. Verify Payment Signature on Backend
    const isValid = verifyRazorpaySignature(
      validated.razorpayOrderId,
      validated.razorpayPaymentId,
      validated.razorpaySignature
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Payment verification failed: Invalid transaction signature" },
        { status: 400 }
      );
    }

    // Check if logged in user exists
    const session = await getSessionUser(req);
    let userId = session?.userId || null;

    if (!userId) {
      // Find if email matches an existing user
      const existingUser = await prisma.user.findUnique({
        where: { email: validated.donorEmail.toLowerCase() },
      });
      if (existingUser) userId = existingUser.id;
    }

    // Generate unique serial numbers
    const timestamp = Date.now().toString().slice(-6);
    const donationNumber = `ABF-DON-${new Date().getFullYear()}-${timestamp}`;
    const receiptNumber = `ABF-REC-${new Date().getFullYear()}-${timestamp}`;

    // Look up campaign name if campaignId provided
    let campaignName = "General Healthcare Fund";
    if (validated.campaignId) {
      const camp = await prisma.campaign.findUnique({ where: { id: validated.campaignId } });
      if (camp) campaignName = camp.title;
    }

    // 2. Database Transaction: Save Donation, Transaction, Receipt, Update Campaign
    const result = await prisma.$transaction(async (tx) => {
      // Create Donation
      const donation = await tx.donation.create({
        data: {
          donationNumber,
          userId,
          donorName: validated.donorName,
          donorEmail: validated.donorEmail.toLowerCase(),
          donorPhone: validated.donorPhone || null,
          donorPan: validated.donorPan || null,
          donorAddress: validated.donorAddress || null,
          campaignId: validated.campaignId || null,
          amount: validated.amount,
          frequency: validated.frequency,
          status: "SUCCESS",
          paymentMethod: "RAZORPAY",
          razorpayOrderId: validated.razorpayOrderId,
          razorpayPaymentId: validated.razorpayPaymentId,
          razorpaySignature: validated.razorpaySignature,
          receiptNumber,
          isAnonymous: validated.isAnonymous,
        },
      });

      // Create Payment Transaction Record
      await tx.paymentTransaction.create({
        data: {
          donationId: donation.id,
          gateway: "RAZORPAY",
          orderId: validated.razorpayOrderId,
          paymentId: validated.razorpayPaymentId,
          signature: validated.razorpaySignature,
          status: "SUCCESS",
          amount: validated.amount,
          rawResponse: JSON.stringify({ verifiedAt: new Date().toISOString() }),
        },
      });

      // Create Donation Receipt Record
      const receipt = await tx.donationReceipt.create({
        data: {
          receiptNumber,
          donationId: donation.id,
          donorName: validated.donorName,
          donorEmail: validated.donorEmail.toLowerCase(),
          amount: validated.amount,
          campaignName,
        },
      });

      // Update Campaign progress if linked
      if (validated.campaignId) {
        await tx.campaign.update({
          where: { id: validated.campaignId },
          data: {
            raisedAmount: { increment: validated.amount },
            donorsCount: { increment: 1 },
          },
        });
      }

      // If user is registered, create notification
      if (userId) {
        await tx.notification.create({
          data: {
            userId,
            title: "Donation Successful & Verified",
            message: `Thank you for contributing ₹${validated.amount.toLocaleString("en-IN")} to ${campaignName}. Your receipt ${receiptNumber} is ready.`,
            type: "DONATION",
            linkUrl: "/user/receipts",
          },
        });
      }

      return { donation, receipt };
    });

    // 3. Send Confirmation Email Asynchronously
    sendTransactionalEmail({
      to: validated.donorEmail,
      subject: `Official Donation Receipt - Arogya Bandhan Foundation [${receiptNumber}]`,
      template: "DONATION_SUCCESS",
      data: {
        html: generateDonationSuccessEmail(validated.donorName, validated.amount, donationNumber, campaignName),
      },
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and donation recorded",
      donation: result.donation,
      receiptNumber: result.receipt.receiptNumber,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    console.error("Donation verification error:", err);
    return NextResponse.json({ error: "Failed to verify donation transaction" }, { status: 500 });
  }
}
