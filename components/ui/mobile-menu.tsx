"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MobileMenuProps {
  scrollToSection: (id: string) => void
  activeSection: string
}

export default function MobileMenu({ scrollToSection, activeSection }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="text-white p-2"
        aria-label="Toggle menu"
      >
        <div className="w-6 space-y-1.5">
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
            className="block h-0.5 w-full bg-white"
          />
          <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="block h-0.5 w-full bg-white" />
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
            className="block h-0.5 w-full bg-white"
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 left-0 right-0 bg-black border-b border-white/10 overflow-hidden"
          >
            <ul className="py-4 px-6">
              {["home", "about", "experience", "projects", "certifications", "skills", "achievements", "contact"].map((item) => (
                <motion.li
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="py-3 border-b border-white/10 last:border-0"
                >
                  <button
                    onClick={() => {
                      scrollToSection(item)
                      setIsOpen(false)
                    }}
                    className={`capitalize text-lg ${activeSection === item ? "text-white" : "text-gray-400"}`}
                  >
                    {item}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 