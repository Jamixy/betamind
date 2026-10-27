import type { Metadata } from "next";
import { CaseStudiesClient } from "@/components/case-studies/case-studies-client";

export const metadata: Metadata = {
  title:      "Case Studies",
  description: "Deep-dive case studies on how Betamind Technology has helped businesses achieve measurable growth through custom digital solutions.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
