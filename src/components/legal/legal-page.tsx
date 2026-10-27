import Link from "next/link";

/** Shared layout for the Privacy, Terms and Cookie pages. */
export function LegalPage({ label, title, updated, intro, children }: {
  label: string;
  title: string;
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="relative pt-32 pb-14 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />
        <div className="container-custom relative max-w-3xl">
          <p className="section-label mb-4">{label}</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--fg)] leading-[1.05] mb-4">{title}</h1>
          <p className="text-[var(--muted-fg)] text-lg leading-relaxed mb-3">{intro}</p>
          <p className="text-sm text-[var(--muted-fg)]">Last updated: {updated}</p>
        </div>
      </section>

      <section className="py-14 bg-[var(--bg)]">
        <div className="container-custom max-w-3xl legal-prose">
          {children}
          <hr />
          <p className="text-sm">
            See also our <Link href="/privacy">Privacy Policy</Link>, <Link href="/terms">Terms of Service</Link> and{" "}
            <Link href="/cookies">Cookie Policy</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
