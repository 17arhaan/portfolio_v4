"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface HamburgerMenuProps {
  scrollToSection: (id: string) => void
  activeSection: string
}

export default function HamburgerMenu({ scrollToSection, activeSection }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "freelance", label: "Freelance" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "skills", label: "Skills" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" },
  ]

  const handleItemClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsOpen(false)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[60] w-8 h-8 flex flex-col justify-center items-center space-y-1"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 6 : 0,
          }}
          className="block h-0.5 w-6 bg-white transition-all duration-300"
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          className="block h-0.5 w-6 bg-white transition-all duration-300"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -6 : 0,
          }}
          className="block h-0.5 w-6 bg-white transition-all duration-300"
        />
      </button>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            {/* Menu Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  className="mb-6"
                >
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide hover:text-gray-300 transition-colors duration-300 ${
                      activeSection === item.id ? "text-white" : "text-white/80"
                    }`}
                  >
                    {item.label}
                  </button>
                  {/* Active indicator dot */}
                  {activeSection === item.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-2"
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Background gradient effect */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}