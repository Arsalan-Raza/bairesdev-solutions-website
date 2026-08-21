"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/technologies", label: "Technologies" },
  { href: "/process", label: "Process" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Insights" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="BairesDev Solutions" width={120} height={40} className="h-8 w-auto lg:h-10" />
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium tracking-wide text-foreground/70 transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-primary px-6 py-2.5 text-sm font-bold tracking-widest text-primary-foreground transition-transform hover:scale-105"
          >
            WORK WITH US
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="xl:hidden flex flex-col gap-1.5 p-2"
        >
          <div className="h-0.5 w-6 bg-foreground transition-all" />
          <div className="h-0.5 w-6 bg-foreground transition-all" />
        </button>
      </div>

      {open && (
        <div className="border-t border-border/40 bg-background px-6 py-6 xl:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/about" onClick={() => setOpen(false)} className="text-sm text-foreground/80 hover:text-primary transition-colors">
              About
            </Link>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="bg-primary px-6 py-3 text-center text-xs font-bold tracking-widest text-primary-foreground"
            >
              WORK WITH US
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
