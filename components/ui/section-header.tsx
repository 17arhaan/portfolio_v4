"use client"

import React from "react"
import { motion } from "framer-motion"

interface SectionHeaderProps {
  title: string
  icon: React.ReactNode
}

export default function SectionHeader({ title, icon }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center"
    >
      <div className="flex items-center space-x-3 mb-2">
        <span className="text-gray-400">{icon}</span>
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      </div>
      <div className="w-16 h-1 bg-white mt-4"></div>
    </motion.div>
  )
} 