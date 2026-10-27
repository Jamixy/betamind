import type { Metadata } from "next";
import { PricingClient } from "@/components/pricing/pricing-client";

export const metadata: Metadata = {
  title:      "Pricing",
  description: "Transparent, fixed-price project packages and monthly maintenance plans from Betamind Technology. No hidden fees, no surprises.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return <PricingClient />;
}
