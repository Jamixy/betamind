import type { Metadata } from "next";
import { FAQClient } from "@/components/faq/faq-client";

export const metadata: Metadata = {
  title:      "FAQ",
  description: "Answers to the most common questions about working with Betamind Technology — process, pricing, timelines, ownership, and more.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return <FAQClient />;
}
