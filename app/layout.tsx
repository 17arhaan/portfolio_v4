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
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Arhaan Girdhar | Software Developer & AI Enthusiast",
    template: "%s | Arhaan Girdhar"
  },
  description: "Passionate Computer Science student at MIT Manipal specializing in AI/ML, full-stack development, and computer vision. Experienced in Python, React, Next.js, TensorFlow, and cloud technologies. Building innovative solutions with 15+ projects and multiple certifications.",
  keywords: [
    "Arhaan Girdhar",
    "Software Developer",
    "AI Engineer",
    "Machine Learning Developer",
    "MIT Manipal",
    "Computer Science Student",
    "Full Stack Developer",
    "React Developer",
    "Python Developer",
    "Next.js Expert",
    "TypeScript",
    "TensorFlow",
    "Computer Vision",
    "Deep Learning",
    "Web Development",
    "Portfolio",
    "Freelance Developer",
    "AI Projects",
    "Machine Learning Projects",
    "Data Science",
    "Cloud Computing",
    "AWS",
    "Google Cloud",
    "IBM Certified",
    "Microsoft Certified",
    "GitHub Projects",
    "Open Source",
    "Tech Innovation",
    "Software Engineering"
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
    description: "Passionate Computer Science student at MIT Manipal specializing in AI/ML, full-stack development, and computer vision. Experienced in Python, React, Next.js, TensorFlow, and cloud technologies. Building innovative solutions with 15+ projects and multiple certifications.",
    url: "https://www.arhaanportfolio.in",
    siteName: "Arhaan Girdhar Portfolio",
    images: [
      {
        url: "https://www.arhaanportfolio.in/AG1.png",
        width: 1200,
        height: 630,
        alt: "Arhaan Girdhar - Software Developer & AI Enthusiast Portfolio",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arhaan Girdhar | Software Developer & AI Enthusiast",
    description: "Passionate Computer Science student at MIT Manipal specializing in AI/ML, full-stack development, and computer vision. Experienced in Python, React, Next.js, TensorFlow, and cloud technologies.",
    creator: "@17arhaan",
    images: ["https://www.arhaanportfolio.in/AG1.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification: "Personal Portfolio",
  icons: {
    icon: [
      { url: "/AG1.png", sizes: "32x32", type: "image/png" },
      { url: "/AG1.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/AG1.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/AG1.png"
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Arhaan Girdhar",
    "jobTitle": "Software Developer & AI Enthusiast",
    "description": "Passionate Computer Science student at MIT Manipal specializing in AI/ML, full-stack development, and computer vision.",
    "url": "https://www.arhaanportfolio.in",
    "image": "https://www.arhaanportfolio.in/AG1.png",
    "email": "contact@arhaanportfolio.in",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Manipal Institute of Technology",
      "sameAs": "https://manipal.edu/mit.html"
    },
    "knowsAbout": [
      "Software Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Full Stack Development",
      "React",
      "Next.js",
      "Python",
      "TensorFlow",
      "Cloud Computing"
    ],
    "sameAs": [
      "https://github.com/17arhaan",
      "https://linkedin.com/in/arhaan-girdhar",
      "https://twitter.com/17arhaan"
    ],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.arhaanportfolio.in"
    }
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Arhaan Girdhar Portfolio",
    "url": "https://www.arhaanportfolio.in",
    "description": "Portfolio of Arhaan Girdhar - Software Developer & AI Enthusiast",
    "author": {
      "@type": "Person",
      "name": "Arhaan Girdhar"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.arhaanportfolio.in/#projects?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Main Sections",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Resume",
          "url": "https://www.arhaanportfolio.in/Arhaan_Resume.pdf"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects",
          "url": "https://www.arhaanportfolio.in/#projects"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Certifications",
          "url": "https://www.arhaanportfolio.in/#certifications"
        }
      ]
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        <link rel="preload" href="/AG1.png" as="image" type="image/png" />
        <link rel="preload" href="/pfp.png" as="image" type="image/png" />
        <meta name="theme-color" content="#0b1220" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="font-mono">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
