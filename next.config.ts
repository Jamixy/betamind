import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization for external domains
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
    ],
    formats: ["image/avif", "image/webp"],
    // In local dev the browser loads images directly: this machine's network blocks the dev
    // server from fetching remote images (TLS certificate error). Production still optimizes.
    unoptimized: process.env.NODE_ENV !== "production",
  },

  // Compression
  compress: true,

  // Power headers for security & performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",            value: "DENY" },
          { key: "X-XSS-Protection",           value: "1; mode=block" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // Redirect www to non-www (production)
  async redirects() {
    return [];
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
