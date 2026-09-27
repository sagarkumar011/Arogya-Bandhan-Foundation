import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arogya-bandhan-foundation-2.onrender.com";

  // Core static public routes
  const staticRoutes = [
    "",
    "/about",
    "/programs",
    "/campaigns",
    "/events",
    "/gallery",
    "/blog",
    "/donate",
    "/volunteer",
    "/transparency",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/donate" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1.0 : route === "/donate" || route === "/programs" ? 0.9 : 0.8,
  }));

  // Fetch dynamic content URLs safely
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const [campaigns, programs, blogs] = await Promise.all([
      prisma.campaign.findMany({
        where: { status: "ACTIVE" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.program.findMany({
        where: { status: "ACTIVE" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.blogPost.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    const campaignUrls = campaigns.map((c) => ({
      url: `${siteUrl}/campaigns/${c.slug}`,
      lastModified: c.updatedAt || new Date(),
      changeFrequency: "daily" as const,
      priority: 0.85,
    }));

    const programUrls = programs.map((p) => ({
      url: `${siteUrl}/programs/${p.slug}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

    const blogUrls = blogs.map((b) => ({
      url: `${siteUrl}/blog/${b.slug}`,
      lastModified: b.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    dynamicRoutes = [...campaignUrls, ...programUrls, ...blogUrls];
  } catch (err) {
    console.error("Error generating dynamic sitemap routes:", err);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
