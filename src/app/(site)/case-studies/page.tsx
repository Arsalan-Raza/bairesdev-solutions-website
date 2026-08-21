import type { Metadata } from "next";
import Image from "next/image";
import { PageShell, PageHeader, CtaBand } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Case Studies | Measured Enterprise Outcomes",
  description: "Selected engagements: +38% conversion for Nordwell Retail, -94% quote time for Meridian Assurance, real-time logistics for 9,000 vehicles, and more.",
  alternates: { canonical: "https://www.bairesdevsolution.com/case-studies" },
  keywords: ["software development case studies", "enterprise engineering results", "digital transformation examples", "software ROI proof", "tech consulting case studies"],
  openGraph: { title: "Case Studies | BairesDev Solutions", description: "Proof, with numbers: how our clients grew, modernised and scaled.", url: "https://www.bairesdevsolution.com/case-studies" },
};

const featured = {
  client: "Nordwell Retail Group", sector: "Retail · 14 markets",
  title: "Replatforming 2,400 stores onto a composable commerce core",
  body: "Eighteen months, zero downtime, one weekend cutover per market. We carved the monolith into catalog, pricing, checkout and fulfilment services behind stable contracts, then migrated market by market while trading continued.",
  image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2000",
  stats: [["+38%", "conversion rate"], ["-61%", "median page load"], ["11x", "peak capacity"], ["€44M", "incremental revenue"]],
};

const studies = [
  { client: "Meridian Assurance", sector: "Insurance", title: "AI underwriting assistant cutting quote time from 6 days to 4 hours", detail: "A retrieval system over 30 years of policy documents, with human-in-the-loop review and full decision audit trails.", stats: [["-94%", "quote turnaround"], ["82%", "documents auto-classified"]], image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=1400" },
  { client: "Vantis Logistics", sector: "Logistics", title: "A real-time control plane for 9,000 vehicles", detail: "Telemetry ingestion, route optimisation and an operations console replacing four legacy tools and a wall of spreadsheets.", stats: [["-17%", "fuel cost"], ["+22%", "on-time delivery"]], image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1400" },
  { client: "Aurelia Health", sector: "Healthcare", title: "Patient engagement platform across 62 clinics", detail: "HIPAA-aligned scheduling, messaging and records access, delivered as a native app plus a clinician web console.", stats: [["4.8★", "app store rating"], ["-31%", "no-show rate"]], image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1400" },
  { client: "Halden Industrial", sector: "Manufacturing", title: "CRM consolidation across five acquired businesses", detail: "One governed customer record, migrated from five CRMs with lineage preserved and sales automation rebuilt on top.", stats: [["5 → 1", "CRM instances"], ["+27%", "sales productivity"]], image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1400" },
];

const testimonials = [
  ["\u201cOur peak weekend used to be a war room. This year it was a dashboard nobody had to watch.\u201d", "VP Digital — Nordwell Retail Group"],
  ["\u201cThey shipped an AI system our regulator approved on first review. I still don\u2019t know how.\u201d", "Chief Underwriter — Meridian Assurance"],
];

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Selected Work"
        title={<>Evidence,<br />not <span className="font-bold text-primary italic">adjectives.</span></>}
        lead="Each engagement below is reported with the metric the client's board actually cared about."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="border-b border-border/10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[24rem]">
            <Image src={featured.image} alt={featured.client} fill className="object-cover grayscale" unoptimized />
            <div className="absolute inset-0 bg-primary/10" />
          </div>
          <div className="flex flex-col justify-center bg-foreground px-8 py-20 text-background lg:px-16">
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">{featured.client} · {featured.sector}</span>
            <h2 className="mt-6 font-display text-3xl font-bold leading-tight md:text-4xl">{featured.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-background/70">{featured.body}</p>
            <dl className="mt-12 grid grid-cols-2 gap-8">
              {featured.stats.map(([v, l]) => (
                <div key={l}>
                  <dd className="font-display text-3xl font-bold text-primary">{v}</dd>
                  <dt className="mt-2 text-[11px] tracking-[0.2em] text-background/60 uppercase">{l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {studies.map((s) => (
            <article key={s.client} className="group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={s.image} alt={s.client} fill loading="lazy" className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" unoptimized />
              </div>
              <span className="mt-8 block text-xs font-bold tracking-[0.3em] text-primary uppercase">{s.client} · {s.sector}</span>
              <h3 className="mt-4 font-display text-2xl leading-snug font-bold text-foreground">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.detail}</p>
              <dl className="mt-8 flex gap-12 border-t border-border/40 pt-6">
                {s.stats.map(([v, l]) => (
                  <div key={l}>
                    <dd className="font-display text-2xl font-bold text-foreground">{v}</dd>
                    <dt className="mt-1 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">{l}</dt>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-12">
          {testimonials.map(([q, a], i) => (
            <figure key={String(a)} className={i === 1 ? "lg:mt-24" : ""}>
              <blockquote className="font-display text-xl leading-snug font-light text-foreground md:text-3xl">{q}</blockquote>
              <figcaption className="mt-8 text-xs font-bold tracking-[0.3em] text-primary uppercase">{a}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaBand title="The next case study could carry your name." body="Share the outcome you need and we'll show you comparable work in confidence." />
    </PageShell>
  );
}
