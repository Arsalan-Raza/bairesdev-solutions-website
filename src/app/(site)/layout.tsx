import type { Metadata } from "next";
import React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://www.bairesdevsolution.com";

export const metadata: Metadata = {
  title: {
    default: "BairesDev Solutions | Custom Software Development Company",
    template: "%s | BairesDev Solutions",
  },
  description:
    "BairesDev Solutions delivers custom software development, AI engineering, and digital transformation for global enterprises. 500+ engineers, 98% client retention.",
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "BairesDev Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "BairesDev Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BairesDevSol",
  },
  robots: { index: true, follow: true },
  keywords: ["custom software development", "software engineering company", "AI development", "digital transformation", "enterprise software"],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BairesDev Solutions",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: "Custom software development, AI engineering, and digital transformation for global enterprises.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "aarrssllaann42@gmail.com",
      telephone: "+923017281369",
      contactType: "sales",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      email: "5144.2019.gct@gmail.com",
      telephone: "+923084169496",
      contactType: "customer support",
      availableLanguage: "English",
    },
  ],
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
