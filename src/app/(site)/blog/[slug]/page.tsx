import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const revalidate = 60;

type Args = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "posts",
      where: {
        slug: { equals: slug },
        status: { equals: "published" },
      },
      depth: 2,
      limit: 1,
    });
    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      limit: 100,
    });
    return result.docs.map((post: any) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
    },
  };
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000";

export default async function BlogPostPage({ params }: Args) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const coverUrl =
    typeof post.coverImage === "object" && post.coverImage?.url
      ? post.coverImage.url
      : FALLBACK_IMAGE;

  const authorName =
    typeof post.author === "object" && post.author?.name
      ? post.author.name
      : "";

  const authorTitle =
    typeof post.author === "object" && post.author?.title
      ? post.author.title
      : "";

  const categoryName =
    typeof post.category === "object" && post.category?.name
      ? post.category.name
      : "";

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <SiteNav />
      <main className="flex-grow pt-24">

        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <Image
            src={coverUrl}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-4xl px-6 pb-16 lg:px-12">
              {categoryName && (
                <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
                  {categoryName}
                </span>
              )}
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Meta */}
        <div className="border-b border-border/40">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-6 lg:px-12">
            <div className="flex items-center gap-4">
              {typeof post.author === "object" && post.author?.avatar &&
               typeof post.author.avatar === "object" && post.author.avatar?.url && (
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={post.author.avatar.url} alt={authorName} fill className="object-cover" unoptimized />
                </div>
              )}
              <div>
                {authorName && <p className="text-sm font-bold text-foreground">{authorName}</p>}
                {authorTitle && <p className="text-xs text-muted-foreground">{authorTitle}</p>}
              </div>
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
              {post.readTime && <span>{post.readTime} read</span>}
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="mx-auto max-w-4xl px-6 py-16 lg:px-12">
          {post.excerpt && (
            <p className="mb-12 text-xl leading-relaxed text-muted-foreground border-l-4 border-primary pl-6">
              {post.excerpt}
            </p>
          )}
          <div className="prose prose-lg prose-invert max-w-none
            prose-headings:font-display prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-code:text-primary prose-code:bg-muted/40 prose-code:px-1 prose-code:py-0.5
            prose-blockquote:border-primary prose-blockquote:text-muted-foreground
            prose-ul:text-muted-foreground prose-ol:text-muted-foreground">
            {post.content && <RichText data={post.content} />}
          </div>
        </article>

        {/* Back link */}
        <div className="mx-auto max-w-4xl border-t border-border/40 px-6 py-12 lg:px-12">
          <Link
            href="/blog"
            className="text-xs font-bold tracking-[0.3em] text-primary uppercase hover:text-primary/80 transition-colors"
          >
            ← Back to Insights
          </Link>
        </div>

      </main>
      <SiteFooter />
    </div>
  );
}
