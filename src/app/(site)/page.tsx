import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "BairesDev Solutions | Custom Software Development Company",
  description:
    "BairesDev Solutions builds custom software, AI systems, and digital products for global enterprises. 500+ engineers, 98% client retention, 12 global offices.",
  alternates: { canonical: "https://www.bairesdevsolution.com" },
  keywords: ["custom software development company", "enterprise software engineering", "AI development services", "digital transformation company", "software outsourcing"],
  openGraph: {
    title: "BairesDev Solutions | Custom Software Development Company",
    description: "Custom software, AI systems, and digital products for global enterprises. 500+ engineers, 98% client retention.",
    url: "https://www.bairesdevsolution.com",
  },
};

const services = [
  { title: "Web Intelligence", desc: "Enterprise-grade web platforms built for performance, security, and global scale.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
  { title: "Mobile Mastery", desc: "Seamless iOS and Android experiences that capture markets and drive engagement.", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" },
  { title: "AI & Neural Networks", desc: "Integrating predictive intelligence and machine learning into core business workflows.", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
  { title: "E-Commerce Strategy", desc: "Architecture designed to convert, scale, and provide frictionless user journeys.", img: "https://images.unsplash.com/photo-1556742049-63ff565c4976?auto=format&fit=crop&q=80&w=800" },
  { title: "CRM Ecosystems", desc: "Custom implementations that centralize intelligence and empower sales teams.", img: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800" },
  { title: "Digital Growth", desc: "Data-driven marketing strategies that align engineering with market demand.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
];

const stats = [
  { label: "ENGINEERS", value: "500+" },
  { label: "PROJECTS", value: "1.2K" },
  { label: "RETENTION", value: "98%" },
  { label: "GLOBAL OFFICES", value: "12" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans selection:bg-primary selection:text-primary-foreground">
      <SiteNav />
      <main>
        {/* ── Cinematic Hero ── */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
              alt="Premium workspace"
              fill
              priority
              className="object-cover opacity-20 grayscale"
              unoptimized
            />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
            <div className="max-w-4xl">
              <span className="mb-6 block text-sm font-bold tracking-[0.3em] text-primary uppercase animate-in fade-in slide-in-from-bottom-4 duration-700">
                Engineering Excellence
              </span>
              <h1 className="font-display text-5xl font-light leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Crafting{" "}
                <span className="font-bold text-primary italic">Digital Mastery</span>{" "}
                for Global Enterprises.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                We don&apos;t just build software. We architect growth, innovation, and long-term
                engineering partnerships that redefine industries.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
                <Link
                  href="/solutions"
                  className="flex items-center justify-center bg-primary px-10 py-5 text-sm font-bold tracking-widest text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/20"
                >
                  EXPLORE SOLUTIONS
                </Link>
                <Link
                  href="/case-studies"
                  className="flex items-center justify-center border border-border bg-transparent px-10 py-5 text-sm font-bold tracking-widest text-foreground transition-all hover:bg-foreground hover:text-background"
                >
                  VIEW SUCCESS STORIES
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Editorial Trust Section ── */}
        <section className="bg-foreground py-32 text-background lg:py-48">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
              <div className="relative aspect-[4/5] w-full overflow-hidden grayscale transition-all hover:grayscale-0">
                <Image
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200"
                  alt="Professional collaboration"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
                  Beyond the Code: A Legacy of Trust.
                </h2>
                <div className="mt-12 space-y-8 text-lg leading-relaxed text-muted/80 md:text-xl">
                  <p>
                    BairesDev Solutions was founded on a single principle: Engineering is not a
                    service, it&apos;s a strategic asset. We partner with Fortune 500 companies and
                    visionary leaders to solve the impossible.
                  </p>
                  <p>
                    Our approach integrates deep technical expertise with a profound understanding
                    of business growth. We build solutions that scale, evolve, and lead.
                  </p>
                  <div className="pt-8">
                    <Link
                      href="/about"
                      className="group flex items-center gap-4 text-sm font-bold tracking-[0.2em] text-primary transition-all"
                    >
                      THE BAIRESDEV STORY
                      <div className="h-[1px] w-12 bg-primary transition-all group-hover:w-20" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="py-32 lg:py-48">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-24 flex flex-col items-end text-right">
              <h2 className="font-display text-4xl font-light md:text-6xl">
                Business <span className="font-bold text-primary italic">Solutions</span>,
              </h2>
              <h3 className="mt-2 font-display text-3xl font-bold md:text-5xl">
                Not Just Features.
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="group relative aspect-square bg-background p-12 transition-all hover:bg-foreground"
                >
                  <div className="absolute inset-0 z-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-20">
                    <Image
                      src={service.img}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                  </div>
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold tracking-[0.3em] text-primary/60 group-hover:text-primary">
                        0{i + 1}
                      </span>
                      <h4 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground group-hover:text-background md:text-3xl">
                        {service.title}
                      </h4>
                    </div>
                    <p className="text-muted-foreground group-hover:text-muted/60">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="bg-muted/30 py-32 lg:py-48">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-4xl font-bold md:text-5xl">
                  Engineering by the <span className="text-primary italic">Numbers</span>.
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  Our impact is measured in the growth and stability of our clients. We deliver
                  excellence, consistently.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-16">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div className="font-display text-4xl font-bold tracking-tighter text-foreground md:text-5xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-[10px] font-bold tracking-[0.3em] text-primary uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="relative overflow-hidden bg-foreground py-32 lg:py-48">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute left-0 top-0 h-full w-[1px] bg-primary" />
            <div className="absolute right-0 top-0 h-full w-[1px] bg-primary" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-12">
            <h2 className="font-display text-4xl font-light text-background md:text-7xl lg:text-8xl">
              Ready to build <br />
              <span className="font-bold text-primary italic">Greatness?</span>
            </h2>
            <div className="mt-16 flex flex-col items-center justify-center gap-8 md:flex-row">
              <Link
                href="/contact"
                className="w-full bg-primary px-16 py-6 text-sm font-bold tracking-widest text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 md:w-auto"
              >
                START A PROJECT
              </Link>
              <Link
                href="/careers"
                className="w-full border border-border/30 bg-transparent px-16 py-6 text-sm font-bold tracking-widest text-background transition-all hover:border-primary hover:text-primary md:w-auto"
              >
                JOIN THE TEAM
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
