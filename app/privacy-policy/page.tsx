import React from "react";

export const metadata = {
  title: "Privacy Policy | Arogya Bandhan Foundation",
  description: "Official Privacy Policy of Arogya Bandhan Foundation governing data collection, donor confidentiality, and security.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-slate-100 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h1 className="font-heading font-black text-3xl text-[#17324D] border-b border-slate-100 pb-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: September 2026 | Arogya Bandhan Foundation
          </p>

          <h3 className="font-heading font-bold text-base text-[#17324D] pt-2">
            1. Commitment to Donor & Patient Privacy
          </h3>
          <p>
            Arogya Bandhan Foundation respects the privacy of every individual who visits our
            website, donates to our causes, volunteers with our field operations, or receives
            medical care during our community camps. We do not sell, rent, or trade personal data to third parties.
          </p>

          <h3 className="font-heading font-bold text-base text-[#17324D] pt-2">
            2. Information We Collect
          </h3>
          <p>
            When you register an account, donate, or register for an event, we may collect your name,
            email address, contact telephone, city, and optional PAN number for statutory receipt
            issuance. Payment transactions are processed through PCI-DSS certified gateway
            partners (Razorpay) and no card numbers, CVVs, or banking credentials are ever stored
            on our servers.
          </p>

          <h3 className="font-heading font-bold text-base text-[#17324D] pt-2">
            3. Respectful Patient Storytelling
          </h3>
          <p>
            Photographs and medical recovery stories featured on our platforms are shared with the
            informed, voluntary consent of the individuals and their guardians. We never exploit
            vulnerable individuals and maintain ethical dignity in all communications.
          </p>

          <h3 className="font-heading font-bold text-base text-[#17324D] pt-2">
            4. Contact
          </h3>
          <p>
            If you have questions regarding data retention or wish to request data updates, please
            email us at <strong className="text-[#087F5B]">aarogyabandhanfoundation@gmail.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
