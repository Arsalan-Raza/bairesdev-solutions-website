import type { Metadata } from "next";
import { PageShell, PageHeader, CtaBand } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Our Team | BairesDev Solutions",
  description: "Meet the experts behind BairesDev Solutions — Zoho, Shopify, GoHighLevel, UI/UX, and CMS specialists driving results for global clients.",
  alternates: { canonical: "https://www.bairesdevsolution.com/team" },
  keywords: ["BairesDev Solutions team", "Shopify experts", "Zoho developer", "GoHighLevel expert", "software development team"],
  openGraph: {
    title: "Our Team | BairesDev Solutions",
    description: "Meet the specialists behind BairesDev Solutions — Zoho, Shopify, GoHighLevel, UI/UX, and CMS experts.",
    url: "https://www.bairesdevsolution.com/team",
  },
};

const team = [
  {
    name: "Hammad Safader",
    role: "Founder",
    skills: ["Zoho Developer", "Zoho One", "Zoho CRM", "AI Call Agent", "Partner / Zoho Expert"],
    initials: "HS",
    color: "from-cyan-500/20 to-cyan-500/5",
    accent: "bg-cyan-500",
  },
  {
    name: "Arslan Raza",
    role: "Co-Founder",
    skills: ["Shopify Expert", "Shopify Plus", "Shopify B2B & Wholesale", "App Development"],
    initials: "AR",
    color: "from-violet-500/20 to-violet-500/5",
    accent: "bg-violet-500",
  },
  {
    name: "Ayesha Sardar",
    role: "Lead Developer",
    skills: ["Shopify Expert", "Shopify Designer", "Shopify Developer", "Shopify B2B"],
    initials: "AS",
    color: "from-rose-500/20 to-rose-500/5",
    accent: "bg-rose-500",
  },
  {
    name: "Muhammad Bilal",
    role: "UI/UX Lead",
    skills: ["Creative UI/UX Designer", "Web Design", "Mobile Design", "Design Systems"],
    initials: "MB",
    color: "from-amber-500/20 to-amber-500/5",
    accent: "bg-amber-500",
  },
  {
    name: "Masood A.",
    role: "GoHighLevel Expert",
    skills: ["GHL Websites", "GHL AI Automation", "Funnel Builder", "CRM Workflows"],
    initials: "MA",
    color: "from-emerald-500/20 to-emerald-500/5",
    accent: "bg-emerald-500",
  },
  {
    name: "Fatima H.",
    role: "CMS Developer",
    skills: ["WordPress Developer", "Shopify Expert", "Shopify Themes", "CMS Architecture"],
    initials: "FH",
    color: "from-pink-500/20 to-pink-500/5",
    accent: "bg-pink-500",
  },
  {
    name: "Aziz UR Rehman",
    role: "Shopify Developer",
    skills: ["Shopify Expert", "Shopify Designer", "Shopify Developer", "Shopify Store Setup"],
    initials: "AZ",
    color: "from-indigo-500/20 to-indigo-500/5",
    accent: "bg-indigo-500",
  },
];

export default function TeamPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Our Team"
        title={<>The experts<br /><span className="font-bold text-primary italic">behind the results.</span></>}
        lead="A focused team of senior specialists across Shopify, Zoho, GoHighLevel, UI/UX, and CMS — each bringing deep platform expertise to every engagement."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
      />

      {/* Team grid */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="group relative overflow-hidden border border-border/40 bg-card p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Avatar */}
                <div className={`relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${member.color} ring-2 ring-border/20`}>
                  <span className="font-display text-2xl font-bold text-foreground">
                    {member.initials}
                  </span>
                  <div className={`absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full ${member.accent} ring-2 ring-background`} />
                </div>

                {/* Info */}
                <h3 className="font-display text-xl font-bold text-foreground">{member.name}</h3>
                <p className={`mt-1 text-xs font-bold tracking-[0.2em] uppercase`} style={{ color: "hsl(var(--primary))" }}>
                  {member.role}
                </p>

                {/* Skills */}
                <ul className="mt-6 space-y-2">
                  {member.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className={`h-1 w-1 flex-shrink-0 rounded-full ${member.accent}`} />
                      {skill}
                    </li>
                  ))}
                </ul>

                {/* Hover accent line */}
                <div className={`absolute bottom-0 left-0 h-0.5 w-0 ${member.accent} transition-all duration-300 group-hover:w-full`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Work with our team"
        sub="Tell us what you're building and we'll match you with the right specialists."
        cta="Start a conversation"
        href="/contact"
      />
    </PageShell>
  );
}
