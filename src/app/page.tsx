import type { Metadata } from "next";
import { Hero }            from "@/components/home/hero";
import { Stats }           from "@/components/home/stats";
import { ServicesPreview } from "@/components/home/services-preview";
import { PortfolioPreview }from "@/components/home/portfolio-preview";
import { Process }         from "@/components/home/process";
import { Testimonials }    from "@/components/home/testimonials";
import { CTASection }      from "@/components/home/cta-section";
import { Newsletter }      from "@/components/home/newsletter";
import { SITE_CONFIG }     from "@/lib/constants";

export const metadata: Metadata = {
  title:       `${SITE_CONFIG.name} — Premium Digital Agency`,
  description: SITE_CONFIG.description,
  alternates:  { canonical: "/" },
};

/**
 * Homepage — server component.
 * Client interactivity is encapsulated in individual section components.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesPreview />
      <PortfolioPreview />
      <Process />
      <Testimonials />
      <CTASection />
      <Newsletter />
    </>
  );
}
