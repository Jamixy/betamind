import type { Metadata } from "next";
import { ServicesHero }    from "@/components/services/services-hero";
import { ServicesGrid }    from "@/components/services/services-grid";
import { ServiceProcess }  from "@/components/services/service-process";
import { CTASection }      from "@/components/home/cta-section";

export const metadata: Metadata = {
  title:       "Services",
  description: "Full-service digital agency offering WordPress, Shopify, custom web apps, AI integration, SEO, cloud solutions, and more. Premium quality for businesses that demand results.",
  alternates:  { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ServiceProcess />
      <CTASection />
    </>
  );
}
