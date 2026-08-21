import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { PageShell, PageHeader, CtaBand } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Insights | Engineering Notes from the Field",
  description: "Essays and field notes on legacy modernisation, applied AI, commerce architecture and engineering leadership — written by the engineers doing the work.",
  alternates: { canonical: "https://www.bairesdevsolution.com/blog" },
  keywords: ["software engineering blog", "enterprise technology insights", "AI engineering articles", "software architecture blog", "digital transformation blog"],
  openGraph: {
    title: "Insights | BairesDev Solutions",
    description: "Written by the engineers doing the work, not a content team.",
    url: "https://www.bairesdevsolution.com/blog",
  },
};

export const revalidate = 60;

async function getPosts() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      depth: 2,
    });
    return result.docs;
  } catch {
    return [];
  }
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getCoverUrl(post: any): string | null {
  const img = post.coverImage;
  if (!img) return null;
  if (typeof img === "object" && img.url) return img.url;
  return null;
}

function getCategoryName(post: any): string {
  const cat = post.category;
  if (!cat) return "";
  if (typeof cat === "object" && cat.name) return cat.name;
  return "";
}

function getAuthorName(post: any): string {
  const author = post.author;
  if (!author) return "";
  if (typeof author === "object" && author.name) return author.name;
  return "";
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000";

export default async function BlogPage() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Insights"
        title={<>Field notes from<br /><span className="font-bold text-primary italic">inside</span> the engagements.</>}
        lead="No thought leadership. Just what we learned last quarter, written by the people who learned it."
        image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000"
      />

      {posts.length === 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-32 text-center lg:px-12">
          <p className="text-muted-foreground text-lg">No posts published yet. Check back soon.</p>
        </section>
      ) : (
        <>
          {/* Featured post */}
          <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
            <Link href={`/blog/${lead.slug}`} className="group grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={getCoverUrl(lead) || FALLBACK_IMAGE}
                    alt={lead.title}
                    fill
                    className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    unoptimized
                  />
                </div>
              </div>
              <div className="lg:col-span-5">
                <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
                  {getCategoryName(lead)}{lead.readTime ? ` · ${lead.readTime}` : ""}
                </span>
                <h2 className="mt-6 font-display text-3xl leading-tight font-bold text-foreground md:text-4xl group-hover:text-primary transition-colors">
                  {lead.title}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{lead.excerpt}</p>
                <p className="mt-8 text-sm text-foreground/70">
                  {getAuthorName(lead)}{lead.publishedAt ? ` · ${formatDate(lead.publishedAt)}` : ""}
                </p>
              </div>
            </Link>
          </section>

          {/* Post list */}
          {rest.length > 0 && (
            <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12 lg:pb-32">
              <div className="border-t border-border/40">
                {rest.map((post: any) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group grid grid-cols-1 gap-6 border-b border-border/40 py-10 md:grid-cols-12 md:items-center"
                  >
                    <div className="md:col-span-3">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={getCoverUrl(post) || FALLBACK_IMAGE}
                          alt={post.title}
                          fill
                          loading="lazy"
                          className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                          unoptimized
                        />
                      </div>
                    </div>
                    <div className="md:col-span-7">
                      <span className="text-[11px] font-bold tracking-[0.3em] text-primary uppercase">
                        {getCategoryName(post)}
                      </span>
                      <h3 className="mt-3 font-display text-2xl leading-snug font-bold text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    </div>
                    <div className="text-sm text-muted-foreground md:col-span-2 md:text-right">
                      <p className="text-foreground/70">{getAuthorName(post)}</p>
                      <p className="mt-1">{formatDate(post.publishedAt)}</p>
                      {post.readTime && <p className="mt-1">{post.readTime}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <CtaBand title="Reading is one thing. Building is another." body="Bring us the problem behind the article you just read." />
    </PageShell>
  );
}
