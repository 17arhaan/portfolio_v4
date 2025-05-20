import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Arhaan Girdhar",
  description: "A passionate software developer and AI enthusiast with a knack for turning complex problems into elegant solutions. Currently pursuing my B.Tech in Computer Science at MIT Manipal, I specialize in full-stack development, machine learning, and computer vision. My goal is to create technology that makes a meaningful impact while continuously learning and growing in this ever-evolving field.",
  keywords: [
    "Arhaan Girdhar",
    "Software Developer",
    "AI Enthusiast",
    "MIT Manipal",
    "Computer Science",
    "Full Stack Development",
    "Machine Learning",
    "Computer Vision",
    "B.Tech",
    "Web Development",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Portfolio"
  ],
  authors: [{ name: "Arhaan Girdhar", url: "https://github.com/17arhaan" }],
  creator: "Arhaan Girdhar",
  publisher: "Arhaan Girdhar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.arhaanportfolio.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arhaan Girdhar | Software Developer & AI Enthusiast",
    description: "A passionate software developer and AI enthusiast with a knack for turning complex problems into elegant solutions. Currently pursuing my B.Tech in Computer Science at MIT Manipal, I specialize in full-stack development, machine learning, and computer vision. My goal is to create technology that makes a meaningful impact while continuously learning and growing in this ever-evolving field.",
    url: "https://www.arhaanportfolio.in",
    siteName: "Arhaan Girdhar Portfolio",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Arhaan Girdhar - Software Developer & AI Enthusiast",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arhaan Girdhar | Software Developer & AI Enthusiast",
    description: "A passionate software developer and AI enthusiast with a knack for turning complex problems into elegant solutions. Currently pursuing my B.Tech in Computer Science at MIT Manipal, I specialize in full-stack development, machine learning, and computer vision. My goal is to create technology that makes a meaningful impact while continuously learning and growing in this ever-evolving field.",
    creator: "@17arhaan",
    images: ["/favicon.png"],
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
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
  },
  category: "technology",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-mono">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
