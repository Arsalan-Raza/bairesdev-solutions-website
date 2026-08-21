import type { Metadata } from "next";
import Image from "next/image";
import { PageShell, PageHeader, CtaBand } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Solutions | Business Outcomes Engineered End-to-End",
  description: "Packaged enterprise solutions for commerce growth, customer intelligence, legacy modernisation and applied AI — with KPIs agreed before we start.",
  alternates: { canonical: "https://www.bairesdevsolution.com/solutions" },
  keywords: ["enterprise software solutions", "commerce growth platform", "legacy modernisation", "customer data platform", "AI systems integration"],
  openGraph: { title: "Solutions | BairesDev Solutions", description: "Outcome-led solutions: commerce, CRM intelligence, modernisation and AI.", url: "https://www.bairesdevsolution.com/solutions" },
};

const solutions = [
  { k: "Commerce Growth Engine", problem: "Traffic grows, revenue doesn't.", answer: "A composable storefront, an instrumented checkout and a merchandising layer your marketers can actually operate.", kpis: [["+38%", "conversion rate"], ["-61%", "page load time"], ["11x", "peak traffic headroom"]] },
  { k: "Customer Intelligence Platform", problem: "Five systems, five versions of the truth.", answer: "A governed customer data spine feeding CRM, support and marketing, with lineage and access control from day one.", kpis: [["1", "customer record"], ["+27%", "sales productivity"], ["94%", "data completeness"]] },
  { k: "Legacy Modernisation", problem: "The core system is the bottleneck.", answer: "Strangler-fig migration: carve capabilities out of the monolith behind stable contracts, with zero-downtime cutovers.", kpis: [["0", "hours downtime"], ["-44%", "run cost"], ["6x", "release frequency"]] },
  { k: "Applied AI Systems", problem: "Pilots that never reach production.", answer: "Retrieval, agents and forecasting shipped with evaluation harnesses, cost ceilings and human-in-the-loop controls.", kpis: [["82%", "manual work removed"], ["<400ms", "p95 inference"], ["100%", "audited outputs"]] },
];

const assurances = [
  ["Architecture record", "Every significant decision documented, versioned and handed over."],
  ["Security by default", "Threat modelling, SSO, least-privilege access and audit trails."],
  ["Observability", "Tracing, alerting and SLOs configured before launch, not after."],
  ["Knowledge transfer", "Your team can run it without us. That is the definition of done."],
];

export default function SolutionsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Solutions"
        title={<>We sell outcomes.<br />The <span className="font-bold text-primary italic">software</span> is how we get there.</>}
        lead="Four solution architectures, refined across hundreds of enterprise engagements and adapted to your constraints."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <div className="space-y-px bg-border/40">
          {solutions.map((s, i) => (
            <div key={s.k} className="group grid grid-cols-1 gap-8 bg-background p-8 transition-colors hover:bg-muted/40 lg:grid-cols-12 lg:gap-12 lg:p-12">
              <div className="lg:col-span-1">
                <span className="font-display text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="lg:col-span-4">
                <h2 className="font-display text-2xl font-bold leading-tight text-foreground md:text-3xl">{s.k}</h2>
                <p className="mt-4 text-sm tracking-wide text-primary italic">{s.problem}</p>
              </div>
              <div className="lg:col-span-4">
                <p className="text-lg leading-relaxed text-muted-foreground">{s.answer}</p>
              </div>
              <div className="lg:col-span-3">
                <dl className="space-y-4">
                  {s.kpis.map(([v, l]) => (
                    <div key={l} className="flex items-baseline justify-between border-b border-border/40 pb-2">
                      <dt className="text-xs tracking-widest text-muted-foreground uppercase">{l}</dt>
                      <dd className="font-display text-xl font-bold text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2000" alt="Enterprise operations" fill className="h-[60vh] w-full object-cover grayscale" unoptimized />
        <div className="relative h-[60vh] flex items-center bg-background/70">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
            <blockquote className="max-w-3xl font-display text-2xl leading-snug font-light text-foreground md:text-4xl">
              &ldquo;They replaced a decade-old platform underneath a live business without a single
              minute of downtime. That is not a vendor. That is an engineering partner.&rdquo;
            </blockquote>
            <p className="mt-8 text-xs font-bold tracking-[0.3em] text-primary uppercase">CTO — Global Logistics Group</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <h2 className="font-display text-3xl font-light leading-tight text-foreground md:text-4xl">What every solution ships with.</h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-2">
            {assurances.map(([t, d]) => (
              <div key={t} className="border-t border-primary pt-6">
                <h3 className="font-display text-lg font-bold text-foreground">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Bring us the constraint everyone else called impossible." body="We'll map the solution architecture and the first 90 days in a single workshop." action="BOOK A WORKSHOP" />
    </PageShell>
  );
}
