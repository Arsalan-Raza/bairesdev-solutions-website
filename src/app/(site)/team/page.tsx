import type { Metadata } from "next";
import Image from "next/image";
import { PageShell, CtaBand } from "@/components/layout/PageShell";

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
    subtitle: "Founder · Zoho Developer · Partner / Zoho Expert · Zoho One · AI Call Agent",
    bio: "Leads BairesDev Solutions' strategic direction and Zoho ecosystem. Hammad specialises in designing and deploying enterprise CRM workflows, AI call agents, and Zoho One implementations that align business operations with client growth goals.",
    role: "Company leadership",
    focus: "Zoho & CRM systems",
    approach: "Partner-led delivery",
    tags: ["ZOHO DEVELOPER", "ZOHO ONE", "ZOHO CRM", "AI CALL AGENT", "PARTNER / EXPERT"],
    image: "/hammad.jpeg",
  },
  {
    name: "Arslan Raza",
    subtitle: "Co-Founder · Shopify Expert · Shopify Plus · B2B & Wholesale · Apps",
    bio: "Co-leads BairesDev Solutions and oversees Shopify engagements end to end. Arslan specialises in Shopify Plus, B2B and wholesale channel builds, and custom app development for high-growth brands seeking scalable commerce infrastructure.",
    role: "Technical co-leadership",
    focus: "Shopify & e-commerce",
    approach: "B2B-first builds",
    tags: ["SHOPIFY EXPERT", "SHOPIFY PLUS", "SHOPIFY B2B", "WHOLESALE", "APP DEVELOPMENT"],
    image: "/Arslan.jpg",
  },
  {
    name: "Ayesha Sardar",
    subtitle: "Lead Developer · Shopify Expert · Shopify Designer · Shopify B2B",
    bio: "Leads the Shopify development practice at BairesDev Solutions. Ayesha combines design sensibility with deep technical knowledge — building custom themes, liquid sections, and B2B storefronts that convert and delight across every device.",
    role: "Lead development",
    focus: "Shopify design & build",
    approach: "Detail-first execution",
    tags: ["SHOPIFY EXPERT", "SHOPIFY DESIGNER", "SHOPIFY DEVELOPER", "SHOPIFY B2B"],
    image: "/placeholder-female.png",
  },
  {
    name: "Muhammad Bilal",
    subtitle: "UI/UX Lead · Web Design · Mobile Design · Design Systems",
    bio: "Leads UI/UX design across web and mobile projects at BairesDev Solutions. Muhammad brings a meticulous eye for detail and a systematic approach to interface design — creating experiences that are both visually compelling and intuitive to use.",
    role: "Design leadership",
    focus: "Web & mobile UI/UX",
    approach: "User-centred craft",
    tags: ["UI/UX DESIGN", "WEB DESIGN", "MOBILE DESIGN", "DESIGN SYSTEMS", "CREATIVE DIRECTION"],
    image: "/placeholder-male.png",
  },
  {
    name: "Masood A.",
    subtitle: "GoHighLevel Expert · GHL Websites · AI Automation · Funnel Builder",
    bio: "Specialises in GoHighLevel platform builds — from website and landing page design to AI automation workflows and high-converting funnel architecture. Masood helps service businesses capture, nurture, and close more leads through intelligent automation.",
    role: "Automation specialist",
    focus: "GHL & funnels",
    approach: "Conversion-first systems",
    tags: ["GOHIGHLEVEL", "GHL WEBSITES", "AI AUTOMATION", "FUNNEL BUILDER", "CRM WORKFLOWS"],
    image: "/placeholder-male.png",
  },
  {
    name: "Fatima H.",
    subtitle: "CMS Developer · WordPress Developer · Shopify Expert · Shopify Themes",
    bio: "Builds and maintains CMS-powered websites across WordPress and Shopify. Fatima specialises in theme customisation, plugin integration, and delivering polished, high-performance Shopify storefronts and WordPress sites on time and to specification.",
    role: "CMS development",
    focus: "WordPress & Shopify",
    approach: "Theme-driven quality",
    tags: ["WORDPRESS DEVELOPER", "SHOPIFY EXPERT", "SHOPIFY THEMES", "CMS ARCHITECTURE"],
    image: "/placeholder-female.png",
  },
  {
    name: "Aziz UR Rehman",
    subtitle: "Shopify Expert · Shopify Designer · Shopify Developer · Store Setup",
    bio: "Focuses on Shopify store builds from concept through to launch — designing, developing, and optimising storefronts that reflect each brand's identity and drive measurable sales results for clients across a wide range of industries.",
    role: "Shopify development",
    focus: "Store design & build",
    approach: "Performance-led themes",
    tags: ["SHOPIFY EXPERT", "SHOPIFY DESIGNER", "SHOPIFY DEVELOPER", "STORE SETUP"],
    image: "/placeholder-male.png",
  },
];

export default function TeamPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="py-24 pt-40 lg:py-32 lg:pt-52">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <span className="mb-4 block text-xs font-bold tracking-[0.4em] text-primary uppercase">
            Our Team
          </span>
          <h1 className="font-display text-5xl font-bold leading-[1.1] md:text-7xl">
            The experts<br />
            <span className="text-primary italic">behind the results.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            A focused team of senior specialists across Shopify, Zoho, GoHighLevel, UI/UX, and CMS — each bringing deep platform expertise to every engagement.
          </p>
        </div>
      </section>

      {/* Team list */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="divide-y divide-border/40">
            {team.map((member, i) => (
              <div key={member.name} className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-[280px_1fr] lg:gap-16">
                {/* Photo */}
                <div className="relative h-[280px] w-[280px] flex-shrink-0 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {/* Number badge */}
                  <div className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center bg-foreground">
                    <span className="font-display text-xs font-bold text-background">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                    {member.name}
                  </h2>
                  <p className="mt-3 text-[11px] font-bold tracking-[0.25em] text-muted-foreground uppercase">
                    {member.subtitle}
                  </p>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>

                  {/* Meta grid */}
                  <div className="mt-8 grid grid-cols-1 divide-y divide-border/40 border border-border/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {[
                      { label: "Role", value: member.role },
                      { label: "Focus", value: member.focus },
                      { label: "Approach", value: member.approach },
                    ].map(({ label, value }) => (
                      <div key={label} className="px-6 py-5">
                        <p className="text-[10px] font-bold tracking-[0.25em] text-muted-foreground uppercase">
                          {label}
                        </p>
                        <p className="mt-2 font-display text-base font-bold text-foreground">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-border/60 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Work with our team"
        body="Tell us what you're building and we'll match you with the right specialists."
      />
    </PageShell>
  );
}
