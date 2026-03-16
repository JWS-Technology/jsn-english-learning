import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "JSN English Learning | TRB Preparation",
    template: "%s | JSN English Learning",
  },
  description:
    "JSN English Learning is Tamil Nadu's premier TRB coaching center led by Dr. S. Jerald Sagaya Nathan with 13+ years of experience and 95% success rate.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
