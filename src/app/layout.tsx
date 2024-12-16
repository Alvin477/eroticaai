import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ConsentPopup from "@/components/ConsentPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EroticaAI - AI Companions",
  description: "Experience intimate AI conversations in a safe, private environment",
  icons: {
    icon: [
      {
        url: '/img/fav.png',
        href: '/img/fav.png',
      }
    ],
    shortcut: '/img/fav.png',
    apple: '/img/fav.png',
  },
  manifest: '/manifest.json'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/img/fav.png" />
        <link rel="apple-touch-icon" href="/img/fav.png" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <ConsentPopup />
        <Header />
        {children}
      </body>
    </html>
  );
}
