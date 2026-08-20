import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Terms of Service | BairesDev Solutions",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-32 pt-48 lg:px-12">
        <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Legal</span>
        <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">Terms of Service</h1>
        <p className="mt-6 text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        <div className="mt-12 space-y-8 text-muted-foreground leading-relaxed">
          <p>
            By accessing the BairesDev Solutions website, you agree to be bound by these Terms of Service. If you do
            not agree, please do not use this website.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">Use of the Website</h2>
          <p>
            This website is provided for informational purposes. You may not use the site for any unlawful purpose or
            in a way that could harm BairesDev Solutions or any third party.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">Intellectual Property</h2>
          <p>
            All content on this website, including text, images, and design, is owned by BairesDev Solutions and
            protected by applicable intellectual property laws.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">Limitation of Liability</h2>
          <p>
            BairesDev Solutions shall not be liable for any indirect, incidental, or consequential damages arising
            from your use of this website.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">Contact</h2>
          <p>
            For questions about these terms, please contact{" "}
            <a href="mailto:legal@bairesdev.solutions" className="text-primary hover:underline">
              legal@bairesdev.solutions
            </a>.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
