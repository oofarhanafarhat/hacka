// File: app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Nav";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/context/cartContext";

// ✅ Google font
const inter = Inter({ subsets: ["latin"] });

// ✅ SEO metadata
export const metadata: Metadata = {
  title: "Test Sofa Store | Responsive UI",
  description: "Responsive furniture store app for testing functionality, layout, and SEO setup.",
  openGraph: {
    title: "furniture store test",
    description: "Preview version of Sofa Store app for layout and UI testing.",
    url: "https://hacka-roan.vercel.app//",
    siteName: "Sofa Store Test",
    images: [
      {
        url: "https://hacka-roan.vercel.app//test-image.jpg",
        width: 600,
        height: 400,
        alt: "Test Sofa",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "furniture store test",
    description: "Testing responsive UI and layout setup.",
    images: ["https://hacka-roan.vercel.app//test-image.jpg"],
  },
};

// ✅ Move viewport to a separate export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-white text-gray-900 dark:bg-black dark:text-white transition-colors duration-300`}
      >
      <CartProvider>
        <Navbar />
        <main className="min-h-screen px-4 md:px-8 lg:px-16">{children}</main>
        <Footer />
      </CartProvider>
      </body>
    </html>
  );
}
