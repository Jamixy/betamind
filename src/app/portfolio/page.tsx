import type { Metadata } from "next";
import { PortfolioClient } from "@/components/portfolio/portfolio-client";

export const metadata: Metadata = {
  title:      "Portfolio",
  description: "Explore our portfolio of 130+ projects — custom web apps, Shopify stores, WordPress sites, AI integrations, and more. Real results for real businesses.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
