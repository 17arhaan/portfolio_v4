"use client"

import React from "react"
import { motion } from "framer-motion"
import { Code, ChevronDown, Github, Linkedin, Mail } from "lucide-react"
import SocialLink from "@/components/ui/social-link"
import LeetCodeLink from "@/components/leetcode-link"

interface HeroSectionProps {
  typedText: string
  scrollToSection: (sectionId: string) => void
}

export default function HeroSection({ typedText, scrollToSection }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            {/* Code brackets decoration */}
            <motion.div
              className="flex justify-center items-center mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="text-5xl md:text-7xl text-white/20 font-mono mr-6"
                animate={{ x: [-5, 0, -5], rotate: [-2, 0, -2] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              >
                {"{"}
              </motion.div>
              <motion.div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/30 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(255,255,255,0.1)",
                    "0 0 20px rgba(255,255,255,0.2)",
                    "0 0 0 rgba(255,255,255,0.1)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Code className="w-10 h-10 md:w-12 md:h-12 text-white/70" />
              </motion.div>
              <motion.div
                className="text-5xl md:text-7xl text-white/20 font-mono ml-6"
                animate={{ x: [5, 0, 5], rotate: [2, 0, 2] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              >
                {"}"}
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 tracking-tight leading-tight sm:leading-tight"
            >
              <span className="text-gray-400">Hello, I'm </span>
              <span className="relative inline-block">
                <span className="relative z-10">Arhaan Girdhar</span>
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="absolute bottom-0 left-0 h-3 sm:h-4 bg-white/10 z-0"
                />
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-lg xs:text-xl sm:text-2xl md:text-4xl text-gray-300 mb-8 sm:mb-12 h-10 sm:h-12 flex items-center justify-center"
            >
              <span className="mr-2 sm:mr-3">I'm a</span>
              <span className="text-white font-medium relative">
                {typedText}
                <motion.span
                  className="absolute right-[-6px] sm:right-[-8px] top-0 h-full w-[2px] bg-white"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-gray-400 max-w-3xl mx-auto mb-10 sm:mb-16 leading-relaxed text-base sm:text-lg md:text-xl italic px-2 sm:px-0"
            >
              A Computer Science student passionate about AI/ML and software development. Turning visions into reality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16 sm:mb-24"
            >
              <SocialLink icon={<Github className="w-6 h-6" />} href="https://github.com/17arhaan" />
              <SocialLink icon={<Linkedin className="w-6 h-6" />} href="https://www.linkedin.com/in/arhaan17/" />
              <LeetCodeLink href="https://leetcode.com/u/arhaan17/" />
              <SocialLink icon={<Mail className="w-6 h-6" />} href="mailto:17arhaan.connect@gmail.com" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8"
        >
          <motion.button
            onClick={() => scrollToSection("about")}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Scroll to about section"
          >
            <ChevronDown className="w-10 h-10" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 