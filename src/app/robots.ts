import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * robots.txt — allow all crawlers, point to sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow:     "/",
        disallow:  ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap:  `${SITE_CONFIG.url}/sitemap.xml`,
    host:     SITE_CONFIG.url,
  };
}
