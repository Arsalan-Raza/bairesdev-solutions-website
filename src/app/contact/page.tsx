import type { Metadata } from "next";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Contact Us | Start Your Project",
  description: "Connect with our engineering experts. Start a project, discuss a partnership, or just say hello.",
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
                    <a href="mailto:hello@bairesdev.solutions" className="mt-4 block text-lg hover:text-primary transition-colors">hello@bairesdev.solutions</a>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Headquarters</h3>
                    <p className="mt-4 text-lg">San Francisco, California</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Global Reach</h3>
                    <p className="mt-4 text-lg">12 International Delivery Hubs</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-12 lg:p-16">
                {/* TODO: Wire to Next.js Server Action → Payload CMS + Resend email */}
                <form className="space-y-8">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Full Name</label>
                      <input id="name" type="text" name="name" required autoComplete="name" className="w-full border-b border-border bg-transparent py-4 outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Email Address</label>
                      <input id="email" type="email" name="email" required autoComplete="email" className="w-full border-b border-border bg-transparent py-4 outline-none focus:border-primary transition-colors" placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Company</label>
                    <input id="company" type="text" name="company" autoComplete="organization" className="w-full border-b border-border bg-transparent py-4 outline-none focus:border-primary transition-colors" placeholder="Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Service Interest</label>
                    <select id="subject" name="subject" className="w-full border-b border-border bg-transparent py-4 outline-none focus:border-primary transition-colors cursor-pointer">
                      <option value="">Select a service…</option>
                      <option value="web">Web Engineering</option>
                      <option value="mobile">Mobile Product Engineering</option>
                      <option value="ai">AI & Machine Learning</option>
                      <option value="ecommerce">E-commerce Solutions</option>
                      <option value="crm">CRM Solutions</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Message</label>
                    <textarea id="message" name="message" rows={5} required className="w-full border-b border-border bg-transparent py-4 outline-none focus:border-primary transition-colors resize-none" placeholder="Tell us about your project challenges…" />
                  </div>
                  <button type="submit" className="w-full bg-primary py-6 text-sm font-bold tracking-[0.3em] text-primary-foreground transition-all hover:bg-primary/90">
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
