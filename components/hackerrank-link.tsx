"use client"

import React from "react"
import { motion } from "framer-motion"

interface HackerRankLinkProps {
  href: string
}

const HackerRankIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
  >
    {/* HackerRank Hexagon */}
    <path
      d="M12 1L21 6.5V17.5L12 23L3 17.5V6.5L12 1Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    {/* Inner Design - Letter H with path elements */}
    <g fill="white" fillOpacity="0.95">
      <rect x="7" y="7" width="2" height="10" />
      <rect x="15" y="7" width="2" height="10" />
      <rect x="7" y="11" width="10" height="2" />
      {/* Small decorative elements */}
      <rect x="10" y="8" width="1" height="1" />
      <rect x="13" y="8" width="1" height="1" />
      <rect x="10" y="15" width="1" height="1" />
      <rect x="13" y="15" width="1" height="1" />
    </g>
  </svg>
)

export default function HackerRankLink({ href }: HackerRankLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
      aria-label="HackerRank Profile"
    >
      <HackerRankIcon />
    </motion.a>
  )
} 