import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title:       "Privacy Policy",
  description: "How BetaMind Technology Limited collects, uses and protects personal information, and your rights under the Nigeria Data Protection Act 2023.",
  alternates:  { canonical: "/privacy" },
};

const UPDATED = "27 October 2026";

export default function PrivacyPage() {
  const email = siteConfig.email;
  return (
    <LegalPage
      label="Legal"
      title="Privacy Policy"
      updated={UPDATED}
      intro="This policy explains what personal information we collect through this website, how we use it, and the rights you have over it."
    >
      <h2>1. Who we are</h2>
      <p>
        This website is operated by <strong>BetaMind Technology Limited</strong> (&ldquo;Betamind&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a company
        registered with the Corporate Affairs Commission (CAC) in Nigeria, with our head office in Abuja. We are the data
        controller for personal information collected through this website. We handle personal information in line with the{" "}
        <strong>Nigeria Data Protection Act 2023</strong> (NDPA).
      </p>
      <p>Questions about this policy or your data: <a href={`mailto:${email}`}>{email}</a>.</p>

      <h2>2. Information we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li><strong>Contact form:</strong> your name, email address, and optionally your company, phone number, the service you are interested in, your budget range and your message.</li>
        <li><strong>Newsletter sign-up:</strong> your email address.</li>
        <li><strong>Email and WhatsApp:</strong> whatever you choose to send us when you contact us directly.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Server logs:</strong> our hosting provider, Vercel, automatically processes technical information such as your IP
          address, browser type and the pages requested, to deliver the website and keep it secure.
        </li>
        <li>
          <strong>Preferences stored on your device:</strong> we save your cookie choice and your light/dark theme in your browser&rsquo;s
          local storage. See our <Link href="/cookies">Cookie Policy</Link>.
        </li>
      </ul>
      <p>
        We do <strong>not</strong> use analytics, advertising or tracking tools on this website, and we do not build profiles of
        visitors.
      </p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>To reply to your enquiry, prepare proposals and quotes, and deliver services you ask for.</li>
        <li>To send our newsletter, only if you subscribed. Every newsletter includes a way to unsubscribe.</li>
        <li>To keep the website secure, prevent abuse and fix problems.</li>
        <li>To meet legal, accounting and regulatory obligations.</li>
      </ul>
      <p>
        Our lawful bases are: your <strong>consent</strong> (newsletter), steps taken at your request before entering into a
        <strong> contract</strong> (enquiries and quotes), our <strong>legitimate interests</strong> in running and securing the
        website, and <strong>legal obligations</strong>.
      </p>

      <h2>4. Sharing your information</h2>
      <p>We do not sell or rent your personal information. We share it only with:</p>
      <ul>
        <li><strong>Service providers</strong> who help us run the website and our business, such as our hosting provider (Vercel), the form delivery service that emails contact-form and newsletter submissions to our inbox (FormSubmit), and our email provider, under appropriate confidentiality and data protection terms.</li>
        <li><strong>Authorities</strong> where the law requires it.</li>
      </ul>
      <p>
        If you contact us on <strong>WhatsApp</strong>, your conversation is also handled under WhatsApp&rsquo;s own terms and privacy
        policy. Links to Google Maps or Calendly take you to those services, whose own policies apply.
      </p>

      <h2>5. International transfers</h2>
      <p>
        Our hosting and some service providers may store or process information on servers outside Nigeria. Where this happens we
        rely on safeguards recognised under the NDPA, such as the provider&rsquo;s contractual data protection commitments.
      </p>

      <h2>6. How long we keep it</h2>
      <ul>
        <li><strong>Enquiries:</strong> up to 2 years after our last contact, unless they lead to a project.</li>
        <li><strong>Client project records:</strong> as long as needed for the project and our legal and accounting obligations.</li>
        <li><strong>Newsletter:</strong> until you unsubscribe.</li>
      </ul>

      <h2>7. Your rights</h2>
      <p>Under the NDPA you have the right to:</p>
      <ul>
        <li>be informed about how your data is used, and get a copy of the personal information we hold about you;</li>
        <li>have inaccurate information corrected, and have your information deleted where there is no reason to keep it;</li>
        <li>object to or restrict certain uses, and receive your data in a portable format;</li>
        <li>withdraw consent at any time (for example, by unsubscribing from the newsletter);</li>
        <li>complain to the <strong>Nigeria Data Protection Commission (NDPC)</strong>.</li>
      </ul>
      <p>To use any of these rights, email <a href={`mailto:${email}`}>{email}</a>. We will reply within 30 days.</p>

      <h2>8. Security</h2>
      <p>
        The website is served only over encrypted HTTPS, and we limit access to personal information to the people who need it.
        No method of transmission or storage is completely secure, but we work to protect your information and will act promptly
        if a breach occurs.
      </p>

      <h2>9. Children</h2>
      <p>This website is aimed at businesses and is not directed at children. We do not knowingly collect information from children.</p>

      <h2>10. Changes to this policy</h2>
      <p>We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top shows when it last changed.</p>
    </LegalPage>
  );
}
