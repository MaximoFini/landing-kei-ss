import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { StructuredData } from "@/components/structured-data";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://keisoftware.dev"),
  alternates: {
    canonical: "https://keisoftware.dev",
  },
  title: {
    default: "Keii Solutions — Software a Medida",
    template: "%s | Keii Solutions",
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
  authors: [{ name: "Keii Solutions" }],
  creator: "Keii Solutions",
  publisher: "Keii Solutions",
  category: "Technology",
  classification: "Software Development Services",
  applicationName: "Keii Solutions",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  verification: {
    google: "google9f062801bafc9c55",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://keisoftware.dev",
    title: "Keii Solutions — Software a Medida | Desarrollo Web & IA",
    description:
      "Desarrollamos software a medida, soluciones IA y automatización con transparencia total. Córdoba, Argentina.",
    siteName: "Keii Solutions",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Keii Solutions — Software a Medida | Córdoba, Argentina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keii Solutions — Software a Medida | Desarrollo Web & IA",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Keii Solutions",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-background scroll-smooth">
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
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
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground min-h-screen`}
      >
        <StructuredData />
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
