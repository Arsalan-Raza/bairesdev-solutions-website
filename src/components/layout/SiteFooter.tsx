import Link from "next/link";
import Image from "next/image";

const pages = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/technologies", label: "Technologies" },
  { href: "/process", label: "Process" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/10 bg-background py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image src="/logo.png" alt="BairesDev Solutions" width={120} height={40} className="h-8 w-auto lg:h-10" />
            <p className="mt-8 max-w-sm text-lg text-muted-foreground">
              Engineering premium digital solutions for the world&apos;s most ambitious brands.
              Built on trust, powered by innovation.
            </p>
          </div>
          <div>
            <h5 className="mb-6 text-xs font-bold tracking-[0.3em] text-primary uppercase">Pages</h5>
            <ul className="space-y-4">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="mb-6 text-xs font-bold tracking-[0.3em] text-primary uppercase">Contact</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="mailto:hello@bairesdev.solutions" className="hover:text-primary transition-colors">
                  hello@bairesdev.solutions
                </a>
              </li>
              <li>+1 (555) 000-1111</li>
              <li>123 Engineering Plaza, Suite 400</li>
              <li>San Francisco, CA 94103</li>
            </ul>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center justify-between gap-8 border-t border-border/10 pt-8 md:flex-row">
          <p className="text-xs tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} BAIRESDEV SOLUTIONS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[10px] font-bold tracking-[0.2em] text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">PRIVACY POLICY</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
