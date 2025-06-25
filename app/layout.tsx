import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Mini E-Commerce Catalog App Premium - Your Ultimate Online Shopping Destination",
    template: "%s | Mini E-Commerce Catalog App Premium",
  },
  description:
    "Discover amazing products at unbeatable prices. Shop smartphones, laptops, fashion, home decor and more with free shipping on orders over $50. Premium quality, fast delivery, secure payments.",
  keywords: [
    "ecommerce",
    "online shopping",
    "electronics",
    "fashion",
    "home decor",
    "smartphones",
    "laptops",
    "free shipping",
    "secure payments",
    "premium products",
  ],
  authors: [{ name: "Mini E-Commerce Catalog App Premium Team" }],
  creator: "Mini E-Commerce Catalog App Premium",
  publisher: "Mini E-Commerce Catalog App Premium",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    title: "Mini E-Commerce Catalog App Premium - Your Ultimate Online Shopping Destination",
    description: "Discover amazing products at unbeatable prices with free shipping on orders over $50.",
    siteName: "Mini E-Commerce Catalog App Premium",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mini E-Commerce Catalog App Premium - Online Shopping",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini E-Commerce Catalog App Premium - Your Ultimate Online Shopping Destination",
    description: "Discover amazing products at unbeatable prices with free shipping on orders over $50.",
    images: ["/og-image.jpg"],
    creator: "@estorepremium",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
