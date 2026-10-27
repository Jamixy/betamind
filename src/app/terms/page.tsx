import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title:       "Terms of Service",
  description: "The terms that apply when you use the BetaMind Technology Limited website.",
  alternates:  { canonical: "/terms" },
};

const UPDATED = "27 October 2026";

export default function TermsPage() {
  const email = siteConfig.email;
  return (
    <LegalPage
      label="Legal"
      title="Terms of Service"
      updated={UPDATED}
      intro="These terms apply to your use of this website. By using the site you agree to them."
    >
      <h2>1. About these terms</h2>
      <p>
        This website is operated by <strong>BetaMind Technology Limited</strong>, a company registered with the Corporate Affairs
        Commission (CAC) in Nigeria. These terms cover the website only. Any project or service we provide for you is governed by
        a <strong>separate written agreement or proposal</strong>, which takes priority over anything on this website.
      </p>

      <h2>2. Using the website</h2>
      <p>You may browse and use the website for lawful purposes. You must not:</p>
      <ul>
        <li>attempt to break, overload or gain unauthorised access to the website or its hosting;</li>
        <li>use the contact form or newsletter to send spam, malicious content or false information;</li>
        <li>copy the website&rsquo;s content or design for commercial use without our permission.</li>
      </ul>

      <h2>3. Information on the website</h2>
      <p>
        We work to keep the website accurate and up to date, but its content is general information about our company and
        services. Descriptions, timelines and prices shown are indicative and are <strong>not an offer</strong>; a project&rsquo;s
        scope, price and schedule are only fixed in a written proposal or agreement.
      </p>

      <h2>4. Portfolio and case studies</h2>
      <p>
        Projects in our portfolio are shown to illustrate our work. Names, logos and trademarks of clients and third parties belong
        to their respective owners. Screenshots may show demonstration or sample data rather than real customer information.
        Products we describe as pre-launch or in development may change before release.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        The website&rsquo;s text, design, graphics and the Betamind name and logo belong to BetaMind Technology Limited or are used
        with permission. Ownership of work we deliver for clients is set out in each client&rsquo;s agreement.
      </p>

      <h2>6. Third-party links and services</h2>
      <p>
        The website links to services we do not control, such as WhatsApp, Google Maps, Calendly and our clients&rsquo; websites.
        We are not responsible for their content or practices, and their own terms apply when you use them.
      </p>

      <h2>7. No warranties</h2>
      <p>
        The website is provided &ldquo;as is&rdquo;. We do not guarantee it will always be available, uninterrupted or free of errors.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the extent permitted by law, BetaMind Technology Limited is not liable for any indirect or consequential loss arising
        from your use of, or inability to use, this website. Nothing in these terms limits liability that cannot be limited under
        Nigerian law.
      </p>

      <h2>9. Privacy</h2>
      <p>
        How we handle personal information is explained in our <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/cookies">Cookie Policy</Link>.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These terms are governed by the laws of the <strong>Federal Republic of Nigeria</strong>, and the courts of Nigeria have
        jurisdiction over any dispute about them.
      </p>

      <h2>11. Changes and contact</h2>
      <p>
        We may update these terms; the date at the top shows the latest version. Questions:{" "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
    </LegalPage>
  );
}
