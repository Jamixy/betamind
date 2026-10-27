import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { CTASection } from "@/components/home/cta-section";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICES.find(s => s.id === slug);
  if (!svc) return { title: "Service Not Found" };
  return { title: svc.title, description: svc.description, alternates: { canonical: `/services/${slug}` } };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const svc = SERVICES.find(s => s.id === slug);
  if (!svc) notFound();

  return (
    <>
      <section className="relative pt-32 pb-20 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />
        <div className="container-custom relative">
          <Link href="/services" className="inline-flex items-center gap-2 text-[var(--muted-fg)] hover:text-[var(--fg)] text-sm mb-10 group transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Services
          </Link>
          <div className="max-w-3xl">
            <span className="badge-brand mb-5">Service</span>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-[var(--fg)] leading-[1.02] mt-4 mb-6">{svc.title}</h1>
            <p className="text-lg text-[var(--muted-fg)] leading-relaxed">{svc.description}</p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--bg)]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-black text-[var(--fg)] tracking-tight mb-6">What&apos;s included</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {svc.benefits.map(b => (
                  <li key={b} className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                    <CheckCircle2 className="w-4 h-4 text-[#FA5A02] shrink-0 mt-0.5" />
                    <span className="text-sm text-[var(--fg)]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="card p-6">
                <h3 className="text-[15px] font-bold text-[var(--fg)] mb-2">Ready to get started?</h3>
                <p className="text-sm text-[var(--muted-fg)] mb-5 leading-relaxed">
                  Tell us about your project and we&apos;ll send a detailed proposal within 24 hours.
                </p>
                <Link href={`/contact?service=${encodeURIComponent(svc.title)}`} className="btn-primary w-full justify-center text-sm">
                  Request a quote <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="card p-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-3">Other Services</h3>
                <ul className="space-y-2">
                  {SERVICES.filter(s => s.id !== svc.id).slice(0,5).map(s => (
                    <li key={s.id}>
                      <Link href={s.href} className="text-sm text-[var(--muted-fg)] hover:text-[#FA5A02] transition-colors flex items-center gap-2 group">
                        <span className="w-1 h-1 rounded-full bg-[var(--border)] group-hover:bg-[#FA5A02] transition-colors" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
