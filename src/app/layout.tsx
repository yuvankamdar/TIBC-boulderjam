import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "TIBC Boulder Jam",
  description: "3 days of nonstop climbing. gravity’s so boring :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-tibc-ink text-tibc-chalk selection:bg-tibc-orange/25 selection:text-tibc-chalk">
        {children}
      </body>
    </html>
  );
}
