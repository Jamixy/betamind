import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "404 — Page Not Found" };

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />
      <div className="relative text-center px-6">
        <p className="text-[130px] sm:text-[180px] font-black text-[var(--fg)] leading-none opacity-[.07] select-none" aria-hidden>404</p>
        <div className="-mt-10 sm:-mt-14">
          <h1 className="text-4xl sm:text-5xl font-black text-[var(--fg)] tracking-tight mb-4">Page not found</h1>
          <p className="text-[var(--muted-fg)] mb-10 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="btn-primary text-sm">Go home</Link>
            <Link href="/contact" className="btn-secondary text-sm">Contact us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
