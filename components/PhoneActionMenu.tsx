"use client";

import React, { useState, useRef, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";

interface PhoneActionMenuProps {
  phoneNumber?: string;
  className?: string;
  triggerClassName?: string;
  iconClassName?: string;
  showIcon?: boolean;
  position?: "top" | "bottom";
  align?: "left" | "right";
  children?: React.ReactNode;
}

const DEFAULT_PHONE = "+91 75449 90585";
const TEL_LINK = "tel:+917544990585";
const WA_PHONE = "917544990585";
const WA_MESSAGE =
  "Hello Arogya Bandhan Foundation, I would like to know more about your social welfare initiatives.";
const WA_LINK = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MESSAGE)}`;

export default function PhoneActionMenu({
  phoneNumber = DEFAULT_PHONE,
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
        aria-label={`Contact options for ${phoneNumber}`}
        className={`focus:outline-none cursor-pointer select-none transition-all ${triggerClassName}`}
      >
        {children ? (
          children
        ) : (
          <span className="flex items-center gap-1.5">
            {showIcon && <Phone className={iconClassName} />}
            <span>{phoneNumber}</span>
          </span>
        )}
      </button>

      {/* Contact Options Popup / Dropdown */}
      <div
        role="menu"
        aria-orientation="vertical"
        aria-hidden={!isOpen}
        aria-label="Contact options"
        className={`absolute z-50 min-w-[230px] p-2 bg-white rounded-2xl shadow-xl border border-slate-200/90 text-slate-800 transition-all duration-200 ease-out ${
          position === "top" ? "bottom-full mb-2" : "top-full mt-2"
        } ${align === "right" ? "right-0" : "left-0"} ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto visible"
            : "opacity-0 scale-95 pointer-events-none invisible"
        }`}
      >
        {/* Header */}
        <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Contact Options
          </span>
          <span className="text-xs font-bold text-[#17324D] block truncate">
            {phoneNumber}
          </span>
        </div>

        <div className="space-y-1">
          {/* 1. Call Now */}
          <a
            href={TEL_LINK}
            role="menuitem"
            aria-label="Call Arogya Bandhan Foundation"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 text-[#17324D] hover:text-[#087F5B] transition-colors group text-xs font-medium"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-[#087F5B] flex items-center justify-center shrink-0 group-hover:bg-[#087F5B] group-hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="font-bold block leading-tight text-[#17324D] group-hover:text-[#087F5B]">
                Call Now
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                +91 75449 90585
              </span>
            </div>
          </a>

          {/* 2. WhatsApp Message */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            aria-label="Message Arogya Bandhan Foundation on WhatsApp"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 text-[#17324D] hover:text-[#087F5B] transition-colors group text-xs font-medium"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="font-bold block leading-tight text-[#17324D] group-hover:text-[#087F5B]">
                WhatsApp Message
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                Chat on WhatsApp
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
