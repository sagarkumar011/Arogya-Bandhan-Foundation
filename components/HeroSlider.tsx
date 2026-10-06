"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, Users, Sparkles, ArrowRight } from "lucide-react";
import QuickDonationModal from "./QuickDonationModal";

interface Slide {
  id: number;
  tag: string;
  heading: string;
  highlight: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  campaignCategory?: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    tag: "COMMUNITY SERVICE & SOCIAL WELFARE",
    heading: "Serving Humanity,",
    highlight: "Strengthening Communities",
    description:
      "Arogya Bandhan Foundation is dedicated to holistic social welfare, food security, education, women empowerment, mass marriage support, and community health camps across India.",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1920&auto=format&fit=crop",
    ctaText: "DONATE NOW",
    ctaLink: "/donate",
    secondaryCtaText: "JOIN AS A VOLUNTEER",
    secondaryCtaLink: "/volunteer",
  },
  {
    id: 2,
    tag: "FREE HEALTH CAMPS & EYE CARE",
    heading: "Healthcare Within Reach",
    highlight: "For Every Rural Family",
    description:
      "Bringing qualified doctors, free diagnostic screenings, cataract evaluations, and life-saving medicines directly to underserved village chaupals.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1920&auto=format&fit=crop",
    ctaText: "SUPPORT HEALTH CAMPS",
    ctaLink: "/campaigns",
    secondaryCtaText: "EXPLORE HEALTH CAMPS",
    secondaryCtaLink: "/programs/health-camps",
    campaignCategory: "Healthcare",
  },
  {
    id: 3,
    tag: "SAMUHIK VIVAH / MASS MARRIAGE",
    heading: "Supporting Families,",
    highlight: "Celebrating New Beginnings",
    description:
      "Helping economically weaker families celebrate their daughters' and sons' weddings with cultural dignity, bridal starter gifts, and zero debt burden.",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1920&auto=format&fit=crop",
    ctaText: "SUPPORT MASS MARRIAGE",
    ctaLink: "/donate",
    secondaryCtaText: "LEARN ABOUT SAMUHIK VIVAH",
    secondaryCtaLink: "/programs/mass-marriage",
    campaignCategory: "Mass Marriage",
  },
  {
    id: 4,
    tag: "ANNAPURNA FOOD DISTRIBUTION",
    heading: "Because No One Should",
    highlight: "Go To Sleep Hungry",
    description:
      "Distributing nutritious hot community meals to slum children and monthly dry ration kits to destitute elderly, widows, and daily-wage earners.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920&auto=format&fit=crop",
    ctaText: "FEED A FAMILY",
    ctaLink: "/donate",
    secondaryCtaText: "SUPPORT FOOD DRIVES",
    secondaryCtaLink: "/programs/food-drives",
    campaignCategory: "Food Distribution",
  },
  {
    id: 5,
    tag: "CHILD WELFARE & VIDYADAAN",
    heading: "Every Child Deserves",
    highlight: "A Brighter Opportunity",
    description:
      "Equipping first-generation rural learners with school bags, textbooks, stationery kits, and after-school remedial learning to prevent dropouts.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1920&auto=format&fit=crop",
    ctaText: "SUPPORT EDUCATION",
    ctaLink: "/donate",
    secondaryCtaText: "EXPLORE CHILD WELFARE",
    secondaryCtaLink: "/programs/child-education",
    campaignCategory: "Education",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <>
      <section
        className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#0B2F2A]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Image Slides */}
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === current ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 pointer-events-none scale-105"
            }`}
            style={{ transition: "opacity 1s ease-in-out, transform 8s ease-out" }}
          >
            <Image
              src={slide.image}
              alt={slide.heading}
              fill
              priority={idx === 0}
              className="object-cover object-center"
            />
            {/* Rich Double Gradient Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B2F2A]/95 via-[#0B2F2A]/80 to-transparent sm:to-[#0B2F2A]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2F2A] via-transparent to-black/30" />
          </div>
        ))}

        {/* Hero Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 w-full">
          <div className="max-w-2xl text-white space-y-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-wider animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
              <span>{SLIDES[current].tag}</span>
            </div>

            {/* Main Dynamic Heading */}
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              {SLIDES[current].heading}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-[#F58220]">
                {SLIDES[current].highlight}
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-xl">
              {SLIDES[current].description}
            </p>

            {/* CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setDonationModalOpen(true)}
                className="btn-accent px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-transform active:scale-95"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>{SLIDES[current].ctaText}</span>
              </button>

              <Link
                href={SLIDES[current].secondaryCtaLink}
                className="px-7 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 flex items-center justify-center gap-2 transition-all hover:border-white/40"
              >
                <span>{SLIDES[current].secondaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-[#F58220]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Slider Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm border border-white/20 transition-all hidden sm:flex items-center justify-center"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm border border-white/20 transition-all hidden sm:flex items-center justify-center"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators & Previews */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? "w-8 bg-[#F58220]" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              title={slide.tag}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Quick Donation Modal */}
      <QuickDonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />
    </>
  );
}
