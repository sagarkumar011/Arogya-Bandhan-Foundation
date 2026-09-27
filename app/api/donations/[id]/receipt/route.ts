import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const receipt = await prisma.donationReceipt.findFirst({
      where: {
        OR: [{ receiptNumber: id }, { donationId: id }, { id }],
      },
      include: {
        donation: {
          include: {
            transaction: true,
          },
        },
      },
    });

    if (!receipt) {
      return NextResponse.json({ error: "Receipt not found" }, { status: 404 });
    }

    // Increment download count
    await prisma.donationReceipt.update({
      where: { id: receipt.id },
      data: { downloadCount: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      receipt: {
        receiptNumber: receipt.receiptNumber,
        donationNumber: receipt.donation.donationNumber,
        donorName: receipt.donorName,
        donorEmail: receipt.donorEmail,
        donorPhone: receipt.donation.donorPhone,
        donorPan: receipt.donation.donorPan,
        donorAddress: receipt.donation.donorAddress,
        amount: receipt.amount,
        date: receipt.date,
        campaignName: receipt.campaignName,
        paymentMethod: receipt.donation.paymentMethod,
        paymentId: receipt.donation.razorpayPaymentId,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch receipt" }, { status: 500 });
  }
}
