import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AmplifyCO.digital | Premium Marketing Agency",
  description: "Turn Your Business Into a Brand with websites, reels, and modern marketing strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden bg-background text-foreground`}>
        <SmoothScrollProvider>
          <Navbar />
          <main className="relative pt-20">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
