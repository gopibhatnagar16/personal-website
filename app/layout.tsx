import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
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

export const metadata: Metadata = {
  title: "Gopi Bhatnagar — Design Builder",
  description:
    "Design builder — partly in canvas, rest in codebase. Product design and front-end work across Razorpay, Scaler, and more.",
};

const themeInit = `try{var t=localStorage.getItem("theme");if(t==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
