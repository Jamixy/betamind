import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { PORTFOLIO_PROJECTS } from "@/lib/data/portfolio";
import { BLOG_POSTS }         from "@/lib/data/blog";
import { SERVICES }            from "@/lib/constants";

/**
 * Dynamic sitemap — covers all static routes + dynamic content.
 * Next.js 15 serialises this at build time (or ISR).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;
  const now  = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                          lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,               lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`,            lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/portfolio`,           lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/case-studies`,        lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/pricing`,             lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`,                lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${base}/industries`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/careers`,             lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/faq`,                 lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Service sub-pages
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url:             `${base}${s.href}`,
    lastModified:    now,
    changeFrequency: "monthly" as const,
    priority:        0.7,
  }));

  // Portfolio / case study pages
  const portfolioPages: MetadataRoute.Sitemap = PORTFOLIO_PROJECTS.map((p) => ({
    url:             `${base}/portfolio/${p.slug}`,
    lastModified:    now,
    changeFrequency: "monthly" as const,
    priority:        0.6,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = PORTFOLIO_PROJECTS.map((p) => ({
    url:             `${base}/case-studies/${p.slug}`,
    lastModified:    now,
    changeFrequency: "monthly" as const,
    priority:        0.6,
  }));

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url:             `${base}/blog/${p.slug}`,
    lastModified:    new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority:        0.6,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...portfolioPages,
    ...caseStudyPages,
    ...blogPages,
  ];
}
