import React from "react";
import prisma from "@/lib/prisma";
import StoryCard from "@/components/StoryCard";

export const metadata = {
  title: "Success Stories | Arogya Bandhan Foundation",
  description: "Read real stories of hope, health recovery, and community resilience made possible by Arogya Bandhan Foundation supporters.",
};

export const dynamic = "force-dynamic";

export default async function SuccessStoriesPage() {
  let stories: any[] = [];
  try {
    stories = await prisma.successStory.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("SuccessStoriesPage database query fallback:", error);
  }

  return (
    <div className="space-y-0">
      {/* Banner */}
      <section className="bg-[#0B2F2A] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
              Grassroots Impact
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Stories of Hope & Healing
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Every life we touch is a testament to what compassionate healthcare and community solidarity can accomplish together.
            </p>
          </div>
        </div>
      </section>

      {/* Stories list */}
      <section className="py-20 bg-slate-50 min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>
    </div>
  );
}
