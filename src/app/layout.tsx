import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import { CartProvider } from "@/lib/cart-context";
import SessionProvider from "@/components/auth/SessionProvider";
import CartDrawerWrapper from "@/components/CartDrawerWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "A modern e-commerce store built with Next.js and Sanity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <CartProvider>
            <Navigation />
            {children}
            <CartDrawerWrapper />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
