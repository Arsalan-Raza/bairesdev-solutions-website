import type { Metadata } from "next";
import Image from "next/image";
import { PageShell, PageHeader, CtaBand } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Careers | Build Systems That Outlive the Hype",
  description: "Open roles for senior engineers, architects, designers and AI specialists at BairesDev Solutions. Remote-first, top-quartile pay, 94% annual retention.",
  alternates: { canonical: "https://www.bairesdevsolution.com/careers" },
  keywords: ["software engineering jobs", "senior engineer remote jobs", "software architect positions", "AI engineer careers", "remote engineering jobs"],
  openGraph: { title: "Careers | BairesDev Solutions", description: "Senior-only teams, real ownership, and craft treated as a discipline.", url: "https://www.bairesdevsolution.com/careers" },
};

const roles = [
  ["Principal Platform Engineer", "Engineering", "Remote · EU / LATAM", "Full-time"],
  ["Senior React / TypeScript Engineer", "Engineering", "Remote · Global", "Full-time"],
  ["Staff Machine Learning Engineer", "Intelligence", "Remote · Global", "Full-time"],
  ["Mobile Engineer (iOS)", "Engineering", "Hybrid · Lisbon", "Full-time"],
  ["Solution Architect — Commerce", "Architecture", "Hybrid · London", "Full-time"],
  ["Senior Product Designer", "Design", "Remote · EU", "Full-time"],
  ["Delivery Lead", "Delivery", "Hybrid · New York", "Full-time"],
  ["Data Engineer", "Data", "Remote · LATAM", "Contract"],
];

const cultureStats = [["94%", "annual retention"], ["12", "countries"], ["6%", "of revenue on learning"], ["1:6", "lead to engineer ratio"]];

const benefits = [
  ["Remote-first, genuinely", "Async by default, with quarterly on-sites we pay for."],
  ["Senior compensation", "Benchmarked to the top quartile of your market, reviewed twice a year."],
  ["Protected focus", "Meeting-light weeks and a hard limit on context switching."],
  ["Learning budget", "Conferences, certifications and a week a quarter for deep work."],
  ["Real equipment", "Your choice of machine, screens and desk setup, replaced on a cycle."],
  ["Health & time", "Private cover, 30 days leave, and a sabbatical at five years."],
];

const hiringSteps = [
  ["01", "Conversation", "45 minutes with the hiring lead. No screening scripts."],
  ["02", "Craft session", "A realistic problem, discussed live. No take-home marathons."],
  ["03", "Team fit", "Meet the people you'd actually work beside."],
  ["04", "Offer", "Within five working days of the final session."],
];

export default function CareersPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Careers"
        title={<>Craft is not a perk.<br />It is the <span className="font-bold text-primary italic">job description.</span></>}
        lead="We hire senior people, give them ownership, and protect the conditions that let good engineering happen."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="aspect-[16/11] overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=1600" alt="Engineers collaborating" fill loading="lazy" className="object-cover grayscale transition-all duration-700 hover:grayscale-0" unoptimized />
            </div>
          </div>
          <div className="flex flex-col justify-center lg:col-span-5">
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">A studio culture inside an enterprise practice.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Small teams. Direct client contact. Decisions made by the people who will maintain them. No layers of translation between the problem and the engineer solving it.</p>
            <dl className="mt-12 grid grid-cols-2 gap-8">
              {cultureStats.map(([v, l]) => (
                <div key={l}>
                  <dd className="font-display text-2xl font-bold text-primary md:text-3xl">{v}</dd>
                  <dt className="mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">{l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-foreground py-24 text-background lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <h2 className="font-display text-3xl font-light leading-tight md:text-4xl">What we actually provide.</h2>
            <div className="grid grid-cols-1 gap-px bg-background/20 sm:grid-cols-2 lg:col-span-2">
              {benefits.map(([t, d]) => (
                <div key={t} className="bg-foreground p-8">
                  <h3 className="font-display text-lg font-bold">{t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-background/70">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-light text-foreground md:text-5xl">Open roles</h2>
          <p className="text-sm text-muted-foreground">Nothing fits? Write to us at <a href="mailto:careers@bairesdev.solutions" className="text-primary hover:underline">careers@bairesdev.solutions</a></p>
        </div>
        <div className="mt-12 border-t border-border/40">
          {roles.map(([title, team, loc, type]) => (
            <a key={title} href="/contact" className="group grid grid-cols-1 gap-4 border-b border-border/40 py-7 transition-colors hover:bg-muted/40 md:grid-cols-12 md:items-center md:px-4">
              <span className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary md:col-span-5">{title}</span>
              <span className="text-sm text-muted-foreground md:col-span-2">{team}</span>
              <span className="text-sm text-muted-foreground md:col-span-3">{loc}</span>
              <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase md:col-span-2 md:text-right">{type}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-border/10 bg-muted/40 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-4 lg:px-12">
          {hiringSteps.map(([n, t, d]) => (
            <div key={n}>
              <span className="font-display text-xs font-bold text-primary">{n}</span>
              <h3 className="mt-2 font-display text-xl font-bold text-foreground">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand title="If you build things you'd be proud to maintain, we should talk." body="Send your work, not a template CV. We read everything." action="INTRODUCE YOURSELF" />
    </PageShell>
  );
}
