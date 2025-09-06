"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import SocialLink from "@/components/ui/social-link"
import LeetCodeLink from "@/components/leetcode-link"
import HackerRankLink from "@/components/hackerrank-link"

interface FooterSectionProps {
  isVideoPlaying: boolean
  setIsVideoPlaying: (playing: boolean) => void
  setShowConfetti: (show: boolean) => void
  VideoPlayer: React.ComponentType<{ isPlaying: boolean; onEnded: () => void }>
}

export default function FooterSection({ 
  isVideoPlaying, 
  setIsVideoPlaying, 
  setShowConfetti,
  VideoPlayer 
}: FooterSectionProps) {
  return (
    <footer className="py-12 border-t border-white/10 bg-black relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Radial Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.015)_35%,transparent_70%)]" />
        
        {/* Moving Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-white/8 to-white/3 rounded-full blur-3xl"
          animate={{
            x: [0, 200, -150, 100, -80, 0],
            y: [0, -100, 150, -60, 80, 0],
            scale: [1, 1.2, 0.9, 1.1, 0.8, 1],
            rotate: [0, 90, 180, 270, 360, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-64 h-64 bg-gradient-to-l from-white/6 to-white/2 rounded-full blur-3xl"
          animate={{
            x: [0, -180, 120, -80, 150, 0],
            y: [0, 80, -120, 100, -70, 0],
            scale: [1, 0.8, 1.1, 0.9, 1.0, 1],
            rotate: [360, 270, 180, 90, 0, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-white/4 to-white/1 rounded-full blur-3xl"
          animate={{
            x: [-80, 150, -100, 80, -60, -80],
            y: [-60, 90, -80, 120, -90, -60],
            scale: [0.9, 1.0, 0.8, 1.1, 0.7, 0.9],
            rotate: [0, 120, 240, 360, 180, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />
        
        {/* Animated Lines */}
        <motion.div
          className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent"
          animate={{
            opacity: [0, 0.4, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            opacity: [0, 0.3, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        />
        
        {/* Floating Dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        
        {/* Corner Accent Lines */}
        <motion.div
          className="absolute bottom-0 left-0 w-24 h-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        >
          <div className="absolute bottom-6 left-6 w-12 h-[1px] bg-white/30" />
          <div className="absolute bottom-6 left-6 w-[1px] h-12 bg-white/30" />
        </motion.div>
        <motion.div
          className="absolute bottom-0 right-0 w-24 h-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        >
          <div className="absolute bottom-6 right-6 w-12 h-[1px] bg-white/30" />
          <div className="absolute bottom-6 right-6 w-[1px] h-12 bg-white/30" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cursor-pointer"
            onClick={() => setIsVideoPlaying(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsVideoPlaying(true);
              }
            }}
          >
            <Image 
              src="/sign.png" 
              alt="Arhaan Girdhar" 
              width={96}
              height={96}
              className="h-24 w-auto object-contain hover:opacity-80 transition-opacity" 
              loading="lazy"
              unoptimized={true}
            />
          </motion.div>
          
          <AnimatePresence>
            {isVideoPlaying && (
              <VideoPlayer 
                isPlaying={isVideoPlaying} 
                onEnded={() => {
                  setIsVideoPlaying(false);
                  setShowConfetti(true);
                  setTimeout(() => setShowConfetti(false), 5000);
                }} 
              />
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center space-x-6"
          >
            <SocialLink icon={<Github className="w-5 h-5" />} href="https://github.com/17arhaan" />
            <SocialLink icon={<Linkedin className="w-5 h-5" />} href="https://www.linkedin.com/in/arhaan17/" />
            <LeetCodeLink href="https://leetcode.com/u/arhaan17/" />
            <HackerRankLink href="https://www.hackerrank.com/profile/17arhaan" />
            <SocialLink icon={<Mail className="w-5 h-5" />} href="mailto:17arhaan.connect@gmail.com" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Arhaan Girdhar. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
} 