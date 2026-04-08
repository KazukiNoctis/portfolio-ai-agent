import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ferdy — Web Developer & AI Enthusiast",
  description:
    "Interactive portfolio of Ferdy, a Web Developer & UI/UX Designer. Powered by an AI assistant that can answer questions about my skills and experience.",
  keywords: ["ferdy", "portfolio", "web developer", "ai", "next.js"],
  openGraph: {
    title: "Ferdy — Web Developer & AI Enthusiast",
    description: "Interactive portfolio powered by an AI assistant.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
