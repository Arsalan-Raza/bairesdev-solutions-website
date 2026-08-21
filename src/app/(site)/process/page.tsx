import type { Metadata } from "next";
import { PageShell, PageHeader, CtaBand } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Process | How We Deliver Enterprise Software",
  description: "Discovery, architecture, build, hardening and partnership — the five phases behind every BairesDev Solutions engagement. Fixed cadence, no surprises.",
  alternates: { canonical: "https://www.bairesdevsolution.com/process" },
  keywords: ["software development process", "agile software delivery", "enterprise project methodology", "software engineering engagement model"],
  openGraph: { title: "Process | BairesDev Solutions", description: "A delivery model designed to remove surprises, not to generate documents.", url: "https://www.bairesdevsolution.com/process" },
};

const phases = [
  { n: "01", t: "Discovery", d: "Two weeks with your stakeholders, your data and your incidents. We leave with a scoped problem statement, a risk register and a costed plan.", out: ["Problem statement", "Risk register", "Costed roadmap"], w: "Weeks 1–2" },
  { n: "02", t: "Architecture", d: "Decisions recorded before code exists: boundaries, data contracts, security model, non-functional targets and the migration path.", out: ["Architecture decision records", "Threat model", "SLO targets"], w: "Weeks 3–4" },
  { n: "03", t: "Build", d: "Two-week increments, always shippable. Demos with working software, never slides. Scope moves; the release date does not.", out: ["Fortnightly releases", "Live demo environment", "Burn-up transparency"], w: "Weeks 5–N" },
  { n: "04", t: "Hardening", d: "Load, chaos, penetration and accessibility testing against agreed thresholds, plus runbooks and on-call rehearsal before cutover.", out: ["Load & pen test reports", "Runbooks", "Cutover rehearsal"], w: "Pre-launch" },
  { n: "05", t: "Partnership", d: "Post-launch we measure the outcome we promised, tune it, and transfer ownership to your team on a schedule you set.", out: ["Outcome reporting", "Enablement programme", "Clean handover"], w: "Ongoing" },
];

const cadence = [
  ["Daily", "Async written stand-up in your channel"],
  ["Weekly", "Working demo and decision log"],
  ["Fortnightly", "Production release"],
  ["Quarterly", "Outcome and roadmap review"],
];

const faqs = [
  ["How quickly can a team start?", "Typically 10–15 working days from signature for a full squad; faster for staff extension."],
  ["Who owns the intellectual property?", "You do, unconditionally, from the first commit. Repositories live in your organisation."],
  ["What if the scope changes mid-flight?", "It always does. Scope is traded inside a fixed cadence and budget, with impact stated in writing before anything moves."],
  ["Do you work with our existing engineers?", "Most engagements are blended. Our teams adopt your rituals, standards and review culture."],
  ["How do you price?", "Time and materials for product squads, fixed price for defined outcomes. No hidden change-request economy."],
];

export default function ProcessPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Delivery Model"
        title={<>No surprises.<br />That is the whole <span className="font-bold text-primary italic">method.</span></>}
        lead="Five phases, explicit exit criteria, and a client who always knows what happens next week."
        image="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[7px] w-px bg-border lg:left-1/2" />
          <div className="space-y-20">
            {phases.map((p, i) => (
              <div key={p.n} className="relative grid grid-cols-1 gap-8 pl-10 lg:grid-cols-2 lg:gap-20 lg:pl-0">
                <span className="absolute top-2 left-0 h-4 w-4 rounded-full bg-primary lg:left-1/2 lg:-translate-x-1/2" />
                <div className={i % 2 === 0 ? "lg:pr-20 lg:text-right" : "lg:order-2 lg:pl-20"}>
                  <span className="font-display text-5xl font-bold text-primary/20 md:text-7xl">{p.n}</span>
                  <h2 className="mt-2 font-display text-2xl font-bold text-foreground md:text-4xl">{p.t}</h2>
                  <p className="mt-2 text-xs font-bold tracking-[0.3em] text-primary uppercase">{p.w}</p>
                </div>
                <div className={i % 2 === 0 ? "lg:pl-20" : "lg:order-1 lg:pr-20 lg:text-right"}>
                  <p className="text-lg leading-relaxed text-muted-foreground">{p.d}</p>
                  <ul className="mt-6 space-y-2">
                    {p.out.map((o) => <li key={o} className="text-sm tracking-wide text-foreground/80">{o}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/10 bg-muted/40 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-4 lg:px-12">
          {cadence.map(([k, v]) => (
            <div key={k}>
              <h3 className="font-display text-xl font-bold text-primary">{k}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 lg:py-32">
        <h2 className="font-display text-3xl font-light text-foreground md:text-4xl">Questions we&apos;re always asked.</h2>
        <div className="mt-12 divide-y divide-border/40 border-y border-border/40">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-6">
              <summary className="flex cursor-pointer items-center justify-between gap-8 font-display text-lg font-bold text-foreground list-none">
                {q}
                <span className="text-primary transition-transform group-open:rotate-45 shrink-0">+</span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand title="Start with discovery. Decide about everything else afterwards." body="Two weeks, a fixed fee, and a plan you own whether or not you continue with us." action="START DISCOVERY" />
    </PageShell>
  );
}
