import type { Metadata, Viewport } from "next";
import { Inter, Caveat, Playwrite_MX, JetBrains_Mono, IBM_Plex_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { CONFIG } from "@/lib/config";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

// Neue Montreal / Monument Grotesk Mono are commercial type families we
// don't hold a license for. Geist Sans + Geist Mono (Vercel, SIL OFL) are
// the free stand-ins — same technical-grotesque register, and Geist Sans's
// own fallback chain already references Inter, which is why it stays loaded
// below even though nothing points at --font-inter directly anymore.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

// handwritten caption font for the Personal pegboard's polaroid captions
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-caveat",
});

// handwritten note in the site footer
const playwriteMX = Playwrite_MX({
  weight: ["400"],
  variable: "--font-playwrite-mx",
});

// footer chip tooltip labels ("Email", "LinkedIn" …)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

// case-study blockquotes and Why/How/What callout titles
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic", "normal"],
  variable: "--font-ibm-plex-serif",
});

const description =
  "Design builder — partly in canvas, rest in codebase. Product design and front-end work across Razorpay, Scaler, and more.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${CONFIG.name} — Design Builder`,
    template: `%s — ${CONFIG.name}`,
  },
  description,
  keywords: ["Gopi Bhatnagar", "Product Designer", "Design Engineer", "UX Design", "Razorpay", "Portfolio"],
  authors: [{ name: CONFIG.name, url: SITE_URL }],
  creator: CONFIG.name,
  publisher: CONFIG.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${CONFIG.name} — Design Builder`,
    title: `${CONFIG.name} — Design Builder`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${CONFIG.name} — Design Builder`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0c" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: CONFIG.name,
  url: SITE_URL,
  jobTitle: "Product Designer",
  email: `mailto:${CONFIG.email}`,
  sameAs: [CONFIG.socials.linkedin, CONFIG.socials.twitter],
};

const themeInit = `try{var t=localStorage.getItem("theme");if(t==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${GeistSans.variable} ${GeistMono.variable} ${caveat.variable} ${playwriteMX.variable} ${jetbrainsMono.variable} ${ibmPlexSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
