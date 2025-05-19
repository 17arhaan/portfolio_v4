"use client"

import { Code } from "lucide-react"
import { motion } from "framer-motion"

export default function LeetCodeLink({ href }: { href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
    >
      <Code className="w-5 h-5" />
    </motion.a>
  )
}
