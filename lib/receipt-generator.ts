import { jsPDF } from "jspdf";

export interface ReceiptData {
  receiptNumber: string;
  donationNumber: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string | null;
  donorPan?: string | null;
  donorAddress?: string | null;
  amount: number;
  date: string | Date;
  campaignName: string;
  paymentMethod: string;
  paymentId?: string | null;
}

export function generateDonationReceiptPDF(data: ReceiptData): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const formattedDate = new Date(data.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Top Header Banner
  doc.setFillColor(8, 127, 91); // Deep Healthcare Green #087F5B
  doc.rect(0, 0, 210, 36, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("AROGYA BANDHAN FOUNDATION", 15, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Healthy People | Stronger Communities", 15, 26);
  doc.text("OFFICIAL DONATION RECEIPT", 145, 18);

  // Decorative Accent Line
  doc.setFillColor(245, 130, 32); // Warm Orange #F58220
  doc.rect(0, 36, 210, 3, "F");

  // Receipt Meta Info
  doc.setTextColor(23, 50, 77); // Text Color #17324D
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`Receipt No: ${data.receiptNumber}`, 15, 52);
  doc.text(`Date: ${formattedDate}`, 150, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Donation Ref: ${data.donationNumber}`, 15, 58);
  doc.text(`Payment ID: ${data.paymentId || "ONLINE-VERIFIED"}`, 150, 58);

  // Divider
  doc.setDrawColor(220, 229, 236);
  doc.setLineWidth(0.5);
  doc.line(15, 64, 195, 64);

  // Donor Details Section
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(8, 127, 91);
  doc.text("DONOR DETAILS", 15, 74);

  doc.setFontSize(10);
  doc.setTextColor(23, 50, 77);
  doc.setFont("helvetica", "bold");
  doc.text("Name:", 15, 82);
  doc.setFont("helvetica", "normal");
  doc.text(data.donorName || "Valued Contributor", 45, 82);

  doc.setFont("helvetica", "bold");
  doc.text("Email:", 15, 89);
  doc.setFont("helvetica", "normal");
  doc.text(data.donorEmail || "N/A", 45, 89);

  if (data.donorPhone) {
    doc.setFont("helvetica", "bold");
    doc.text("Phone:", 15, 96);
    doc.setFont("helvetica", "normal");
    doc.text(data.donorPhone, 45, 96);
  }

  if (data.donorPan) {
    doc.setFont("helvetica", "bold");
    doc.text("PAN:", 15, 103);
    doc.setFont("helvetica", "normal");
    doc.text(data.donorPan.toUpperCase(), 45, 103);
  }

  // Contribution Table Box
  doc.setFillColor(234, 247, 242); // Light Green #EAF7F2
  doc.roundedRect(15, 114, 180, 48, 3, 3, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(8, 127, 91);
  doc.text("Contribution Summary", 22, 124);

  doc.setFontSize(10);
  doc.setTextColor(23, 50, 77);
  doc.setFont("helvetica", "normal");
  doc.text(`Campaign / Purpose:`, 22, 134);
  doc.setFont("helvetica", "bold");
  doc.text(data.campaignName || "General Healthcare Fund", 75, 134);

  doc.setFont("helvetica", "normal");
  doc.text(`Mode of Payment:`, 22, 142);
  doc.text(data.paymentMethod || "Online Gateway / UPI", 75, 142);

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(8, 127, 91);
  doc.text(`Total Amount Received:`, 22, 153);
  doc.text(`INR  ${data.amount.toLocaleString("en-IN")}/-`, 130, 153);

  // Thank you note
  doc.setFontSize(10);
  doc.setTextColor(23, 50, 77);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Thank you for standing with Arogya Bandhan Foundation in our mission to bring quality healthcare,",
    15,
    176
  );
  doc.text(
    "nutritional security, and dignity to vulnerable communities across India.",
    15,
    182
  );

  // Statutory & Compliance Note
  doc.setFontSize(8);
  doc.setTextColor(88, 113, 137);
  doc.setFont("helvetica", "normal");
  doc.text("STATUTORY & COMPLIANCE NOTICE:", 15, 196);
  doc.text(
    "This is a computer-generated digital receipt issued by Arogya Bandhan Foundation. Official foundation",
    15,
    201
  );
  doc.text(
    "records and compliance filings are available on the Foundation Transparency Portal.",
    15,
    206
  );
  doc.text(
    "*Note: Tax exemption certificates and statutory registrations are subject to applicable institutional filings.",
    15,
    211
  );

  // Authorized Signatory Stamp Box
  doc.setDrawColor(8, 119, 201);
  doc.roundedRect(130, 222, 65, 30, 2, 2, "S");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(8, 119, 201);
  doc.text("Arogya Bandhan Foundation", 134, 230);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(23, 50, 77);
  doc.text("[ Digitally Verified ]", 146, 240);
  doc.text("Authorized Finance Trustee", 138, 248);

  // Bottom Footer
  doc.setFillColor(11, 47, 42); // Dark #0B2F2A
  doc.rect(0, 282, 210, 15, "F");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(
    "Arogya Bandhan Foundation | contact@arogyabandhan.org | www.arogyabandhan.org",
    42,
    290
  );

  return doc;
}
