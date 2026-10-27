import type { Metadata } from "next";
import { IndustriesClient } from "@/components/industries/industries-client";

export const metadata: Metadata = {
  title:      "Industries",
  description: "Betamind Technology serves businesses across 12+ industries including education, e-commerce, healthcare, finance, logistics, and more.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}
