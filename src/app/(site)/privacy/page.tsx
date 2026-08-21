import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | BairesDev Solutions",
  alternates: { canonical: "https://www.bairesdevsolution.com/privacy" },
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-32 pt-48 lg:px-12">
        <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Legal</span>
        <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">Privacy Policy</h1>
        <p className="mt-6 text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        <div className="mt-12 space-y-8 text-muted-foreground leading-relaxed">
          <p>
            BairesDev Solutions (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting
            your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when
            you visit our website or engage with our services.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including your name, email address, company name, and
            messages submitted through our contact forms. We also collect standard web analytics data such as pages
            visited, time on site, and device type.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">How We Use Your Information</h2>
          <p>
            We use the information we collect to respond to your enquiries, improve our services, and send you relevant
            communications where you have given consent. We do not sell your personal data to third parties.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">Contact</h2>
          <p>
            For privacy-related enquiries, please email{" "}
            <a href="mailto:privacy@bairesdev.solutions" className="text-primary hover:underline">
              privacy@bairesdev.solutions
            </a>.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
