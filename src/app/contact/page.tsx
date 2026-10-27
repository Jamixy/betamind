import type { Metadata } from "next";
import { ContactClient } from "@/components/contact/contact-client";

export const metadata: Metadata = {
  title:      "Contact Us",
  description: "Get in touch with Betamind Technology. Book a free consultation, send us a project brief, or just say hello. We reply within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
