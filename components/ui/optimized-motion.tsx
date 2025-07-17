"use client"

import React from "react"
import { motion, MotionProps } from "framer-motion"

// Optimized motion div with reduced animation complexity
export const OptimizedMotionDiv = ({ 
  children, 
  className,
  initial = { opacity: 0, y: 20 },
  whileInView = { opacity: 1, y: 0 },
  viewport = { once: true, margin: "-50px" },
  transition = { duration: 0.5 },
  ...props 
}: MotionProps & { className?: string }) => (
  <motion.div
    className={className}
    initial={initial}
    whileInView={whileInView}
    viewport={viewport}
    transition={transition}
    {...props}
  >
    {children}
  </motion.div>
)

// Optimized hover effects with reduced complexity
export const OptimizedHoverCard = ({ 
  children, 
  className,
  whileHover = { y: -2, scale: 1.02 },
  transition = { type: "spring", stiffness: 400, damping: 30 },
  ...props 
}: MotionProps & { className?: string }) => (
  <motion.div
    className={className}
    whileHover={whileHover}
    transition={transition}
    {...props}
  >
    {children}
  </motion.div>
)

// Optimized loading animation
export const OptimizedLoadingSpinner = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={`w-4 h-4 border-2 border-white/20 border-t-white rounded-full ${className}`}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    }}
  />
) 