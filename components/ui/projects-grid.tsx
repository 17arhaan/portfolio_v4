"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ExternalLink, Github, X, FileText } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  links: { url: string; icon: any }[]
}

function ProjectCard({
  title,
  description,
  tags,
  links,
  image,
}: {
  title: string
  description: string
  tags: string[]
  links: { url: string; icon: any }[]
  image: string
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Define accent colors and gradients for each project
  const getAccentColor = (title: string) => {
    switch (title) {
      case "Driver Drowsiness Recognition System":
        return {
          border: "border-[#b7d455]/30 hover:border-[#b7d455]/50 hover:shadow-[0_0_15px_rgba(183,212,85,0.3)]",
          gradient: "from-[#b7d455]/20 via-[#b7d455]/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(183,212,85,0.2)]",
          text: "group-hover:text-[#b7d455]",
          button: "hover:bg-[#b7d455]/20 hover:text-[#b7d455]",
          tag: "hover:bg-[#b7d455]/20 hover:text-[#b7d455]",
          modal: "border-[#b7d455]/30",
          dot: "border-[#b7d455]/60"
        }
      case "DriveMind":
        return {
          border: "border-pink-500/30 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]",
          gradient: "from-pink-500/20 via-pink-500/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]",
          text: "group-hover:text-pink-400",
          button: "hover:bg-pink-500/20 hover:text-pink-400",
          tag: "hover:bg-pink-500/20 hover:text-pink-400",
          modal: "border-pink-500/30",
          dot: "border-pink-500/60"
        }
      case "J.A.R.V.I.S":
        return {
          border: "border-pink-500/30 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]",
          gradient: "from-pink-500/20 via-pink-500/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]",
          text: "group-hover:text-pink-400",
          button: "hover:bg-pink-500/20 hover:text-pink-400",
          tag: "hover:bg-pink-500/20 hover:text-pink-400",
          modal: "border-pink-500/30",
          dot: "border-pink-500/60"
        }
      case "W.E.A.L.T.H":
        return {
          border: "border-green-500/30 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]",
          gradient: "from-green-500/20 via-green-500/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]",
          text: "group-hover:text-green-400",
          button: "hover:bg-green-500/20 hover:text-green-400",
          tag: "hover:bg-green-500/20 hover:text-green-400",
          modal: "border-green-500/30",
          dot: "border-green-500/60"
        }
      case "Twitter Sentiment Analysis":
        return {
          border: "border-yellow-500/30 hover:border-yellow-500/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]",
          gradient: "from-yellow-500/20 via-yellow-500/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]",
          text: "group-hover:text-yellow-400",
          button: "hover:bg-yellow-500/20 hover:text-yellow-400",
          tag: "hover:bg-yellow-500/20 hover:text-yellow-400",
          modal: "border-yellow-500/30",
          dot: "border-yellow-500/60"
        }
      case "Morpheus 3D":
        return {
          border: "border-white/30 hover:border-white/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
          gradient: "from-white/20 via-white/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
          text: "group-hover:text-white",
          button: "hover:bg-white/20 hover:text-white",
          tag: "hover:bg-white/20 hover:text-white",
          modal: "border-white/30",
          dot: "border-white/60"
        }
      case "SnakeCV":
        return {
          border: "border-purple-500/30 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
          gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
          text: "group-hover:text-purple-400",
          button: "hover:bg-purple-500/20 hover:text-purple-400",
          tag: "hover:bg-purple-500/20 hover:text-purple-400",
          modal: "border-purple-500/30",
          dot: "border-purple-500/60"
        }
      case "TherapAI":
        return {
          border: "border-orange-500/30 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]",
          gradient: "from-orange-500/20 via-orange-500/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]",
          text: "group-hover:text-orange-400",
          button: "hover:bg-orange-500/20 hover:text-orange-400",
          tag: "hover:bg-orange-500/20 hover:text-orange-400",
          modal: "border-orange-500/30",
          dot: "border-orange-500/60"
        }
      case "Visualify":
        return {
          border: "border-teal-500/30 hover:border-teal-500/50 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]",
          gradient: "from-teal-500/20 via-teal-500/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]",
          text: "group-hover:text-teal-400",
          button: "hover:bg-teal-500/20 hover:text-teal-400",
          tag: "hover:bg-teal-500/20 hover:text-teal-400",
          modal: "border-teal-500/30",
          dot: "border-teal-500/60"
        }
      case "Mind Mapper":
        return {
          border: "border-red-500/30 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]",
          gradient: "from-red-500/20 via-red-500/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]",
          text: "group-hover:text-red-400",
          button: "hover:bg-red-500/20 hover:text-red-400",
          tag: "hover:bg-red-500/20 hover:text-red-400",
          modal: "border-red-500/30",
          dot: "border-red-500/60"
        }
      case "Humanoid Simulation":
        return {
          border: "border-cyan-500/30 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]",
          gradient: "from-cyan-500/20 via-cyan-500/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
          text: "group-hover:text-cyan-400",
          button: "hover:bg-cyan-500/20 hover:text-cyan-400",
          tag: "hover:bg-cyan-500/20 hover:text-cyan-400",
          modal: "border-cyan-500/30",
          dot: "border-cyan-500/60"
        }
      case "Facial Emotion Recognition using CNN":
        return {
          border: "border-[#c15ffd]/30 hover:border-[#c15ffd]/50 hover:shadow-[0_0_15px_rgba(193,95,253,0.3)]",
          gradient: "from-[#c15ffd]/20 via-[#c15ffd]/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(193,95,253,0.2)]",
          text: "group-hover:text-[#c15ffd]",
          button: "hover:bg-[#c15ffd]/20 hover:text-[#c15ffd]",
          tag: "hover:bg-[#c15ffd]/20 hover:text-[#c15ffd]",
          modal: "border-[#c15ffd]/30",
          dot: "border-[#c15ffd]/60"
        }
      case "Ceaser":
        return {
          border: "border-[#ff99d8]/30 hover:border-[#ff99d8]/50 hover:shadow-[0_0_15px_rgba(255,153,216,0.3)]",
          gradient: "from-[#ff99d8]/20 via-[#ff99d8]/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(255,153,216,0.2)]",
          text: "group-hover:text-[#ff99d8]",
          button: "hover:bg-[#ff99d8]/20 hover:text-[#ff99d8]",
          tag: "hover:bg-[#ff99d8]/20 hover:text-[#ff99d8]",
          modal: "border-[#ff99d8]/30",
          dot: "border-[#ff99d8]/60"
        }
      case "Legacy IP Suite":
        return {
          border: "border-[#ff5757]/30 hover:border-[#ff5757]/50 hover:shadow-[0_0_15px_rgba(255,87,87,0.3)]",
          gradient: "from-[#ff5757]/20 via-[#ff5757]/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(255,87,87,0.2)]",
          text: "group-hover:text-[#ff5757]",
          button: "hover:bg-[#ff5757]/20 hover:text-[#ff5757]",
          tag: "hover:bg-[#ff5757]/20 hover:text-[#ff5757]",
          modal: "border-[#ff5757]/30",
          dot: "border-[#ff5757]/60"
        }
      case "Speedy":
        return {
          border: "border-[#00d4ff]/30 hover:border-[#00d4ff]/50 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]",
          gradient: "from-[#00d4ff]/20 via-[#00d4ff]/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]",
          text: "group-hover:text-[#00d4ff]",
          button: "hover:bg-[#00d4ff]/20 hover:text-[#00d4ff]",
          tag: "hover:bg-[#00d4ff]/20 hover:text-[#00d4ff]",
          modal: "border-[#00d4ff]/30",
          dot: "border-[#00d4ff]/60"
        }
      case "Code Safe":
        return {
          border: "border-[#ff8600]/30 hover:border-[#ff8600]/50 hover:shadow-[0_0_15px_rgba(255,134,0,0.3)]",
          gradient: "from-[#ff8600]/20 via-[#ff8600]/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(255,134,0,0.2)]",
          text: "group-hover:text-[#ff8600]",
          button: "hover:bg-[#ff8600]/20 hover:text-[#ff8600]",
          tag: "hover:bg-[#ff8600]/20 hover:text-[#ff8600]",
          modal: "border-[#ff8600]/30",
          dot: "border-[#ff8600]/60"
        }
      case "Maze Solver":
        return {
          border: "border-[#5170ff]/30 hover:border-[#5170ff]/50 hover:shadow-[0_0_15px_rgba(81,112,255,0.3)]",
          gradient: "from-[#5170ff]/20 via-[#5170ff]/10 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(81,112,255,0.2)]",
          text: "group-hover:text-[#5170ff]",
          button: "hover:bg-[#5170ff]/20 hover:text-[#5170ff]",
          tag: "hover:bg-[#5170ff]/20 hover:text-[#5170ff]",
          modal: "border-[#5170ff]/30",
          dot: "border-[#5170ff]/60"
        }
      default:
        return {
          border: "border-white/10 hover:border-white/30",
          gradient: "from-white/10 via-white/5 to-transparent",
          glow: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
          text: "group-hover:text-white",
          button: "hover:bg-white/20 hover:text-white",
          tag: "hover:bg-white/20 hover:text-white",
          modal: "border-white/30",
          dot: "border-white/60"
        }
    }
  }

  const colors = getAccentColor(title)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
        onClick={() => setIsModalOpen(true)}
        className={`group border ${colors.border} rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm cursor-pointer transition-all duration-300 relative ${colors.glow}`}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Reflective overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            transform: "translateX(-100%)",
          }}
          animate={{
            transform: ["translateX(-100%)", "translateX(100%)"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />

        {/* Animated corner accents */}
        <motion.div
          className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-0 group-hover:opacity-100"
          style={{ borderColor: colors.border.split('/')[0] }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 opacity-0 group-hover:opacity-100"
          style={{ borderColor: colors.border.split('/')[0] }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          {/* Image overlay gradient */}
          <div className={`absolute inset-0 bg-gradient-to-t ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Animated scan line effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
              height: "2px",
            }}
            animate={{
              y: ["0%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>
        <div className="p-4 relative">
          <h3 className={`text-xl font-bold text-center transition-colors duration-300 ${colors.text}`}>{title}</h3>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 mt-[56px] md:mt-0"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`bg-zinc-900 border ${colors.modal} rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto m-2 sm:m-4`}
            >
              <motion.div
                className="p-4 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Header Section */}
                <motion.div
                  className="flex flex-col md:flex-row items-start justify-between mb-6"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start w-full">
                    <motion.div
                      className="w-full md:w-96 h-48 rounded-lg overflow-hidden md:mr-4 bg-white/5 flex items-center justify-center border border-white/10 mb-4 md:mb-0 relative"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 384px"
                      />
                    </motion.div>
                    <div className="flex-1 text-center md:text-left">
                      <motion.h3
                        className={`text-xl md:text-2xl font-bold ${colors.text}`}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        {title}
                      </motion.h3>
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                        {links.length > 0 ? (
                          links.map((link, index) => (
                            <motion.a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className={`flex items-center px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 ${colors.button} rounded-md text-sm font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
                            >
                              {link.icon === Github ? (
                                <>
                                  <Github className="w-4 h-4 mr-2" />
                                  View Code
                                </>
                              ) : (
                                <>
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View Demo
                                </>
                              )}
                            </motion.a>
                          ))
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-sm font-medium text-white/80"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Confidential Project for Questel
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {title === "Ceaser" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-2"
                      >
                        <Image
                          src="/questel.jpg"
                          alt="Questel Logo"
                          width={80}
                          height={40}
                          className="rounded-sm"
                        />
                      </motion.div>
                    )}
                    <motion.button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-white p-1 z-10"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                </motion.div>

                <div className="space-y-8">
                  {/* Description Section */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.div
                      className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full mb-6"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />

                    <div className="space-y-4">
                      {description.split('\n\n').map((point, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                          className="flex items-start"
                        >
                          <motion.div
                            className={`w-2 h-2 rounded-full border-2 ${colors.dot} mt-2 mr-3 flex-shrink-0`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                            whileHover={{ scale: 1.5 }}
                          />
                          <p className="text-gray-200 text-sm md:text-base">{point.replace('• ', '')}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Tags Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <motion.div
                      className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full mb-6"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {tags.map((tag, index) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className={`px-3 py-1.5 bg-white/10 ${colors.tag} rounded-sm text-sm transition-colors`}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function ProjectsGrid() {
  const [showAllProjects, setShowAllProjects] = useState(false)
  
  const projects = [
    {
      id: 14,
      title: "Legacy IP Suite",
      description:
        "• Built a Python + SQL pipeline to migrate 7,500+ legacy records (clients, patents, trademarks, deadlines) from MySQL to PostgreSQL\n\n• Implemented multi-level validation (schema, business rules, referential integrity) and detailed audit logging\n\n• Automated data standardization and validation utilities (date parsing, country code normalization, duplicate resolution)\n\n• Surfaced 2,000+ quality issues and improved migration integrity to 95% preservation\n\n• Created comprehensive ETL pipeline with data quality assessment and modern web interface",
      image: "/legacy.png",
      tags: [
        "Python",
        "Docker",
        "PostgreSQL",
        "HTML",
        "ETL Pipeline",
        "Data Migration",
        "MySQL",
        "Data Validation",
        "Business Rules",
        "Audit Logging",
        "Data Quality",
        "Web Interface",
        "REST API",
        "FastAPI",
        "SQLAlchemy"
      ],
      links: [
        { url: "https://github.com/17arhaan/Legacy-IP-Suite", icon: Github },
      ],
    },
    {
      id: 16,
      title: "Code Safe",
      description:
        "• Developed an AI-powered security vulnerability scanner using OpenAI and Anthropic top models for comprehensive codebase analysis\n\n• Implemented full-stack Next.js application with Python backend to detect critical vulnerability types (RCE, LFI, XSS, SQLI, SSRF, AFO, IDOR)\n\n• Integrated advanced prompt engineering and LLM orchestration with confidence scoring algorithms to minimize false positives\n\n• Achieved high-accuracy vulnerability detection with detailed exploits and remediation guidance for security applications\n\n• Built comprehensive CLI tool with Docker support and web interface for enterprise security teams\n\n• Implemented multi-model AI analysis with customizable confidence thresholds and detailed reporting",
      image: "/codesafe.png",
      tags: [
        "Python",
        "Next.js",
        "TypeScript",
        "OpenAI API",
        "Anthropic API",
        "LLM Orchestration",
        "Security Analysis",
        "Vulnerability Detection",
        "Prompt Engineering",
        "Docker",
        "CLI Tool",
        "Full-Stack Development",
        "AI/ML",
        "Cybersecurity",
        "Static Analysis",
        "Code Security",
        "Penetration Testing",
        "Bug Hunting"
      ],
      links: [
        { url: "https://github.com/17arhaan/Code_Safe", icon: Github },
      ],
    },
    {
      id: 17,
      title: "Maze Solver",
      description:
        "• Developed a comprehensive reinforcement learning project implementing Monte Carlo, SARSA, and Q-Learning algorithms for autonomous maze navigation\n\n• Modeled maze environment as a Markov Decision Process (MDP) with state space, action space, transition probabilities, and reward functions\n\n• Implemented ε-greedy exploration strategy with decaying epsilon to balance exploration and exploitation during learning\n\n• Built comparative analysis framework tracking convergence behavior, policy optimality, and sample efficiency across algorithms\n\n• Created comprehensive visualization system including learning curves, policy heatmaps, and trajectory visualization\n\n• Achieved optimal policy convergence with Q-Learning demonstrating superior sample efficiency and faster convergence rates",
      image: "/maze_solver.png",
      tags: [
        "Python",
        "Reinforcement Learning",
        "Monte Carlo",
        "SARSA",
        "Q-Learning",
        "Markov Decision Process",
        "Machine Learning",
        "AI",
        "Algorithm Comparison",
        "Policy Optimization",
        "Exploration Strategy",
        "Value Function",
        "Temporal Difference",
        "Episodic Learning",
        "Bootstrapping",
        "Convergence Analysis",
        "Data Visualization"
      ],
      links: [
        { url: "https://github.com/17arhaan/Maze_Solver", icon: Github },
      ],
    },
    {
      id: 3,
      title: "Humanoid Simulation",
      description:
        "• Developed a physics-based humanoid robot simulation using Python and PyBullet\n\n• Implemented reinforcement learning algorithms for bipedal locomotion control\n\n• Created custom reward functions and state representations for stable walking\n\n• Integrated motion capture data for natural movement patterns\n\n• Built a real-time visualization system with PyOpenGL\n\n• Implemented collision detection and response for realistic interactions\n\n• Added support for different terrains and environmental conditions",
      image: "/mujoco.png",
      tags: [
        "Python",
        "PyBullet",
        "PyTorch",
        "Reinforcement Learning",
        "OpenGL",
        "Physics Simulation",
        "Motion Planning",
        "Control Systems",
        "Robotics",
        "3D Graphics",
      ],
      links: [
        { url: "https://github.com/17arhaan/Humanoid_Simulation", icon: Github },
      ],
    },
    {
      id: 12,
      title: "Facial Emotion Recognition using CNN",
      description:
        "• Developed a CNN-based facial emotion recognition system trained on Kaggle dataset\n\n• Implemented real-time detection for 7 emotions with high accuracy\n\n• Integrated Haar Cascade classifiers for robust face detection\n\n• Built comprehensive CNN architecture with regularization techniques\n\n• Created Jupyter notebook implementation with saved model weights (200 epochs)\n\n• Achieved multi-face emotion classification in real-time\n\n• Designed as foundation for emotion-aware applications",
      image: "/face_recog.png",
      tags: [
        "Python",
        "TensorFlow",
        "Keras",
        "OpenCV",
        "CNN",
        "Computer Vision",
        "Deep Learning",
        "Emotion Recognition",
        "Real-time Processing",
        "Jupyter Notebook",
        "NumPy",
        "Pandas",
        "Matplotlib",
      ],
      links: [
        { url: "https://github.com/17arhaan/facial-recognition", icon: Github },
      ],
    },
    {
      id: 15,
      title: "Speedy",
      description:
        "• Built a modern, interactive reaction time test using Next.js, Framer Motion, and Tailwind CSS\n\n• Implemented random delay system to prevent anticipation and ensure accurate testing\n\n• Created performance metrics with detailed feedback and best time tracking\n\n• Developed beautiful animations and smooth transitions using Framer Motion\n\n• Added dark mode support and fully responsive design for all devices\n\n• Integrated shadcn/ui components for consistent and modern UI design\n\n• Built comprehensive performance rating system with 8 different speed categories",
      image: "/speedy_l.png",
      tags: [
        "Next.js",
        "TypeScript",
        "Framer Motion",
        "Tailwind CSS",
        "shadcn/ui",
        "React",
        "Interactive Testing",
        "Performance Metrics",
        "Dark Mode",
        "Responsive Design",
        "Animation",
        "User Experience",
        "Real-time Testing",
        "Web Application"
      ],
      links: [
        { url: "https://github.com/17arhaan/Speedy", icon: Github },
      ],
    },
    {
      id: 9,
      title: "Mind Mapper",
      description:
        "• Built an AI-powered mind map generator using Next.js and React Flow\n\n• Integrated Google Gemini API for intelligent content generation with robust error handling\n\n• Implemented interactive node-based visualization with drag-and-drop functionality\n\n• Created custom node and edge components for enhanced visual appeal\n\n• Added export functionality for saving mind maps as high-quality PNG images\n\n• Developed a responsive design with dark mode support\n\n• Implemented real-time node expansion and connection management\n\n• Added comprehensive error handling and user feedback system",
      image: "/mindmapper_l.png",
      tags: [
        "Next.js",
        "TypeScript",
        "React Flow",
        "Google Gemini API",
        "Tailwind CSS",
        "shadcn/ui",
        "Node.js",
        "AI/ML",
        "Error Handling",
      ],
      links: [
        { url: "https://v0-mindmap-app-sigma.vercel.app", icon: ExternalLink },
        { url: "https://github.com/17arhaan/Mind_Mapper", icon: Github },
      ],
    },
    {
      id: 11,
      title: "Driver Drowsiness Recognition System",
      description:
        "• Developed a real-time driver drowsiness detection system using Next.js and computer vision technologies\n\n• Implemented facial landmark detection and eye aspect ratio calculation for accurate drowsiness detection\n\n• Created a responsive dashboard with real-time monitoring and alert system\n\n• Integrated WebSocket for live video streaming and instant alerts\n\n• Built a modern UI with Tailwind CSS and Framer Motion for smooth animations\n\n• Implemented error handling and fallback mechanisms for robust performance\n\n• Added comprehensive documentation and setup instructions",
      image: "/drowsiness.png",
      tags: [
        "Next.js",
        "TypeScript",
        "Computer Vision",
        "WebSocket",
        "Tailwind CSS",
        "Framer Motion",
        "OpenCV",
        "dlib",
        "Real-time Processing",
        "Responsive Design"
      ],
      links: [
        { url: "https://driver-drowsiness-recognition.vercel.app/", icon: ExternalLink },
        { url: "https://github.com/17arhaan/driver_drowsiness_recognition", icon: Github },
      ],
    },
    {
      id: 10,
      title: "DriveMind",
      description:
        "• Designed and implemented a real-time multimodal data pipeline integrating traffic camera feeds, audio streams, and text-based incident reports\n\n• Developed reinforcement learning algorithms (PPO) using Stable-Baselines3 in a custom Gymnasium environment for adaptive route decisions\n\n• Engineered custom reward functions optimizing for safety, travel time, and fuel efficiency; achieved a 15% reduction in average commute time\n\n• Developed FastAPI backend serving real-time data and RL inference endpoints; implemented WebSocket streams for continuous updates\n\n• Created a cross-platform React Native mobile app with dynamic map visualization (Mapbox SDK) and voice-guided navigation\n\n• Validated performance in CARLA and SUMO simulators before deploying to limited real-world data; monitored model drift and retrained periodically",
      image: "/drivemind.png",
      tags: [
        "Python",
        "Reinforcement Learning",
        "Stable-Baselines3",
        "PyTorch",
        "YOLOv8",
        "Whisper",
        "FastAPI",
        "React Native",
        "Mapbox SDK",
        "Docker",
        "Kubernetes",
        "AWS",
        "PostgreSQL",
        "Redis",
        "CARLA",
        "SUMO",
        "WebSockets",
        "Computer Vision",
      ],
      links: [
        { url: "https://github.com/17arhaan/DriveMind", icon: Github },
      ],
    },
    {
      id: 1,
      title: "Morpheus 3D",
      description:
        "• Developed a 3D model generation platform using Hyper3D Rodin API with React and Three.js\n\n• Implemented text-to-3D and image-to-3D model generation with customizable quality settings\n\n• Created a user-friendly interface with real-time 3D model preview and orbit controls\n\n• Integrated multiple output formats (GLB, USDZ, FBX, OBJ, STL) with quality options\n\n• Built a responsive UI with shadcn/ui components and React Three Fiber for 3D rendering\n\n• Implemented advanced features like T/A pose for human models and material customization",
      image: "/3d_l.png",
      tags: [
        "Next.js",
        "C++",
        "TypeScript",
        "React",
        "Hyper3D API",
        "WebGL",
        "shadcn/ui",
        "React Three Fiber",
        "Tailwind CSS",
      ],
      links: [
        { url: "https://github.com/17arhaan/Morpheus3D", icon: Github },
        { url: "https://morpheus3-d.vercel.app/", icon: ExternalLink },
      ],
    },
    {
      id: 2,
      title: "J.A.R.V.I.S",
      description:
        "• Built a sophisticated AI assistant with multi-modal capabilities using Python, TensorFlow, and advanced NLP models\n\n• Implemented real-time object detection with YOLOv8 achieving 91% mAP, and speech recognition with 95% accuracy\n\n• Developed a CNN-based face authentication system with 98% accuracy, supporting multi-user profiles and dynamic learning\n\n• Created a modular architecture with 20+ custom plugins for task automation, system control, and API integrations\n\n• Integrated OpenAI's GPT models for context-aware conversations and task understanding\n\n• Engineered a custom wake word detection system with 99% accuracy using MFCC features and Deep Learning",
      image: "/jarvis_l.png",
      tags: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "YOLOv8",
        "OpenAI API",
        "Whisper ASR",
        "CNN",
        "RNN",
        "LSTM",
        "GRU",
        "FastAPI",
      ],
      links: [
        { url: "https://github.com/17arhaan/J.A.R.V.I.S", icon: Github },
      ],
    },
    {
      id: 4,
      title: "W.E.A.L.T.H",
      description:
        "• Engineered a full-stack finance tracking application with Next.js 13, TypeScript, and PostgreSQL\n\n• Implemented real-time transaction tracking with WebSocket integration for live updates\n\n• Built a RESTful API with Express.js featuring JWT authentication and role-based access control\n\n• Designed a responsive UI with Tailwind CSS and Framer Motion for smooth animations\n\n• Integrated Plaid API for secure bank account linking and automated transaction imports\n\n• Developed custom analytics dashboard with Chart.js for visualizing spending patterns\n\n• Implemented automated bill detection and recurring payment tracking using ML algorithms",
      image: "/wealth_l.png",
      tags: [
        "Next.js",
        "TypeScript",
        "Express.js",
        "Tailwind CSS",
        "PostgreSQL",
        "Prisma",
        "WebSocket",
        "JWT",
        "Plaid API",
        "Chart.js",
      ],
      links: [
        { url: "https://wealth-pi.vercel.app/", icon: ExternalLink },
        { url: "https://github.com/17arhaan/W.E.A.L.T.H", icon: Github },
      ],
    },
    {
      id: 5,
      title: "Twitter Sentiment Analysis",
      description:
        "• Built a real-time Twitter sentiment analysis platform using Next.js and Python\n\n• Implemented custom NLP models with 92% accuracy for sentiment classification\n\n• Created an interactive dashboard with real-time sentiment visualization using Chart.js\n\n• Developed a secure authentication system with JWT and password hashing\n\n• Built a responsive UI with shadcn/ui components and Tailwind CSS\n\n• Integrated Twitter API for real-time tweet fetching and analysis\n\n• Added user profiles with analysis history and saved searches",
      image: "/sentiment_l.png",
      tags: ["Next.js", "TypeScript", "Python", "Tailwind CSS", "Chart.js", "JWT", "shadcn/ui", "Twitter API"],
      links: [
        { url: "https://sentiment-analysis-sepia.vercel.app/", icon: ExternalLink },
        { url: "https://github.com/17arhaan/Sentiment_Analysis", icon: Github },
      ],
    },
    {
      id: 6,
      title: "SnakeCV",
      description:
        "• Developed a multi-mode Snake Game with computer vision controls using Python, OpenCV, and React\n\n• Implemented real-time hand gesture recognition with 98% accuracy using MediaPipe and custom CV models\n\n• Created an AI agent using Q-learning achieving average scores of 50+ points\n\n• Built a responsive web version with React and TypeScript featuring custom animations\n\n• Designed a replay system storing game states in IndexedDB for offline access\n\n• Integrated WebRTC for real-time multiplayer functionality with <100ms latency\n\n• Added leaderboard system with Firebase real-time database integration",
      image: "/snake_l.png",
      tags: [
        "Python",
        "OpenCV",
        "MediaPipe",
        "React",
        "TypeScript",
        "WebRTC",
        "Firebase",
        "Q-Learning",
        "WebGL",
        "Socket.io",
      ],
      links: [
        { url: "https://github.com/17arhaan/Snake_CV_ML", icon: Github },
      ],
    },
    {
      id: 7,
      title: "TherapAI",
      description:
        "• Built an AI-powered mental health platform using Python, FastAPI, and React\n\n• Integrated GPT-4 with custom fine-tuning for therapeutic conversations achieving 90% user satisfaction\n\n• Implemented real-time emotion detection from text and voice with 94% accuracy\n\n• Developed secure user authentication and HIPAA-compliant data storage\n\n• Created a progressive web app with offline support and push notifications\n\n• Built an emergency response system with automated escalation protocols\n\n• Integrated with external mental health resources and crisis hotlines",
      image: "/therapai.png",
      tags: [
        "Python",
        "FastAPI",
        "PyTorch",
        "TensorFlow",
        "Transformers",
        "Hugging Face",
        "NumPy",
        "Pandas",
        "MongoDB",
        "Docker",
      ],
      links: [
        { url: "https://github.com/17arhaan/TherapAI", icon: Github },
      ],
    },
    {
      id: 8,
      title: "Visualify",
      description:
        "• Developed a Spotify data visualization platform using the Spotify Web API and D3.js\n\n• Created interactive charts and graphs showing user listening patterns and music preferences\n\n• Implemented OAuth 2.0 authentication for secure Spotify account integration\n\n• Built responsive data visualizations showing top tracks, artists, and genres over time\n\n• Designed an intuitive dashboard with smooth animations and transitions\n\n• Added features for playlist analysis and music recommendation insights\n\n• Optimized for both desktop and mobile viewing experiences",
      image: "/visualify_l.png",
      tags: [
        "React",
        "D3.js",
        "Spotify API",
        "OAuth 2.0",
        "Data Visualization",
        "Chart.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
      ],
      links: [
        { url: "https://github.com/17arhaan/Visualify", icon: Github },
      ],
    },
  ]

  // Separate projects into featured and vibe coded sections
  const featuredProjects = projects.filter(project => 
    ['Ceaser', 'Legacy IP Suite', 'Code Safe', 'Humanoid Simulation', 'Facial Emotion Recognition using CNN', 'DriveMind', 'Maze Solver'].includes(project.title)
  )
  
  const vibeCodedProjects = projects.filter(project => 
    ['Speedy', 'Mind Mapper', 'Morpheus 3D', 'W.E.A.L.T.H', 'Visualify', 'Twitter Sentiment Analysis', 'SnakeCV', 'J.A.R.V.I.S', 'TherapAI'].includes(project.title)
  )

  // Show only first 3 featured projects initially
  const displayedFeaturedProjects = showAllProjects ? featuredProjects : featuredProjects.slice(0, 3)
  const displayedVibeCodedProjects = showAllProjects ? vibeCodedProjects : []

  return (
    <div className="mt-16">
      {/* Featured Projects */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedFeaturedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            tags={project.tags}
            links={project.links}
            image={project.image}
          />
        ))}
      </div>

      {/* Vibe Coded Section */}
      {showAllProjects && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          {/* Divider */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4 w-full max-w-md">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="px-6 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full backdrop-blur-sm"
              >
                <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Vibe Coded
                </span>
              </motion.div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          </div>

          {/* Vibe Coded Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedVibeCodedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                links={project.links}
                image={project.image}
              />
            ))}
          </div>
        </motion.div>
      )}
      
      {/* View More Button */}
      {!showAllProjects && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            onClick={() => setShowAllProjects(true)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              View More Projects
              <ChevronDown className="w-4 h-4" />
            </span>
          </motion.button>
        </motion.div>
      )}
    </div>
  )
} 