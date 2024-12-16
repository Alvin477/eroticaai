import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ConsentPopup from "@/components/ConsentPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stripchat AI - AI Stripchat",
  description: "Experience intimate AI conversations in a safe, private environment",
  icons: {
    icon: '/img/favicons.ico',
    shortcut: '/img/favicons.ico',
    apple: '/img/favicons.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/favicons.ico" sizes="any" />
        <link rel="shortcut icon" href="/img/favicons.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/img/favicons.ico" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <ConsentPopup />
        <Header />
        {children}
      </body>
    </html>
  );
}
