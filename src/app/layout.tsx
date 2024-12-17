import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ConsentPopup from "@/components/ConsentPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdultRooms AI ",
  description: "Experience intimate AI conversations in a safe, private environment",
  icons: {
    icon: [
      {
        url: '/img/adultfav.ico',
        type: 'image/x-icon',
      }
    ],
    shortcut: [
      {
        url: '/img/adultfav.ico',
        type: 'image/x-icon',
      }
    ],
  },
  other: {
    'msapplication-TileImage': '/img/adultfav.ico',
    'msapplication-TileColor': '#000000',
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/img/adultfav.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/img/adultfav.ico" />
        <link rel="icon" type="image/x-icon" href="/img/adultfav.ico" sizes="16x16" />
        <link rel="icon" type="image/x-icon" href="/img/adultfav.ico" sizes="32x32" />
        <link rel="icon" type="image/x-icon" href="/img/adultfav.ico" sizes="96x96" />
        <meta name="msapplication-TileImage" content="/img/adultfav.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <ConsentPopup />
        <Header />
        {children}
      </body>
    </html>
  );
}
