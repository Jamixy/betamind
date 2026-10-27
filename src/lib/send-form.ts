import { siteConfig } from "@/config/site.config";

/**
 * Emails a form submission to the site's inbox (siteConfig.email) via FormSubmit (formsubmit.co).
 * No account or API key: the first submission sends a one-time activation email to that inbox,
 * and submissions are delivered once the link in it is clicked.
 * Throws if the submission was not accepted, so callers never report a false "sent".
 */
export async function sendForm(subject: string, fields: Record<string, string | undefined>, replyTo?: string) {
  const body: Record<string, string> = {
    _subject:  subject,
    _template: "table",
    _captcha:  "false",
  };
  if (replyTo) body._replyto = replyTo;
  for (const [k, v] of Object.entries(fields)) if (v && v.trim()) body[k] = v.trim();

  const res = await fetch(`https://formsubmit.co/ajax/${siteConfig.email}`, {
    method:  "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body:    JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || String(data.success) !== "true") {
    throw new Error(typeof data.message === "string" ? data.message : `Form service error (${res.status})`);
  }
}
