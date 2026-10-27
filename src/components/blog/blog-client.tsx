"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, ArrowRight, Calendar } from "lucide-react";
import { Newsletter } from "@/components/home/newsletter";
import { BLOG_POSTS } from "@/lib/data/blog";
import { BLOG_CATEGORIES } from "@/lib/constants";
import { cn, formatDate } from "@/lib/utils";

export function BlogClient() {
  const [query, setQuery]       = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => BLOG_POSTS.filter(p => {
    const matchCat = category === "All" || p.category === category;
    const q = query.toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    return matchCat && matchQ;
  }), [query, category]);

  const featured = filtered.filter(p => p.featured);
  const rest     = filtered.filter(p => !p.featured);

  return (
    <>
      {/* hero */}
      <section className="relative pt-32 pb-20 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />
        <div className="container-custom relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <p className="section-label mb-4">Blog</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--fg)] leading-[1.02] mb-6">
              Insights for<br /><span className="relative inline-block"><span className="gradient-underline">digital leaders.</span></span>
            </h1>
            <p className="text-lg text-[var(--muted-fg)] max-w-xl mb-8">
              Deep dives on web development, AI, SEO, and digital strategy. Written by practitioners, not marketers.
            </p>
            {/* search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-fg)]" />
              <input type="search" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search articles…"
                className="input pl-10 text-sm" aria-label="Search" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* sticky category bar */}
      <div className="sticky top-16 z-40 bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="container-custom">
          <div className="flex gap-1 py-3 overflow-x-auto scrollbar-none" role="tablist">
            {BLOG_CATEGORIES.map(c => (
              <button key={c} role="tab" aria-selected={category === c} onClick={() => setCategory(c)}
                className={cn("px-3.5 py-1.5 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all duration-150",
                  category === c ? "bg-[#FA5A02] text-white" : "text-[var(--muted-fg)] hover:text-[var(--fg)] hover:bg-[var(--surface-2)]"
                )}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* posts */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--muted-fg)] mb-4">No articles found for &ldquo;{query}&rdquo;</p>
              <button onClick={() => { setQuery(""); setCategory("All"); }}
                className="btn-secondary text-sm">Clear search</button>
            </div>
          ) : (
            <>
              {featured.length > 0 && (
                <div className="mb-14">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-6">Featured</h2>
                  <motion.div layout className="grid lg:grid-cols-3 gap-5">
                    <AnimatePresence mode="popLayout">
                      {featured.map((post, i) => (
                        <motion.div key={post.id} layout
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className={i === 0 ? "lg:col-span-2" : ""}>
                          <BlogCard post={post} large={i === 0} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}
              {rest.length > 0 && (
                <div>
                  {featured.length > 0 && <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-6">More Articles</h2>}
                  <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <AnimatePresence mode="popLayout">
                      {rest.map(post => (
                        <motion.div key={post.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <BlogCard post={post} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Newsletter />
    </>
  );
}

function BlogCard({ post, large = false }: { post: typeof BLOG_POSTS[0]; large?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`}
      className="group flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden hover:border-[#FA5A02]/30 hover:shadow-[0_8px_32px_rgba(0,0,0,.07)] transition-all duration-300"
      aria-label={`Read ${post.title}`}>
      <div className={cn("relative overflow-hidden shrink-0", large ? "h-60" : "h-44")}>
        <Image src={post.coverImage} alt={post.title} fill
          className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
          sizes={large ? "(min-width:1024px) 66vw,100vw" : "(min-width:768px) 33vw,100vw"} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute top-3 left-3 badge-brand text-[11px]">{post.category}</span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 text-[11px] text-[var(--muted-fg)] mb-2.5">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.publishedAt, { month:"short", day:"numeric", year:"numeric" })}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border)]" aria-hidden />
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
        </div>
        <h3 className={cn("font-bold text-[var(--fg)] group-hover:text-[#FA5A02] transition-colors leading-snug mb-2 flex-1",
          large ? "text-xl" : "text-[14px]")}>
          {post.title}
        </h3>
        <p className="text-sm text-[var(--muted-fg)] line-clamp-2 leading-relaxed mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FA5A02] flex items-center justify-center text-white text-[10px] font-bold">
              {post.author.name[0]}
            </div>
            <span className="text-[11.5px] font-medium text-[var(--muted-fg)]">{post.author.name}</span>
          </div>
          <span className="text-[12px] font-semibold text-[#FA5A02] flex items-center gap-1 group-hover:gap-2 transition-all">
            Read <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
