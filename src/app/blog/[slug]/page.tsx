import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data/blog";
import { Newsletter } from "@/components/home/newsletter";
import { formatDate } from "@/lib/utils";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title, description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.publishedAt, images: [{ url: post.coverImage, width: 1200, height: 630 }] },
  };
}

const SAMPLE = `
Every modern business faces unique challenges when it comes to digital transformation. Understanding the core problem — before jumping to solutions — is what separates good digital teams from great ones.

## The Challenge

Businesses often invest in technology without a clear strategy, leading to systems that don't scale and products that don't resonate with users. The real challenge isn't building software — it's building the *right* software.

## Our Approach

At Betamind, we start every engagement with a discovery phase. This isn't just about gathering requirements; it's about deeply understanding the business context, the end users, and the constraints that will shape the solution.

## Key Takeaways

The most successful digital products share common traits: they solve a specific problem exceptionally well, they're built with the end user in mind, and they're engineered to scale with the business.

Investing in quality architecture at the start prevents exponentially larger costs down the line. Every shortcut in the planning phase becomes a constraint in the growth phase.

## Conclusion

If this article resonated with you, we'd love to discuss how these principles apply to your specific situation. Reach out for a free consultation — no obligations.
`;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) notFound();
  const related = BLOG_POSTS.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: post.title, description: post.excerpt,
    image: post.coverImage, datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* header */}
      <section className="pt-28 pb-0 bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="container-custom max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--muted-fg)] hover:text-[var(--fg)] text-sm mb-8 group transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
          </Link>
          <span className="badge-brand mb-5">{post.category}</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[var(--fg)] tracking-tight leading-[1.1] mt-4 mb-5">{post.title}</h1>
          <p className="text-lg text-[var(--muted-fg)] leading-relaxed mb-7">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-5 pb-8 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted-fg)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FA5A02] flex items-center justify-center text-white text-xs font-bold">
                {post.author.name[0]}
              </div>
              <div>
                <p className="text-[var(--fg)] font-semibold text-[13px]">{post.author.name}</p>
                <p className="text-[var(--muted-fg)] text-[11px]">{post.author.role}</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/>{formatDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* cover image */}
      <div className="relative h-72 md:h-[440px] w-full border-b border-[var(--border)]">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority sizes="100vw" />
      </div>

      {/* body */}
      <article className="bg-[var(--bg)]">
        <div className="container-custom max-w-3xl py-16">
          <div className="prose-custom space-y-5">
            {SAMPLE.trim().split("\n\n").map((block, i) => {
              if (block.startsWith("## "))
                return <h2 key={i} className="text-2xl font-black text-[var(--fg)] mt-10 mb-4 tracking-tight">{block.replace("## ","")}</h2>;
              return <p key={i} className="text-[15.5px] leading-[1.8] text-[var(--muted-fg)]">{block}</p>;
            })}
          </div>
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-[var(--border)]">
            {post.tags.map(t => <span key={t} className="tag">#{t}</span>)}
          </div>
        </div>
      </article>

      {/* related */}
      {related.length > 0 && (
        <section className="py-16 bg-[var(--muted)] border-t border-[var(--border)]">
          <div className="container-custom">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map(p => (
                <Link key={p.id} href={`/blog/${p.slug}`}
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden hover:border-[#FA5A02]/30 hover:shadow-[0_4px_16px_rgba(0,0,0,.07)] transition-all duration-200">
                  <div className="relative h-36">
                    <Image src={p.coverImage} alt={p.title} fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      sizes="(min-width:640px) 33vw,100vw" />
                  </div>
                  <div className="p-4">
                    <span className="badge-brand text-[11px] mb-2">{p.category}</span>
                    <h3 className="text-[13px] font-bold text-[var(--fg)] group-hover:text-[#FA5A02] transition-colors leading-snug mt-1.5 line-clamp-2 mb-1">{p.title}</h3>
                    <span className="text-[12px] font-semibold text-[#FA5A02] flex items-center gap-1">Read <ArrowRight className="w-3 h-3"/></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
    </>
  );
}
