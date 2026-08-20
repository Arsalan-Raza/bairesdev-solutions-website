import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import Image from "next/image";
import Link from "next/link";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans selection:bg-primary selection:text-primary-foreground">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  image: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/10 pt-40 pb-24 lg:pt-52 lg:pb-32">
      <div className="absolute inset-0 z-0">
        <Image src={image} alt="" fill className="object-cover opacity-[0.12] grayscale" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-8">
          <span className="mb-6 block text-xs font-bold tracking-[0.3em] text-primary uppercase">
            {eyebrow}
          </span>
          <h1 className="font-display text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {title}
          </h1>
        </div>
        <div className="flex items-end lg:col-span-4">
          <p className="border-l-2 border-primary pl-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {lead}
          </p>
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  body,
  action = "START A CONVERSATION",
}: {
  title: string;
  body: string;
  action?: string;
}) {
  return (
    <section className="bg-foreground py-24 text-background lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:px-12">
        <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl lg:col-span-7">
          {title}
        </h2>
        <div className="lg:col-span-5">
          <p className="text-lg text-background/70">{body}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex bg-primary px-10 py-5 text-xs font-bold tracking-[0.2em] text-primary-foreground transition-all hover:bg-primary/90"
          >
            {action}
          </Link>
        </div>
      </div>
    </section>
  );
}
