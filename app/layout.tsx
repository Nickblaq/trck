import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { i18n } from "@/i18n-config";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Truck Hub",
  description: "Trucks for Sale around the world",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string }
}>) {
  return (
    <html lang={params.lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased container min-h-screen max-w-6xl w-full mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}