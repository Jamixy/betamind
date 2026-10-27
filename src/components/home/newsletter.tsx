"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail]       = useState("");
  const [done,  setDone]        = useState(false);
  const [busy,  setBusy]        = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    await new Promise(r => setTimeout(r, 900));
    setBusy(false);
    setDone(true);
    toast.success("You're subscribed!");
  };

  return (
    <section className="border-t border-[var(--border)] bg-[var(--muted)]">
      <div className="container-custom py-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-10 h-10 rounded-2xl bg-[var(--brand-tint)] flex items-center justify-center mx-auto mb-5">
            <Mail className="w-5 h-5 text-[#FA5A02]" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-[var(--fg)] mb-2">
            Stay ahead of the curve
          </h2>
          <p className="text-[var(--muted-fg)] mb-7 text-sm">
            Monthly insights on web dev, AI, SEO and digital strategy. No fluff. Join 2,000+ founders.
          </p>

          {done ? (
            <motion.div initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium text-sm">
              <CheckCircle className="w-4 h-4" /> You&apos;re subscribed!
            </motion.div>
          ) : (
            <form onSubmit={submit} className="flex gap-2 max-w-sm mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-fg)]" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input pl-9 text-sm" aria-label="Email address" />
              </div>
              <button type="submit" disabled={busy} className="btn-primary px-4 py-2.5 disabled:opacity-60">
                {busy ? <span className="spinner" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
          <p className="text-xs text-[var(--muted-fg)] mt-4">No spam. Unsubscribe any time.</p>
        </div>
      </div>
    </section>
  );
}
