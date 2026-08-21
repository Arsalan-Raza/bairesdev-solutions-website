import type { Metadata } from "next";
import Image from "next/image";
import { PageShell, PageHeader, CtaBand } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Insights | Engineering Notes from the Field",
  description: "Essays and field notes on modernisation, applied AI, commerce architecture and engineering leadership.",
  openGraph: { title: "Insights | BairesDev Solutions", description: "Written by the engineers doing the work, not a content team." },
};

const lead = {
  cat: "Architecture", date: "12 Aug 2026", read: "11 min",
  title: "The strangler fig, honestly: what nobody tells you about carving up a monolith",
  excerpt: "Every modernisation deck shows the same diagram. Here is what actually happens in month seven, when the seams you chose turn out to be wrong and the business will not stop shipping features.",
  author: "Elena Márquez · Principal Architect",
  image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2000",
};

const posts = [
  { cat: "Applied AI", date: "29 Jul 2026", read: "8 min", title: "Evaluation harnesses are the product", excerpt: "Most AI pilots fail because nobody defined 'good'. A practical framework for evaluating LLM systems before they meet a customer.", author: "Tobias Renner", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1400" },
  { cat: "Commerce", date: "14 Jul 2026", read: "6 min", title: "Your checkout is a distributed system. Treat it like one.", excerpt: "Idempotency keys, saga boundaries and the three failure modes that cost retailers the most revenue during peak.", author: "Priya Raghavan", image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=1400" },
  { cat: "Leadership", date: "02 Jul 2026", read: "7 min", title: "How to buy engineering without buying headcount", excerpt: "A CTO's guide to structuring outcome-based contracts that keep incentives aligned after the honeymoon quarter.", author: "Marcus Feld", image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&q=80&w=1400" },
  { cat: "Data", date: "18 Jun 2026", read: "9 min", title: "One customer record: the eighteen-month version of the truth", excerpt: "What we learned consolidating five CRMs into a governed customer spine — including the migration we had to run twice.", author: "Sofia Lindqvist", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1400" },
  { cat: "Mobile", date: "03 Jun 2026", read: "5 min", title: "Offline-first is a product decision, not a technical one", excerpt: "Conflict resolution rules belong to the business. A short argument for writing them down before writing the sync layer.", author: "Daniel Okafor", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1400" },
];

const categories = ["All", "Architecture", "Applied AI", "Commerce", "Data", "Mobile", "Leadership"];

export default function BlogPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Insights"
        title={<>Field notes from<br /><span className="font-bold text-primary italic">inside</span> the engagements.</>}
        lead="No thought leadership. Just what we learned last quarter, written by the people who learned it."
        image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="border-b border-border/10">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-8 px-6 py-6 lg:px-12">
          {categories.map((c, i) => (
            <span key={c} className={`cursor-pointer text-xs font-bold tracking-[0.2em] uppercase transition-colors ${i === 0 ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {c}
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <article className="group grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={lead.image} alt={lead.title} fill className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" unoptimized />
            </div>
          </div>
          <div className="lg:col-span-5">
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">{lead.cat} · {lead.read}</span>
            <h2 className="mt-6 font-display text-3xl leading-tight font-bold text-foreground md:text-4xl">{lead.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{lead.excerpt}</p>
            <p className="mt-8 text-sm text-foreground/70">{lead.author} · {lead.date}</p>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12 lg:pb-32">
        <div className="border-t border-border/40">
          {posts.map((p) => (
            <article key={p.title} className="group grid grid-cols-1 gap-6 border-b border-border/40 py-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-3">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={p.image} alt={p.title} fill loading="lazy" className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0" unoptimized />
                </div>
              </div>
              <div className="md:col-span-7">
                <span className="text-[11px] font-bold tracking-[0.3em] text-primary uppercase">{p.cat}</span>
                <h3 className="mt-3 font-display text-2xl leading-snug font-bold text-foreground transition-colors group-hover:text-primary">{p.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{p.excerpt}</p>
              </div>
              <div className="text-sm text-muted-foreground md:col-span-2 md:text-right">
                <p className="text-foreground/70">{p.author}</p>
                <p className="mt-1">{p.date}</p>
                <p className="mt-1">{p.read}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border/10 bg-muted/40 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:px-12">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-4xl">One considered essay a month. Nothing else.</h2>
          <form className="flex flex-col gap-4 sm:flex-row">
            <input type="email" required placeholder="you@company.com" aria-label="Work email" className="flex-1 border border-border bg-background px-5 py-4 text-sm text-foreground outline-none focus:border-primary transition-colors" />
            <button type="submit" className="bg-primary px-8 py-4 text-xs font-bold tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90">SUBSCRIBE</button>
          </form>
        </div>
      </section>

      <CtaBand title="Reading is one thing. Building is another." body="Bring us the problem behind the article you just read." />
    </PageShell>
  );
}
