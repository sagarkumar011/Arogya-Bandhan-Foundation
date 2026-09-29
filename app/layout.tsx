import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import SiteLayoutWrapper from "@/components/SiteLayoutWrapper";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Arogya Bandhan Foundation | Healthy People | Stronger Communities",
  description:
    "Arogya Bandhan Foundation is a social impact organization dedicated to accessible healthcare, preventive medical camps, nutrition, child welfare, and community empowerment across India.",
  keywords: [
    "Arogya Bandhan Foundation",
    "Healthcare NGO India",
    "Rural Health Camps",
    "Free Medical Support",
    "Maternal Health",
    "Child Nutrition",
    "Community Development",
    "Healthy People Stronger Communities",
  ],
  authors: [{ name: "Arogya Bandhan Foundation" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arogya Bandhan Foundation | Healthy People | Stronger Communities",
    description:
      "Empowering underserved communities through accessible healthcare, medical camps, disease prevention, and women's health.",
    url: siteUrl,
    siteName: "Arogya Bandhan Foundation",
    images: [
      {
        url: "/images/hero_healthcare.jpg",
        width: 1200,
        height: 630,
        alt: "Arogya Bandhan Foundation Healthcare Mission",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arogya Bandhan Foundation | Healthy People | Stronger Communities",
    description:
      "Empowering underserved communities through accessible healthcare, medical camps, disease prevention, and women's health.",
    images: ["/images/hero_healthcare.jpg"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#EAF7F2] selection:text-[#087F5B]">
        <LanguageProvider>
          <AuthProvider>
            <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
