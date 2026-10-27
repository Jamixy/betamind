import type { Metadata } from "next";
import { BlogClient } from "@/components/blog/blog-client";

export const metadata: Metadata = {
  title:      "Blog",
  description: "Insights, tutorials, and case studies on web development, AI, SEO, e-commerce, and digital strategy from the Betamind Technology team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return <BlogClient />;
}
