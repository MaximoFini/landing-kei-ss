import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Sans, Google_Sans_Flex } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { StructuredData } from "@/components/structured-data";
import { PageTransition } from "@/components/page-transition";
import { TitleAttention } from "@/components/title-attention";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: true,
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
});
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-instrument-sans",
  display: "swap",
});
const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-google-sans-flex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://keisoftware.dev"),
  alternates: {
    canonical: "https://keisoftware.dev",
  },
  title: {
    default: "Kei Software",
    template: "%s | Kei Software",
  },
  description:
    "Desarrollamos software a medida, soluciones IA y automatización con transparencia y calidad garantizada. Córdoba, Argentina.",
  keywords: [
    "desarrollo software",
    "software a medida",
    "inteligencia artificial",
    "automatización",
    "desarrollo web",
    "Córdoba",
    "desarrollo software Córdoba",
    "programación Argentina",
    "soluciones IA",
    "chatbot IA",
    "automatización empresarial",
    "desarrollo aplicaciones web",
    "Next.js",
    "React",
    "software empresarial",
    "CRM a medida",
    "ERP personalizado",
    "desarrollo remoto",
  ],
  authors: [{ name: "Kei Software" }],
  creator: "Kei Software",
  publisher: "Kei Software",
  category: "Technology",
  classification: "Software Development Services",
  applicationName: "Kei Software",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  verification: {
    google: "google9f062801bafc9c55",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://keisoftware.dev",
    title: "Kei Software — Software a Medida | Desarrollo Web & IA",
    description:
      "Desarrollamos software a medida, soluciones IA y automatización con transparencia total. Córdoba, Argentina.",
    siteName: "Kei Software",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Kei Software — Software a Medida | Córdoba, Argentina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kei Software — Software a Medida | Desarrollo Web & IA",
    description:
      "Desarrollamos software a medida, soluciones IA y automatización con transparencia total. Córdoba, Argentina.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kei Software",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-background scroll-smooth">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Mobile Safari optimizations */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {/* JSON-LD: rendered here in <head> (Next.js App Router allows
            arbitrary static elements returned from the root layout's <head>
            to be merged into the document head without hydration issues,
            since this content is server-rendered and non-interactive). */}
        <StructuredData />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} ${instrumentSans.variable} ${googleSansFlex.variable} font-sans antialiased bg-background text-foreground min-h-screen`}
      >
        <TitleAttention />
        <PageTransition>{children}</PageTransition>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
