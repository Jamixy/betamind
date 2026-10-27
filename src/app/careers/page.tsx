import type { Metadata } from "next";
import { CareersClient } from "@/components/careers/careers-client";

export const metadata: Metadata = {
  title:      "Careers",
  description: "Join the Betamind Technology team. We're hiring remote-first engineers, designers, and strategists who love building great products.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return <CareersClient />;
}
