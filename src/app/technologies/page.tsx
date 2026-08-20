import type { Metadata } from "next";
import { PageShell, PageHeader, CtaBand } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Technologies | Our Engineering Stack & Standards",
  description: "The languages, platforms, data systems and AI tooling we use — and the principles that decide when we use them.",
  openGraph: { title: "Technologies | BairesDev Solutions", description: "A deliberately boring stack where it matters, and a sharp one where it counts." },
};

const layers = [
  { layer: "Experience", items: ["TypeScript", "React", "Next.js", "TanStack", "Swift", "Kotlin", "React Native", "Tailwind"] },
  { layer: "Services", items: ["Node.js", "Go", "Java / Kotlin", "Python", ".NET", "gRPC", "GraphQL", "Event streaming"] },
  { layer: "Data", items: ["PostgreSQL", "ClickHouse", "Kafka", "Snowflake", "dbt", "Redis", "Elasticsearch", "Airflow"] },
  { layer: "Intelligence", items: ["PyTorch", "LangGraph", "Vector search", "Feature stores", "Evaluation harnesses", "MLflow", "Triton", "Guardrails"] },
  { layer: "Platform", items: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "GitHub Actions", "OpenTelemetry", "Cloudflare"] },
];

const principles = [
  ["Optimise for the tenth year", "The cost of software is maintenance, not construction."],
  ["Boundaries over frameworks", "Contracts outlive libraries. Design the seams first."],
  ["Measure before you argue", "Benchmarks and traces settle debates that opinions cannot."],
  ["Own your exit", "No decision may leave a client unable to change vendor or cloud."],
];

const qualityBar = [
  ["85%+", "test coverage on core paths"],
  ["<15 min", "commit to production pipeline"],
  ["100%", "infrastructure as code"],
  ["Weekly", "dependency & CVE review"],
];

export default function TechnologiesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Engineering Stack"
        title={<>Boring where it matters.<br /><span className="font-bold text-primary italic">Sharp</span> where it counts.</>}
        lead="Technology choices are reversible decisions made once and lived with for a decade. We treat them accordingly."
        image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        {layers.map((l, i) => (
          <div key={l.layer} className="grid grid-cols-1 gap-8 border-t border-border/40 py-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <span className="font-display text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl">{l.layer}</h2>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-9">
              {l.items.map((it) => (
                <span key={it} className="border border-border px-5 py-2.5 text-sm tracking-wide text-foreground/80 transition-colors hover:border-primary hover:text-primary">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="border-t border-border/40" />
      </section>

      <section className="bg-foreground py-24 text-background lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-3xl font-light leading-tight md:text-5xl">Four rules that decide every stack argument.</h2>
            </div>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:col-span-8">
              {principles.map(([t, d]) => (
                <div key={t} className="border-t border-primary pt-6">
                  <h3 className="font-display text-xl font-bold">{t}</h3>
                  <p className="mt-3 text-background/70">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {qualityBar.map(([v, l]) => (
            <div key={l} className="border-l-2 border-primary pl-6">
              <div className="font-display text-3xl font-bold text-foreground md:text-4xl">{v}</div>
              <p className="mt-3 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand title="Bring us your architecture. We'll give you an honest second opinion." body="A technical review with two principal engineers, delivered as a written assessment." action="REQUEST A REVIEW" />
    </PageShell>
  );
}
