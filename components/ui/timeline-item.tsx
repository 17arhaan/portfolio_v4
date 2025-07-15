"use client"

import React from "react"
import { motion } from "framer-motion"

interface TimelineItemProps {
  year: string
  title: string
  description: string
}

export default function TimelineItem({ year, title, description }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative pl-8 border-l border-white/20"
    >
      <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-white transform -translate-x-1.5"></div>
      <span className="text-sm text-gray-400">{year}</span>
      <h4 className="text-xl font-bold mt-1">{title}</h4>
      <p className="text-gray-300 mt-1">{description}</p>
    </motion.div>
  )
} 