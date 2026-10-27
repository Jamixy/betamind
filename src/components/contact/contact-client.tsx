"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Calendar, Send, CheckCircle, ArrowRight, Clock } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { sendForm } from "@/lib/send-form";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { WhatsAppPicker } from "@/components/ui/whatsapp-picker";

const schema = z.object({
  name:     z.string().min(2, "Name must be at least 2 characters"),
  email:    z.string().email("Please enter a valid email address"),
  company:  z.string().optional(),
  service:  z.string().optional(),
  budget:   z.string().optional(),
  message:  z.string().min(20, "Message must be at least 20 characters"),
  honeypot: z.string().max(0).optional(),
});
type FormValues = z.infer<typeof schema>;

const SERVICES_LIST = [
  "WordPress Development","Shopify Development","Custom Web Application",
  "School Management System","SEO","AI Integration","Cloud Solutions",
  "Business Automation","Website Maintenance","Other",
];
const BUDGETS = ["Under $1,000","$1,000–$5,000","$5,000–$15,000","$15,000–$50,000","$50,000+","Not sure yet"];

const INFO = [
  { icon: Mail,    label: "Email",    value: siteConfig.email,   href: `mailto:${siteConfig.email}` },
  { icon: MapPin,  label: "Locations", value: siteConfig.addresses.map(a => a.label).join(" · "), href: null },
  { icon: Clock,   label: "Response", value: "Within 24 hours",  href: null },
];

export function ContactClient() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    if (data.honeypot) return;
    try {
      await sendForm(`New website enquiry from ${data.name}`, {
        Name: data.name, Email: data.email, Company: data.company,
        Service: data.service, Budget: data.budget, Message: data.message,
      }, data.email);
      setSent(true); reset();
      toast.success("Message sent! We'll reply within 24 hours.");
    } catch {
      toast.error(`Sorry, your message couldn't be sent. Please email ${siteConfig.email} or chat with us on WhatsApp.`);
    }
  };

  return (
    <>
      {/* hero */}
      <section className="relative pt-32 pb-20 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />
        <div className="container-custom relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <p className="section-label mb-4">Contact</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--fg)] leading-[1.02] mb-6">
              Let&apos;s build something<br /><span className="relative inline-block"><span className="gradient-underline">together.</span></span>
            </h1>
            <p className="text-lg text-[var(--muted-fg)] max-w-xl">
              Tell us about your project and we&apos;ll get back to you within 24 hours with a tailored response — no generic templates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* content */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* left */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-black text-[var(--fg)] tracking-tight mb-2">Get in touch</h2>
              <p className="text-sm text-[var(--muted-fg)] leading-relaxed mb-6">
                Whether you have a detailed brief or just an idea — reach out. We&apos;ll help you figure out the best path forward.
              </p>

              {INFO.map(item => (
                <div key={item.label} className="flex items-center gap-3.5 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[#FA5A02]/30 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-[var(--brand-tint)] flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-[#FA5A02]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted-fg)]">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium text-[var(--fg)] hover:text-[#FA5A02] transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-sm font-medium text-[var(--fg)]">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="space-y-2.5 pt-2">
                <WhatsAppPicker message="Hi Betamind!"
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors group">
                  <WhatsAppIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-emerald-800">Chat on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600 ml-auto" />
                </WhatsAppPicker>
                <a href={siteConfig.calendarUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-[var(--brand-tint-border)] bg-[var(--brand-tint)] hover:bg-[#FFE3D1] transition-colors group">
                  <Calendar className="w-5 h-5 text-[#FA5A02] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-[#D94A00]">Book a Discovery Call</span>
                  <ArrowRight className="w-4 h-4 text-[#FA5A02] ml-auto" />
                </a>
              </div>
            </div>

            {/* form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .55, delay: .15 }}
              className="lg:col-span-3">
              <div className="card p-7 lg:p-9">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-14 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                      <CheckCircle className="w-7 h-7 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-black text-[var(--fg)] mb-2">Message sent!</h3>
                    <p className="text-[var(--muted-fg)] text-sm mb-6">We&apos;ll reply within 24 hours. Check your inbox.</p>
                    <button onClick={() => setSent(false)} className="btn-secondary text-sm">Send another message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <input {...register("honeypot")} type="text" className="sr-only" tabIndex={-1} aria-hidden />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Full Name *" error={errors.name?.message}>
                        <input {...register("name")} placeholder="Alex Johnson" className={inputCls(!!errors.name)} />
                      </Field>
                      <Field label="Email *" error={errors.email?.message}>
                        <input {...register("email")} type="email" placeholder="alex@company.com" className={inputCls(!!errors.email)} />
                      </Field>
                    </div>
                    <Field label="Company">
                      <input {...register("company")} placeholder="Your Company" className={inputCls(false)} />
                    </Field>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Service">
                        <select {...register("service")} className={inputCls(false)}>
                          <option value="">Select a service…</option>
                          {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </Field>
                      <Field label="Budget">
                        <select {...register("budget")} className={inputCls(false)}>
                          <option value="">Select range…</option>
                          {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </Field>
                    </div>
                    <Field label="Project Details *" error={errors.message?.message}>
                      <textarea {...register("message")} rows={5}
                        placeholder="Tell us about your project — goals, features, timeline…"
                        className={cn(inputCls(!!errors.message), "resize-none")} />
                    </Field>
                    <button type="submit" disabled={isSubmitting}
                      className="btn-primary w-full justify-center text-[15px] py-3.5 disabled:opacity-60">
                      {isSubmitting ? <span className="spinner" aria-label="Sending" /> : <><Send className="w-4 h-4" /> Send Message <ArrowRight className="w-4 h-4" /></>}
                    </button>
                    <p className="text-xs text-center text-[var(--muted-fg)]">
                      By submitting you agree to our <a href="/privacy" className="text-[#FA5A02] hover:underline">Privacy Policy</a>.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

function inputCls(err: boolean) {
  return cn("input text-sm", err && "border-red-400 focus:border-red-400 focus:ring-red-400/15");
}
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12.5px] font-semibold text-[var(--fg)] mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-[11.5px] text-red-500">{error}</p>}
    </div>
  );
}
