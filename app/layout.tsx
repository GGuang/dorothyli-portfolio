import type { Metadata } from "next";
import { Cormorant, DM_Sans, Space_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dorothy Li — B2B Marketing Leader",
  description:
    "Building overseas marketing infrastructure for technology companies — from brand to demand, content to systems.",
  openGraph: {
    title: "Dorothy Li — B2B Marketing Leader",
    description:
      "Building overseas marketing infrastructure for technology companies.",
    url: "https://dorothyli.me",
    siteName: "Dorothy Li",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${spaceMono.variable} ${spaceGrotesk.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
