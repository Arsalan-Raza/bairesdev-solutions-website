import type { Metadata } from "next";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact BairesDev Solutions | Start Your Project",
  description: "Connect with our engineering experts to start a project, discuss a partnership, or get a quote. We respond within one business day.",
  alternates: { canonical: "https://www.bairesdevsolution.com/contact" },
  keywords: ["contact software development company", "hire software engineers", "enterprise software quote", "technology consulting contact"],
  openGraph: {
    title: "Contact BairesDev Solutions | Start Your Project",
    description: "Connect with our engineering experts. We respond within one business day.",
    url: "https://www.bairesdevsolution.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <SiteNav />
      <main className="flex-grow pt-24">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
              <div>
                <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">
                  Let&apos;s Solve The{" "}
                  <span className="text-primary italic">Impossible.</span>
                </h1>
                <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
                  Whether you&apos;re looking for a long-term engineering partner or a specialised
                  team for a breakthrough project, we&apos;re ready to accelerate your growth.
                </p>
                <div className="mt-16 space-y-8">
                  <div>
                    <h3 className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Email</h3>
                    <a href="mailto:aarrssllaann42@gmail.com" className="mt-4 block text-lg hover:text-primary transition-colors">aarrssllaann42@gmail.com</a>
                    <a href="mailto:5144.2019.gct@gmail.com" className="mt-1 block text-lg hover:text-primary transition-colors">5144.2019.gct@gmail.com</a>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Phone</h3>
                    <a href="tel:+923017281369" className="mt-4 block text-lg hover:text-primary transition-colors">0301 728 1369</a>
                    <a href="tel:+923084169496" className="mt-1 block text-lg hover:text-primary transition-colors">+92 308 416 9496</a>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Headquarters</h3>
                    <p className="mt-4 text-lg">Lahore, Pakistan</p>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
