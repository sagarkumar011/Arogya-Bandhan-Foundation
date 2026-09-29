import crypto from "crypto";

export interface CreateOrderParams {
  amount: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  keyId: string;
}

export async function createRazorpayOrder(
  params: CreateOrderParams
): Promise<RazorpayOrderResponse> {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error(
      "Razorpay credentials are not configured on the server."
    );
  }

  const amountInPaise = Math.round(params.amount * 100);

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },

    body: JSON.stringify({
      amount: amountInPaise,
      currency: params.currency || "INR",
      receipt: params.receipt,
      notes: params.notes,
    }),
  });

  if (!res.ok) {
    let errorMessage = "Failed to create Razorpay order.";

    try {
      const err = await res.json();

      errorMessage =
        err?.error?.description ||
        err?.error?.reason ||
        errorMessage;
    } catch {}

    throw new Error(errorMessage);
  }

  const data = await res.json();

  if (!data.id) {
    throw new Error("Razorpay did not return an order ID.");
  }

  return {
    id: data.id,
    amount: data.amount,
    currency: data.currency,
    receipt: data.receipt,
    status: data.status,
    keyId,
  };
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    return false;
  }

  try {
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    return generatedSignature === signature;
  } catch {
    return false;
  }
}
