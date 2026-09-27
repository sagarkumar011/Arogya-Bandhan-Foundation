"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string | null;
  category: string;
  imageUrl: string;
}

export default function GalleryLightbox({ images }: { images: GalleryItem[] }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const categories = [
    "All",
    "Health Camps",
    "Food Distribution",
    "Mass Marriage",
    "Education",
    "Children",
    "Women",
    "Community",
    "Volunteers",
    "Events",
    "Relief Work",
  ];

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category.toLowerCase() === activeCategory.toLowerCase());

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + filtered.length) % filtered.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % filtered.length);
  };

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat
                ? "bg-[#087F5B] text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {t(cat)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setSelectedIdx(idx)}
            className="group relative h-64 rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-soft hover:shadow-card-hover transition-all duration-300"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F58220]">
                {item.category}
              </span>
              <h4 className="font-heading font-bold text-sm leading-tight mt-0.5">
                {item.title}
              </h4>
              {item.caption && (
                <p className="text-[11px] text-slate-200 line-clamp-1 mt-1">
                  {item.caption}
                </p>
              )}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400 text-sm">
          {t("No images available in this category yet.", "इस श्रेणी में अभी कोई चित्र उपलब्ध नहीं है।")}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedIdx !== null && filtered[selectedIdx] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedIdx(null)}
        >
          <button
            onClick={() => setSelectedIdx(null)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div
            className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[65vh] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={filtered[selectedIdx].imageUrl}
                alt={filtered[selectedIdx].title}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center mt-4 text-white max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
                {filtered[selectedIdx].category}
              </span>
              <h3 className="font-heading font-bold text-lg mt-1">
                {filtered[selectedIdx].title}
              </h3>
              {filtered[selectedIdx].caption && (
                <p className="text-xs text-slate-300 mt-1">
                  {filtered[selectedIdx].caption}
                </p>
              )}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="absolute right-4 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
