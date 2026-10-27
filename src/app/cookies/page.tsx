import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title:       "Cookie Policy",
  description: "What the BetaMind Technology Limited website stores on your device. No tracking or advertising cookies.",
  alternates:  { canonical: "/cookies" },
};

const UPDATED = "27 October 2026";

export default function CookiesPage() {
  const email = siteConfig.email;
  return (
    <LegalPage
      label="Legal"
      title="Cookie Policy"
      updated={UPDATED}
      intro="Short version: this website does not use tracking, analytics or advertising cookies. It only remembers two preferences on your device."
    >
      <h2>1. What we store</h2>
      <p>
        Cookies and similar technologies (such as your browser&rsquo;s local storage) let a website remember information on your
        device. This website stores only the following, and only in your browser:
      </p>
      <table>
        <thead>
          <tr><th>Name</th><th>What it does</th><th>How long</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>betamind_cookie_consent</code></td>
            <td>Remembers whether you accepted or declined the cookie notice, so it isn&rsquo;t shown again.</td>
            <td>Until you clear your browser data</td>
          </tr>
          <tr>
            <td><code>theme</code></td>
            <td>Remembers whether you chose light or dark mode.</td>
            <td>Until you clear your browser data</td>
          </tr>
        </tbody>
      </table>
      <p>
        These are needed for the site to work the way you expect, are never sent to us, and are not used to identify or track you.
      </p>

      <h2>2. What we don&rsquo;t use</h2>
      <p>
        We do <strong>not</strong> use analytics tools (such as Google Analytics), advertising or retargeting pixels, or social media
        tracking on this website. If we ever add them, we will update this policy and ask for your consent first.
      </p>

      <h2>3. Third-party services</h2>
      <p>
        When you click through to <strong>WhatsApp</strong>, <strong>Google Maps</strong>, <strong>Calendly</strong> or a client&rsquo;s
        website, those services may set their own cookies under their own policies. Nothing from them is loaded on our pages until
        you choose to visit them.
      </p>

      <h2>4. Managing your choices</h2>
      <p>
        You can clear the stored preferences at any time through your browser settings (clear site data or browsing data for this
        site). The cookie notice will then appear again on your next visit.
      </p>

      <h2>5. More information</h2>
      <p>
        See our <Link href="/privacy">Privacy Policy</Link> for how we handle personal information, or email{" "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
    </LegalPage>
  );
}
