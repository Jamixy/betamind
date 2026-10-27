import type { Metadata } from "next";
import { AboutHero }    from "@/components/about/about-hero";
import { MissionVision }from "@/components/about/mission-vision";
import { CoreValues }   from "@/components/about/core-values";
import { TeamSection }  from "@/components/about/team-section";
import { WhyBetamind }  from "@/components/about/why-betamind";
import { CTASection }   from "@/components/home/cta-section";

export const metadata: Metadata = {
  title:      "About Us",
  description: "Learn about Betamind Technology — our story, mission, values, and the team behind the premium digital products we build for businesses worldwide.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <CoreValues />
      <TeamSection />
      <WhyBetamind />
      <CTASection />
    </>
  );
}
