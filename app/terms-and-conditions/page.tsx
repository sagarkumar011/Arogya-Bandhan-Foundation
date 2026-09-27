import React from "react";

export const metadata = {
  title: "Terms & Conditions | Arogya Bandhan Foundation",
  description: "Terms and conditions governing the use of Arogya Bandhan Foundation digital platforms and services.",
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-slate-100 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h1 className="font-heading font-black text-3xl text-[#17324D] border-b border-slate-100 pb-4">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: September 2026 | Arogya Bandhan Foundation
          </p>

          <h3 className="font-heading font-bold text-base text-[#17324D] pt-2">
            1. Acceptance of Terms
          </h3>
          <p>
            By accessing or using the Arogya Bandhan Foundation website (www.arogyabandhan.org),
            you agree to abide by these Terms and Conditions.
          </p>

          <h3 className="font-heading font-bold text-base text-[#17324D] pt-2">
            2. Donations & Receipts
          </h3>
          <p>
            All voluntary financial contributions made towards Arogya Bandhan Foundation are
            deployed towards our charitable healthcare, child welfare, and community initiatives.
            Receipts are generated electronically upon transaction confirmation and are available
            in donor accounts.
          </p>

          <h3 className="font-heading font-bold text-base text-[#17324D] pt-2">
            3. Disclaimer of Medical Advice
          </h3>
          <p>
            Educational and health awareness content published on our website is intended solely
            for public informational purposes and should not be construed as clinical medical
            diagnosis. Always consult a certified physician for medical treatment.
          </p>
        </div>
      </div>
    </div>
  );
}
