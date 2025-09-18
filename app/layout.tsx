import { Providers } from "@/lib/providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ForgeAPI - Generate Fake APIs Instantly",
  description:
    "Create mock endpoints with your custom schema in seconds — no backend needed. Perfect for frontend development and prototyping.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16">
          <Providers>{children}</Providers>
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
