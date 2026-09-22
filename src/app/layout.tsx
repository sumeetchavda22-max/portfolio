import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const description =
  "Portfolio of Sumit Chavda, a Data Center Technical Support Engineer and Infrastructure Engineer specializing in enterprise infrastructure, cybersecurity, server monitoring, virtualization and automation.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: "Sumit Chavda | Data Center & Infrastructure Engineer",
  description,
  keywords: [
    "Sumit Chavda",
    "Data Center Engineer",
    "Infrastructure Engineer",
    "Cybersecurity",
    "Network Monitoring",
    "Hyper-V",
    "Dell PowerEdge",
    "NDR",
    "Ahmedabad",
  ],
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title: "Sumit Chavda | Data Center & Infrastructure Engineer",
    description,
    siteName: "Sumit Chavda",
    locale: "en_IN",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumit Chavda | Data Center & Infrastructure Engineer",
    description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fb" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
