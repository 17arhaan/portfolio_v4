"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import SocialLink from "@/components/ui/social-link"
import LeetCodeLink from "@/components/leetcode-link"

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
    <footer className="py-12 border-t border-white/10 bg-black">
      <div className="container mx-auto px-6">
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
              width={56}
              height={56}
              className="h-24 w-auto object-contain hover:opacity-80 transition-opacity" 
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