import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "About BairesDev Solutions | Our Story & Engineering Philosophy",
  description: "Learn about the people, mission, and culture behind BairesDev Solutions.",
};

const timeline = [
  { year: "2009", title: "Foundation", desc: "Established with a core team of senior architects to solve enterprise challenges." },
  { year: "2015", title: "Global Scale", desc: "Expanded to 12 international offices, partnering with Fortune 500 brands." },
  { year: "2026", title: "AI Integration", desc: "Pioneering the next era of engineering through neural-integrated solutions." },
];

export default function AboutPage() {
  return (
    <PageShell>
      {/* ── Hero ── */}
      <section className="py-24 pt-40 lg:py-32 lg:pt-52">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-4 block text-xs font-bold tracking-[0.4em] text-primary uppercase">
                Our Legacy
              </span>
              <h1 className="font-display text-5xl font-bold leading-[1.1] md:text-7xl">
                Engineering <br />
                <span className="text-primary italic">The Future</span> Since 2009.
              </h1>
              <p className="mt-8 text-xl leading-relaxed text-muted-foreground md:text-2xl">
                BairesDev Solutions wasn&apos;t built in a garage. It was built in the complex,
                high-stakes environments of global enterprise.
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden grayscale lg:aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200"
                alt="Corporate innovation"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy Quote ── */}
      <section className="bg-foreground py-32 text-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-24">
            <div className="lg:w-1/3">
              <div className="h-1 w-24 bg-primary" />
              <h2 className="mt-8 font-display text-3xl font-bold uppercase tracking-tighter">
                Philosophy
              </h2>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-2/3">
              <blockquote className="font-display text-4xl font-light italic leading-tight md:text-6xl">
                &ldquo;Software is the skeleton of modern commerce. If it&apos;s weak, the business
                collapses. We build for strength, resilience, and infinite scale.&rdquo;
              </blockquote>
              <cite className="mt-8 block text-sm font-bold tracking-[0.3em] text-primary uppercase not-italic">
                — The Engineering Council
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 className="mb-24 font-display text-4xl font-bold md:text-6xl">Our Journey.</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {timeline.map((step, i) => (
              <div key={i} className="group relative border-t border-border pt-12">
                <div className="absolute top-0 h-1 w-0 bg-primary transition-all group-hover:w-full" />
                <span className="font-display text-6xl font-bold text-muted/20 transition-colors group-hover:text-primary/20">
                  {step.year}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold">{step.title}</h3>
                <p className="mt-4 text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
