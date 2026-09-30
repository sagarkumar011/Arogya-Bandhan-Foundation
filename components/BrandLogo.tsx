"use client";

import React from "react";
import Image from "next/image";

export interface BrandLogoProps {
  className?: string;
  priority?: boolean;
  variant?: "default" | "dark" | "compact";
}

export default function BrandLogo({
  className = "",
  priority = true,
  variant = "default",
}: BrandLogoProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`brand flex items-center gap-2 sm:gap-2.5 md:gap-3 select-none ${className}`}
    >
      {/* 1. LOGO: Clean Arogya Bandhan graphical emblem only */}
      <div className="brand-logo relative w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex-shrink-0 transition-transform duration-200 group-hover:scale-[1.03]">
        <Image
          src="/logo-emblem.png"
          alt="Arogya Bandhan Emblem"
          fill
          priority={priority}
          sizes="(max-width: 640px) 40px, (max-width: 768px) 44px, 48px"
          className="object-contain"
        />
      </div>

      {/* Brand Text: Vertical stack of 3 separate elements */}
      <div className="brand-text flex flex-col justify-center min-w-0 text-left">
        {/* 2. MAIN BRAND NAME: Arogya Bandhan */}
        <div
          className={`font-heading font-extrabold text-[15px] min-[360px]:text-[17px] sm:text-[19px] md:text-[21px] lg:text-[22px] leading-tight tracking-tight whitespace-nowrap ${
            isDark ? "text-white" : "text-[#0B4723]"
          }`}
        >
          Arogya Bandhan
        </div>

        {/* 3. FOUNDATION */}
        <div
          className={`font-heading font-bold text-[8.5px] min-[360px]:text-[9.5px] sm:text-[10px] md:text-[11px] leading-tight uppercase tracking-[0.24em] whitespace-nowrap mt-[1px] ${
            isDark ? "text-emerald-300" : "text-[#0877C9]"
          }`}
        >
          FOUNDATION
        </div>

        {/* 4. TAGLINE: Serving Humanity • Building Communities */}
        <div
          className={`font-sans font-semibold text-[7px] min-[360px]:text-[7.5px] min-[400px]:text-[8px] sm:text-[9px] md:text-[9.5px] lg:text-[10px] leading-tight tracking-wide whitespace-nowrap mt-[1.5px] flex items-center ${
            isDark ? "text-emerald-100/90" : "text-[#587189]"
          }`}
        >
          <span>Serving Humanity</span>
          <span className="mx-1 text-[#F58220] font-bold select-none">•</span>
          <span>Building Communities</span>
        </div>
      </div>
    </div>
  );
}
