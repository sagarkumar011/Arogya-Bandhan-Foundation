import React from "react";
import prisma from "@/lib/prisma";
import GalleryLightbox from "@/components/GalleryLightbox";

export const metadata = {
  title: "Media Gallery | Arogya Bandhan Foundation",
  description: "Browse authentic photographs of our medical camps, health awareness drives, rural clinics, and community initiatives.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-0">
      {/* Banner */}
      <section className="bg-[#0B2F2A] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0877C9]">
              Visual Field Archive
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Our Community in Action
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Real moments from our mobile health clinics, village health screenings, women's wellness workshops, and youth volunteer drives.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <GalleryLightbox images={images} />
        </div>
      </section>
    </div>
  );
}
