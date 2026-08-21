import type { Metadata } from "next";
import Image from "next/image";
import { PageShell, PageHeader, CtaBand } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Industries | Domain-Deep Engineering Teams",
  description: "Software engineering expertise across financial services, healthcare, retail, logistics, manufacturing and energy. 18 regulated markets, 340+ enterprise programmes.",
  alternates: { canonical: "https://www.bairesdevsolution.com/industries" },
  keywords: ["fintech software development", "healthcare software engineering", "retail technology solutions", "enterprise software industries", "regulated industry software"],
  openGraph: { title: "Industries | BairesDev Solutions", description: "Regulated, high-stakes environments where engineering rigour is non-negotiable.", url: "https://www.bairesdevsolution.com/industries" },
};

const industries = [
  { name: "Financial Services", span: "lg:col-span-7", h: "h-[26rem]", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600", note: "Core banking modernisation, payment orchestration, SOC 2 and PCI-DSS delivery." },
  { name: "Healthcare & Life Sciences", span: "lg:col-span-5", h: "h-[26rem]", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600", note: "HIPAA-aligned platforms, clinical data pipelines, patient engagement products." },
  { name: "Retail & Commerce", span: "lg:col-span-5", h: "h-[22rem]", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600", note: "Composable storefronts, OMS integration, peak-season resilience engineering." },
  { name: "Logistics & Mobility", span: "lg:col-span-7", h: "h-[22rem]", image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1600", note: "Route optimisation, real-time telemetry, warehouse and fleet control planes." },
  { name: "Manufacturing", span: "lg:col-span-6", h: "h-[22rem]", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600", note: "Industrial IoT, predictive maintenance, MES and ERP integration." },
  { name: "Energy & Utilities", span: "lg:col-span-6", h: "h-[22rem]", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1600", note: "Grid analytics, asset intelligence, regulatory reporting automation." },
];

const certifications = ["SOC 2 Type II", "ISO 27001", "HIPAA", "PCI-DSS", "GDPR", "WCAG 2.2 AA", "SOX", "NIST CSF"];
const numbersStrip = [["18", "regulated markets served"], ["340+", "enterprise programmes"], ["99.99%", "average platform uptime"], ["11 yrs", "longest client partnership"]];

export default function IndustriesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Industries"
        title={<>Context is the<br /><span className="font-bold text-primary italic">hardest dependency</span> to install.</>}
        lead="We staff engagements with people who already understand your regulators, your peak seasons and your failure modes."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {industries.map((ind) => (
            <article key={ind.name} className={`group relative overflow-hidden ${ind.span} ${ind.h}`}>
              <Image src={ind.image} alt={ind.name} fill loading="lazy" className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h2 className="font-display text-2xl font-bold text-background md:text-3xl">{ind.name}</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-background/0 transition-all duration-500 group-hover:text-background/80">{ind.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border/10 bg-muted/40 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Compliance is an engineering practice.</h2>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-4">
            {certifications.map((c) => (
              <div key={c} className="border-t border-border pt-4 text-sm font-bold tracking-wide text-foreground/80">{c}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="grid grid-cols-2 gap-12 lg:grid-cols-4">
          {numbersStrip.map(([v, l]) => (
            <div key={l}>
              <div className="font-display text-4xl font-bold text-primary md:text-6xl">{v}</div>
              <p className="mt-3 text-xs tracking-[0.2em] text-muted-foreground uppercase">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand title="Your industry has rules. We've already read them." body="Talk to an engineer with direct experience in your sector." />
    </PageShell>
  );
}
