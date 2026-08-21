import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageShell, PageHeader, CtaBand } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Services | BairesDev Solutions Engineering Disciplines",
  description: "Web, mobile, e-commerce, CRM, digital marketing and AI engineering delivered as outcome-driven enterprise services. Six disciplines, one accountable team.",
  alternates: { canonical: "https://www.bairesdevsolution.com/services" },
  keywords: ["software development services", "enterprise web engineering", "mobile app development", "AI machine learning services", "CRM implementation", "e-commerce development"],
  openGraph: { title: "Services | BairesDev Solutions", description: "Six engineering disciplines built around measurable business outcomes.", url: "https://www.bairesdevsolution.com/services" },
};

const disciplines = [
  { n: "01", title: "Web Engineering", outcome: "Revenue-grade digital platforms", body: "Design systems, headless architectures and performance budgets that turn a website into an operating surface for the business.", points: ["Design systems & component libraries", "Headless CMS architecture", "Core Web Vitals engineering"], image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1400" },
  { n: "02", title: "Mobile Product Engineering", outcome: "Apps rated above 4.7 in-store", body: "Native and cross-platform products engineered for retention, offline resilience and release velocity across large device matrices.", points: ["iOS, Android & React Native", "Offline-first data layers", "Release automation & QA"], image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1400" },
  { n: "03", title: "E-commerce Solutions", outcome: "Conversion lifts of 20–60%", body: "Composable commerce that survives peak traffic: catalog, checkout, payments, fulfilment and merchandising as independent services.", points: ["Composable commerce builds", "Checkout & payments optimisation", "Peak-season load engineering"], image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1400" },
  { n: "04", title: "CRM Solutions", outcome: "One trustworthy customer record", body: "Salesforce, HubSpot and custom CRM implementations wired into finance, support and product data with governed pipelines.", points: ["Migration & data governance", "Sales & service automation", "Bespoke CRM platforms"], image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1400" },
  { n: "05", title: "Digital Marketing", outcome: "Compounding pipeline, not spend", body: "Technical SEO, lifecycle marketing and attribution built by engineers, so growth decisions are made on data you can audit.", points: ["Technical SEO & content systems", "Lifecycle & CRM marketing", "Attribution & analytics"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1400" },
  { n: "06", title: "AI & Machine Learning", outcome: "Models in production, not slides", body: "Applied AI: retrieval systems, forecasting, document intelligence and agents — with evaluation, guardrails and cost control.", points: ["LLM & retrieval systems", "Forecasting & optimisation", "MLOps, evals & governance"], image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1400" },
];

const models = [
  { t: "Product Squad", d: "A cross-functional team — product, design, engineering, QA — owning a roadmap end to end.", m: "8–24 months" },
  { t: "Staff Extension", d: "Senior engineers embedded into your existing teams, working to your rituals and standards.", m: "3+ months" },
  { t: "Fixed Outcome", d: "A defined scope, a defined date, a defined price. Ideal for migrations and launches.", m: "6–16 weeks" },
];

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Capabilities"
        title={<>Six disciplines.<br />One <span className="font-bold text-primary italic">engineering standard.</span></>}
        lead="Every engagement is staffed by senior practitioners and measured against business outcomes agreed before the first sprint."
        image="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000"
      />

      <section>
        {disciplines.map((d, i) => (
          <article key={d.n} className={`border-b border-border/10 ${i % 2 === 1 ? "bg-muted/30" : ""}`}>
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-28">
              <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image src={d.image} alt={d.title} fill loading="lazy" className="object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0" unoptimized />
                  <span className="absolute top-0 left-0 bg-primary px-4 py-2 font-display text-sm font-bold text-primary-foreground">{d.n}</span>
                </div>
              </div>
              <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">{d.outcome}</span>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground md:text-5xl">{d.title}</h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{d.body}</p>
                <ul className="mt-8 grid gap-px border-t border-border/40">
                  {d.points.map((p) => (
                    <li key={p} className="border-b border-border/40 py-4 text-sm tracking-wide text-foreground/80">{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-foreground py-24 text-background lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 className="max-w-2xl font-display text-3xl font-light leading-tight md:text-5xl">Choose the shape of the partnership.</h2>
          <div className="mt-16 grid grid-cols-1 gap-px bg-background/20 md:grid-cols-3">
            {models.map((e) => (
              <div key={e.t} className="bg-foreground p-10">
                <h3 className="font-display text-2xl font-bold">{e.t}</h3>
                <p className="mt-4 text-background/70">{e.d}</p>
                <p className="mt-8 text-xs font-bold tracking-[0.3em] text-primary uppercase">{e.m}</p>
              </div>
            ))}
          </div>
          <Link href="/process" className="mt-12 inline-block border-b border-primary pb-1 text-xs font-bold tracking-[0.2em] text-primary">
            SEE HOW WE DELIVER
          </Link>
        </div>
      </section>

      <CtaBand title="Tell us the outcome. We'll design the engineering path to it." body="A 45-minute working session with a principal engineer — no sales deck, no obligation." />
    </PageShell>
  );
}
