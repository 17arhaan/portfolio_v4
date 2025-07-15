"use client"

import React from "react"
import { motion } from "framer-motion"

interface SocialLinkProps {
  icon: React.ReactNode
  href: string
}

export default function SocialLink({ icon, href }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
    >
      {icon}
    </motion.a>
  )
} 