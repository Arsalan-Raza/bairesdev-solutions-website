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

export const metadata: Metadata = {
  title: {
    default: "BairesDev Solutions | Engineering the Future",
    template: "%s | BairesDev Solutions",
  },
  description:
    "High-end custom software solutions, AI engineering, and digital acceleration for global enterprises.",
  metadataBase: new URL("https://www.bairesdevsolution.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bairesdevsolution.com",
    siteName: "BairesDev Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BairesDevSol",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
