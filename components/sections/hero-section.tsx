"use client"

import React from "react"
import { motion } from "framer-motion"
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react"
import SocialLink from "@/components/ui/social-link"
import LeetCodeLink from "@/components/leetcode-link"
import HackerRankLink from "@/components/hackerrank-link"

interface HeroSectionProps {
  typedText: string
  scrollToSection: (sectionId: string) => void
}

export default function HeroSection({ typedText, scrollToSection }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Radial Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_35%,transparent_70%)]" />
        
        {/* Moving Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, 300, -200, 150, -100, 0],
            y: [0, -150, 200, -80, 120, 0],
            scale: [1, 1.3, 0.8, 1.1, 0.9, 1],
            rotate: [0, 120, 240, 360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-l from-white/8 to-white/3 rounded-full blur-3xl"
          animate={{
            x: [0, -250, 180, -120, 200, 0],
            y: [0, 100, -180, 150, -100, 0],
            scale: [1, 0.7, 1.2, 0.9, 1.1, 1],
            rotate: [360, 240, 120, 0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-white/6 to-white/2 rounded-full blur-3xl"
          animate={{
            x: [-100, 200, -150, 100, -80, -100],
            y: [-80, 120, -100, 180, -120, -80],
            scale: [0.8, 1.1, 0.9, 1.2, 0.7, 0.8],
            rotate: [0, 180, 360, 540, 720, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7,
          }}
        />
        
        {/* Animated Lines */}
        <motion.div
          className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            opacity: [0, 0.5, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent"
          animate={{
            opacity: [0, 0.3, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {/* Floating Dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${15 + (i * 10)}%`,
              top: `${25 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
        
        {/* Subtle Grid with Better Visibility */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
        
        {/* Corner Accent Lines */}
        <motion.div
          className="absolute top-0 left-0 w-32 h-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        >
          <div className="absolute top-8 left-8 w-16 h-[1px] bg-white/40" />
          <div className="absolute top-8 left-8 w-[1px] h-16 bg-white/40" />
        </motion.div>
        <motion.div
          className="absolute top-0 right-0 w-32 h-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        >
          <div className="absolute top-8 right-8 w-16 h-[1px] bg-white/40" />
          <div className="absolute top-8 right-8 w-[1px] h-16 bg-white/40" />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center py-20">

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 tracking-tight leading-tight sm:leading-tight">
              <span className="text-gray-400">Hello, I'm </span>
              <span className="relative inline-block">
                <span className="relative z-10">Arhaan Girdhar</span>
                <span className="absolute bottom-0 left-0 h-3 sm:h-4 bg-white/10 z-0 w-full" />
              </span>
            </h1>

            <div className="text-lg xs:text-xl sm:text-2xl md:text-4xl text-gray-300 mb-8 sm:mb-12 h-10 sm:h-12 flex items-center justify-center">
              <span className="mr-2 sm:mr-3"></span>
              <span className="text-white font-medium relative">
                {typedText}
                <span className="absolute right-[-6px] sm:right-[-8px] top-0 h-full w-[2px] bg-white opacity-75" />
              </span>
            </div>

            <p className="text-gray-400 max-w-3xl mx-auto mb-10 sm:mb-16 leading-relaxed text-base sm:text-lg md:text-xl italic px-2 sm:px-0">
              A Computer Science student passionate about AI/ML and software development. Turning vision into reality.
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16 sm:mb-24">
              <SocialLink icon={<Github className="w-6 h-6" />} href="https://github.com/17arhaan" />
              <SocialLink icon={<Linkedin className="w-6 h-6" />} href="https://www.linkedin.com/in/arhaan17/" />
              <LeetCodeLink href="https://leetcode.com/u/arhaan17/" />
              <HackerRankLink href="https://www.hackerrank.com/profile/17arhaan" />
              <SocialLink icon={<Mail className="w-6 h-6" />} href="mailto:17arhaan.connect@gmail.com" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Scroll to about section"
          >
            <ChevronDown className="w-10 h-10" />
          </button>
        </div>
      </div>
    </section>
  )
} 