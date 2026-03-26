import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PostMall — Your AI Store Manager",
  description:
    "Meet Amberlyn — an AI agent that runs your entire online store. Send product photos on WhatsApp or Telegram, she handles the rest. Products, pricing, orders, invoices, checkout. Free shop included.",
  keywords: ["AI store manager", "online shop", "WhatsApp selling", "Telegram shop", "product photography AI", "e-commerce Africa", "MoMo payments", "agentic commerce"],
  openGraph: {
    title: "PostMall — Your AI Store Manager",
    description: "She runs your shop. You run your life. Meet Amberlyn, your AI agent that manages products, orders, invoices & checkout — all from WhatsApp or Telegram.",
    type: "website",
    url: "https://postmall.vercel.app",
    siteName: "PostMall",
    images: [
      {
        url: "https://postmall.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "PostMall — Your AI Store Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PostMall — Your AI Store Manager",
    description: "She runs your shop. You run your life. An AI agent that manages your entire online store from WhatsApp.",
    images: ["https://postmall.vercel.app/og.png"],
  },
  metadataBase: new URL("https://postmall.vercel.app"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
