"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, ExternalLink, X, Briefcase } from "lucide-react"
import Image from "next/image"
import SectionHeader from "@/components/ui/section-header"

type FreelanceWork = {
  id: number
  title: string
  company: string
  period: string
  description: string[]
  skills: string[]
  logoUrl: string
  website?: string
}

export default function FreelanceSection() {
  const [selectedWork, setSelectedWork] = useState<FreelanceWork | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const freelanceWorks: FreelanceWork[] = [
    {
      id: 1,
      title: "Frontend Website Development",
      company: "Civitas",
      period: "",
      description: [
        "Developed a modern, responsive frontend website for a real estate firm, creating an intuitive property showcase platform with advanced search and filtering capabilities.",
        "Built interactive property galleries with high-resolution image displays, virtual tour integration, and mobile-optimized viewing experiences for potential buyers.",
        "Implemented dynamic property listing pages with detailed information displays, contact forms, and seamless navigation between property categories.",
        "Created responsive design ensuring optimal user experience across all devices, from desktop computers to mobile phones and tablets.",
        "Integrated modern web technologies and best practices to deliver a professional, fast-loading website that effectively showcases the firm's property portfolio."
      ],
      skills: ["ReactJs", "TypeScript", "Tailwind CSS", "UI/UX Design", "Responsive","SEO Optimized"],
      logoUrl: "/civitas.jpg",
      website: "https://civitas.com"
    },
    {
      id: 2,
      title: "Frontend Website Development",
      company: "AILegal",
      period: "", 
      description: [
        "Developed a professional frontend website for a legal firm, creating a comprehensive platform to showcase legal services, attorney profiles, and case studies.",
        "Built user-friendly consultation booking systems with integrated contact forms, appointment scheduling, and client inquiry management features.",
        "Designed responsive layouts optimized for legal content presentation, including practice area descriptions, legal resources, and client testimonials.",
        "Implemented modern web standards and accessibility features to ensure the website meets professional legal industry requirements and compliance standards.",
        "Created an intuitive navigation structure allowing potential clients to easily find relevant legal services and connect with the appropriate legal professionals."
      ],
      skills: ["ReactJs", "TypeScript", "Tailwind CSS", "UI/UX Design", "Responsive","SEO Optimized"],
      logoUrl: "/ai-legal-logo.jpeg",
      website: "https://ailegal.com"
    }
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedWork(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <section id="freelance" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <SectionHeader title="Freelance Work" icon={<Users className="w-6 h-6" />} />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {freelanceWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="relative group cursor-pointer perspective-1000"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedWork(work)}
            >
              {/* Main Card */}
              <motion.div
                className="relative bg-gradient-to-br from-zinc-900/80 to-black/60 backdrop-blur-md border border-white/10 rounded-xl p-6 overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: index % 2 === 0 ? 5 : -5,
                  z: 50
                }}
                transition={{ 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Animated background with textured effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500"
                  style={{
                    background: work.company === 'Civitas' 
                      ? 'radial-gradient(circle at 30% 50%, rgba(239, 68, 68, 0.15), rgba(251, 146, 60, 0.1)), repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(239, 68, 68, 0.05) 2px, rgba(239, 68, 68, 0.05) 4px)'
                      : 'radial-gradient(circle at 70% 50%, rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.1)), repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(37, 99, 235, 0.05) 2px, rgba(37, 99, 235, 0.05) 4px)'
                  }}
                />
                
                {/* Glowing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: work.company === 'Civitas'
                      ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(251, 146, 60, 0.2))'
                      : 'linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(59, 130, 246, 0.2))',
                    padding: '2px',
                    borderRadius: '12px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                  }}
                />

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/20 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 3) * 20}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
                {/* Content */}
                <div className="relative z-10 flex items-start mb-6">
                  <motion.div
                    className={`relative rounded-xl overflow-hidden mr-6 flex items-center justify-center flex-shrink-0 group ${
                      work.company === 'Civitas' ? 'w-20 h-20' : 'w-24 h-16'
                    }`}
                    whileHover={{ 
                      scale: 1.1,
                      rotateZ: 5
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Logo glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: work.company === 'Civitas'
                          ? "radial-gradient(circle, rgba(239, 68, 68, 0.4), transparent)"
                          : "radial-gradient(circle, rgba(37, 99, 235, 0.4), transparent)",
                        filter: "blur(8px)",
                      }}
                    />
                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl w-full h-full flex items-center justify-center overflow-hidden">
                      <Image
                        src={work.logoUrl}
                        alt={`${work.company} logo`}
                        width={work.company === 'Civitas' ? 80 : 96}
                        height={work.company === 'Civitas' ? 80 : 64}
                        className={`w-full h-full ${
                          work.company === 'Civitas' ? 'object-cover' : 'object-contain'
                        }`}
                        quality={90}
                      />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3 
                      className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.02 }}
                    >
                      {work.company}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-300 text-base mb-2 leading-relaxed"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {work.title}
                    </motion.p>
                    {work.period && (
                      <p className="text-gray-400 text-sm">{work.period}</p>
                    )}
                  </div>
                </div>

                {/* Brief description */}
                <motion.p 
                  className="relative z-10 text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {work.description[0]}
                </motion.p>

                {/* Skills preview with enhanced styling */}
                <div className="relative z-10 flex flex-wrap gap-2 mb-6">
                  {work.skills.slice(0, 4).map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -2,
                        boxShadow: "0 4px 12px rgba(255,255,255,0.1)"
                      }}
                      transition={{ 
                        duration: 0.2, 
                        delay: skillIndex * 0.1 
                      }}
                      className="px-3 py-1.5 backdrop-blur-sm border border-white/20 rounded-full text-xs text-gray-200 font-medium"
                      style={{
                        background: work.company === 'Civitas'
                          ? "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(251, 146, 60, 0.1))"
                          : "linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.1))",
                        boxShadow: work.company === 'Civitas'
                          ? "0 0 0 1px rgba(239, 68, 68, 0.1)"
                          : "0 0 0 1px rgba(37, 99, 235, 0.1)"
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                  {work.skills.length > 4 && (
                    <motion.span 
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      +{work.skills.length - 4} more
                    </motion.span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="relative z-10 flex items-center justify-between">
                  <motion.div
                    className="text-xs text-gray-500 flex items-center gap-2"
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0.6,
                      x: hoveredIndex === index ? 5 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ rotate: hoveredIndex === index ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </motion.div>
                    <span>Click to view details</span>
                  </motion.div>
                  
                  {work.website && (
                    <motion.a
                      href={work.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-white font-medium overflow-hidden group"
                      whileHover={{ 
                        scale: 1.05,
                        y: -2
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        background: work.company === 'Civitas'
                          ? "linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(251, 146, 60, 0.15))"
                          : "linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(59, 130, 246, 0.15))",
                        border: work.company === 'Civitas'
                          ? "1px solid rgba(239, 68, 68, 0.3)"
                          : "1px solid rgba(37, 99, 235, 0.3)"
                      }}
                    >
                      {/* Button background glow */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: work.company === 'Civitas'
                            ? "linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(251, 146, 60, 0.2))"
                            : "linear-gradient(135deg, rgba(37, 99, 235, 0.4), rgba(59, 130, 246, 0.2))",
                          filter: "blur(8px)",
                        }}
                      />
                      
                      <span className="relative">View Work</span>
                      <motion.div
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </motion.div>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Modal for detailed view */}
        <AnimatePresence>
          {selectedWork && (
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
                className="bg-zinc-900 border border-white/10 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-2 sm:m-4"
              >
                <div className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div className={`rounded-lg overflow-hidden mr-4 bg-white/5 flex items-center justify-center border border-white/10 ${
                        selectedWork.company === 'Civitas' ? 'w-20 h-20' : 'w-24 h-16'
                      }`}>
                        <Image
                          src={selectedWork.logoUrl}
                          alt={`${selectedWork.company} logo`}
                          width={selectedWork.company === 'Civitas' ? 80 : 96}
                          height={selectedWork.company === 'Civitas' ? 80 : 64}
                          className={`w-full h-full ${
                            selectedWork.company === 'Civitas' ? 'object-cover' : 'object-contain'
                          }`}
                          quality={95}
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{selectedWork.company}</h3>
                        <p className="text-lg text-gray-300 mb-1">{selectedWork.title}</p>
                        {selectedWork.period && <p className="text-sm text-gray-400">{selectedWork.period}</p>}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedWork(null)}
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full mb-6" />
                    <ul className="space-y-4">
                      {selectedWork.description.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-white/60 mt-2 mr-3 flex-shrink-0" />
                          <p className="text-gray-200">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full mb-6" />
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedWork.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-white/10 rounded-sm text-sm hover:bg-white/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {/* View Work Button */}
                    {selectedWork.website && (
                      <div className="flex justify-center">
                        <motion.a
                          href={selectedWork.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 text-white"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>View Work</span>
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}