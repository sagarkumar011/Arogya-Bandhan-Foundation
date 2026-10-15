"use client";

import React, { useState, useRef, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";

export const PRIMARY_PHONE = "+91 75449 90585";
export const ADDITIONAL_PHONE = "+91 76438 72805";

export const PRIMARY_TEL = "tel:+917544990585";
export const ADDITIONAL_TEL = "tel:+917643872805";

export const PRIMARY_WA = "https://wa.me/917544990585";
export const ADDITIONAL_WA = "https://wa.me/917643872805";

interface PhoneActionMenuProps {
  phoneNumber?: string;
  primaryPhone?: string;
  additionalPhone?: string;
  className?: string;
  triggerClassName?: string;
  iconClassName?: string;
  showIcon?: boolean;
  position?: "top" | "bottom";
  align?: "left" | "right";
  children?: React.ReactNode;
}

export default function PhoneActionMenu({
  phoneNumber,
  primaryPhone = PRIMARY_PHONE,
  additionalPhone = ADDITIONAL_PHONE,
  className = "",
  triggerClassName = "",
  iconClassName = "w-3.5 h-3.5 text-[#F58220]",
  showIcon = true,
  position = "bottom",
  align = "left",
  children,
}: PhoneActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleOpen}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Contact options for ${primaryPhone} and ${additionalPhone}`}
        className={`focus:outline-none cursor-pointer select-none transition-all ${triggerClassName}`}
      >
        {children ? (
          children
        ) : (
          <span className="flex items-center gap-1.5 flex-wrap">
            {showIcon && <Phone className={iconClassName} />}
            {phoneNumber ? (
              <span>{phoneNumber}</span>
            ) : (
              <>
                <span className="hover:underline">{primaryPhone}</span>
                <span className="opacity-50 select-none">•</span>
                <span className="hover:underline">{additionalPhone}</span>
              </>
            )}
          </span>
        )}
      </button>

      {/* Contact Options Popup / Dropdown */}
      <div
        role="menu"
        aria-orientation="vertical"
        aria-hidden={!isOpen}
        aria-label="Contact options"
        className={`absolute z-50 min-w-[280px] p-2.5 bg-white rounded-2xl shadow-xl border border-slate-200/90 text-slate-800 transition-all duration-200 ease-out ${
          position === "top" ? "bottom-full mb-2" : "top-full mt-2"
        } ${align === "right" ? "right-0" : "left-0"} ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto visible"
            : "opacity-0 scale-95 pointer-events-none invisible"
        }`}
      >
        {/* Header */}
        <div className="px-2 py-1 border-b border-slate-100 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Official Contact & Support
          </span>
          <span className="text-xs font-bold text-[#17324D] block truncate">
            Call or WhatsApp
          </span>
        </div>

        <div className="space-y-2">
          {/* Primary Number */}
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="text-[11px] font-bold text-[#17324D] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B]" />
                Primary Number
              </span>
              <span className="text-[11px] font-semibold text-slate-700">
                {primaryPhone}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <a
                href={PRIMARY_TEL}
                role="menuitem"
                aria-label={`Call primary number ${primaryPhone}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#087F5B] hover:bg-[#066347] text-white text-xs font-medium transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
              <a
                href={PRIMARY_WA}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                aria-label={`WhatsApp primary number ${primaryPhone}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-medium transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Additional Number */}
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="text-[11px] font-bold text-[#17324D] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0877C9]" />
                Additional Number
              </span>
              <span className="text-[11px] font-semibold text-slate-700">
                {additionalPhone}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <a
                href={ADDITIONAL_TEL}
                role="menuitem"
                aria-label={`Call additional number ${additionalPhone}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#0877C9] hover:bg-[#065b9b] text-white text-xs font-medium transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
              <a
                href={ADDITIONAL_WA}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                aria-label={`WhatsApp additional number ${additionalPhone}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-medium transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

