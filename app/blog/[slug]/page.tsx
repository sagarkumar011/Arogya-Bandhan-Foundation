import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Calendar, User, ArrowLeft, Share2, Tag, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findFirst({
    where: { OR: [{ slug: params.slug }, { id: params.slug }], isPublished: true },
  });
  if (!post) return { title: "Article Not Found" };
  return {
    title: `${post.seoTitle || post.title} | Arogya Bandhan Foundation`,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findFirst({
    where: { OR: [{ slug: params.slug }, { id: params.slug }], isPublished: true },
  });

  if (!post) notFound();

  const related = await prisma.blogPost.findMany({
    where: {
      category: post.category,
      id: { not: post.id },
      isPublished: true,
    },
    take: 3,
  });

  return (
    <div className="space-y-0 bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#087F5B] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-12 shadow-card border border-slate-100 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAF7F2] text-[#087F5B] border border-emerald-200">
              {post.category}
            </span>

            <h1 className="font-heading font-black text-2xl sm:text-4xl text-[#17324D] leading-tight">
              {post.title}
            </h1>

            {post.hindiTitle && (
              <p className="text-lg text-[#0877C9] font-medium">{post.hindiTitle}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-100 pb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#0877C9]" />
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#F58220]" />
                <span className="font-medium text-slate-700">{post.authorName}</span>
                <span className="text-slate-400">({post.authorRole})</span>
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-[340px] sm:h-[420px] rounded-2xl overflow-hidden shadow-soft">
            <Image
              src={post.featuredImage || "/images/program_medical.jpg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Article Excerpt */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border-l-4 border-[#087F5B] text-xs sm:text-sm font-medium text-emerald-900 leading-relaxed italic">
            "{post.excerpt}"
          </div>

          {/* Article Body */}
          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
            {post.content}
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              {post.tags.split(",").map((tag) => (
                <span
                  key={tag.trim()}
                  className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-16 space-y-6">
            <h3 className="font-heading font-bold text-xl text-[#17324D]">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="bg-white p-5 rounded-2xl shadow-soft hover:shadow-card border border-slate-100 space-y-3 block transition-all"
                >
                  <span className="text-[10px] font-bold uppercase text-[#087F5B]">
                    {rel.category}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-[#17324D] line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{rel.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
