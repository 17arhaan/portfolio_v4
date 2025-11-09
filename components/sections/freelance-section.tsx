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

type WorkStyleConfig = {
  cardTexture: string
  borderGradient: string
  logoGlow: string
  skillsGradient: string
  skillsShadow: string
  buttonBackground: string
  buttonBorder: string
  buttonGlow: string
  logoWrapperClass: string
  logoWidth: number
  logoHeight: number
  logoFitClass: string
  outerGlow?: string
  innerTint?: string
}

const getWorkStyles = (company: string): WorkStyleConfig => {
  switch (company) {
    case "Civitas":
      return {
        cardTexture:
          "radial-gradient(circle at 30% 50%, rgba(239, 68, 68, 0.1), rgba(251, 146, 60, 0.05), transparent)",
        borderGradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.45), rgba(251, 146, 60, 0.35))",
        logoGlow: "radial-gradient(circle, rgba(239, 68, 68, 0.5), rgba(251, 146, 60, 0.35), transparent)",
        skillsGradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.22), rgba(251, 146, 60, 0.18))",
        skillsShadow: "0 0 0 1px rgba(239, 68, 68, 0.2)",
        buttonBackground: "linear-gradient(135deg, rgba(239, 68, 68, 0.42), rgba(251, 146, 60, 0.28))",
        buttonBorder: "1px solid rgba(239, 68, 68, 0.4)",
        buttonGlow: "linear-gradient(135deg, rgba(239, 68, 68, 0.52), rgba(251, 146, 60, 0.36))",
        logoWrapperClass: "w-20 h-20",
        logoWidth: 80,
        logoHeight: 80,
        logoFitClass: "object-cover",
        outerGlow: "linear-gradient(135deg, rgba(239, 68, 68, 0.28), rgba(251, 146, 60, 0.2))",
        innerTint: "rgba(239, 68, 68, 0.22)",
      }
    case "The Barking Cat":
      return {
        cardTexture:
          "radial-gradient(circle at 40% 30%, rgba(236, 72, 153, 0.12), rgba(139, 92, 246, 0.1), transparent), radial-gradient(circle at 70% 70%, rgba(34, 211, 238, 0.08), transparent)",
        borderGradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.48), rgba(139, 92, 246, 0.36), rgba(34, 211, 238, 0.3))",
        logoGlow: "radial-gradient(circle, rgba(236, 72, 153, 0.55), rgba(139, 92, 246, 0.45), rgba(34, 211, 238, 0.38), transparent)",
        skillsGradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.24), rgba(139, 92, 246, 0.22), rgba(34, 211, 238, 0.18))",
        skillsShadow: "0 0 0 1px rgba(236, 72, 153, 0.24)",
        buttonBackground: "linear-gradient(135deg, rgba(236, 72, 153, 0.44), rgba(139, 92, 246, 0.36), rgba(34, 211, 238, 0.3))",
        buttonBorder: "1px solid rgba(236, 72, 153, 0.42)",
        buttonGlow: "linear-gradient(135deg, rgba(236, 72, 153, 0.54), rgba(139, 92, 246, 0.48), rgba(34, 211, 238, 0.4))",
        logoWrapperClass: "w-20 h-20",
        logoWidth: 80,
        logoHeight: 80,
        logoFitClass: "object-contain",
        outerGlow: "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.24), rgba(34, 211, 238, 0.2))",
        innerTint: "rgba(236, 72, 153, 0.24)",
      }
    case "TBC":
      return {
        cardTexture:
          "radial-gradient(circle at 35% 35%, rgba(236, 72, 153, 0.14), rgba(168, 85, 247, 0.1), transparent), radial-gradient(circle at 70% 70%, rgba(14, 165, 233, 0.1), transparent)",
        borderGradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.48), rgba(168, 85, 247, 0.4), rgba(14, 165, 233, 0.32))",
        logoGlow: "radial-gradient(circle, rgba(236, 72, 153, 0.6), rgba(168, 85, 247, 0.46), rgba(14, 165, 233, 0.34), transparent)",
        skillsGradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.28), rgba(168, 85, 247, 0.24), rgba(14, 165, 233, 0.2))",
        skillsShadow: "0 0 0 1px rgba(236, 72, 153, 0.26)",
        buttonBackground: "linear-gradient(135deg, rgba(236, 72, 153, 0.44), rgba(168, 85, 247, 0.36), rgba(14, 165, 233, 0.3))",
        buttonBorder: "1px solid rgba(236, 72, 153, 0.42)",
        buttonGlow: "linear-gradient(135deg, rgba(236, 72, 153, 0.54), rgba(168, 85, 247, 0.48), rgba(14, 165, 233, 0.38))",
        logoWrapperClass: "w-20 h-20",
        logoWidth: 80,
        logoHeight: 80,
        logoFitClass: "object-contain",
        outerGlow: "linear-gradient(135deg, rgba(236, 72, 153, 0.34), rgba(168, 85, 247, 0.28), rgba(14, 165, 233, 0.22))",
        innerTint: "rgba(236, 72, 153, 0.26)",
      }
    case "AILegal":
    default:
      return {
        cardTexture:
          "radial-gradient(circle at 70% 50%, rgba(34, 197, 94, 0.12), rgba(59, 130, 246, 0.08), transparent)",
        borderGradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.4), rgba(59, 130, 246, 0.32))",
        logoGlow: "radial-gradient(circle, rgba(34, 197, 94, 0.5), rgba(59, 130, 246, 0.35), transparent)",
        skillsGradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.22), rgba(59, 130, 246, 0.18))",
        skillsShadow: "0 0 0 1px rgba(34, 197, 94, 0.22)",
        buttonBackground: "linear-gradient(135deg, rgba(34, 197, 94, 0.4), rgba(59, 130, 246, 0.28))",
        buttonBorder: "1px solid rgba(34, 197, 94, 0.38)",
        buttonGlow: "linear-gradient(135deg, rgba(34, 197, 94, 0.5), rgba(59, 130, 246, 0.34))",
        logoWrapperClass: "w-24 h-16",
        logoWidth: 96,
        logoHeight: 64,
        logoFitClass: "object-contain",
        outerGlow: "linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.2))",
        innerTint: "rgba(34, 197, 94, 0.22)",
      }
  }
}

export default function FreelanceSection() {
  const [selectedWork, setSelectedWork] = useState<FreelanceWork | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const modalStyles = selectedWork ? getWorkStyles(selectedWork.company) : null

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
      website: "https://civitasinfra.com/"
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
      website: "https://ailegal.co.in/"
    },
    {
      id: 3,
      title: "Full-Stack Development",
      company: "TBC",
      period: "",
      description: [
        "Delivered an end-to-end clothing ecommerce experience for a boutique pet apparel brand, owning architecture, design, and deployment.",
        "Implemented a robust product catalog with variant management, inventory tracking, and dynamic merchandising controls.",
        "Built a secure checkout flow with integrated payments, order management dashboards, and automated notifications for customers and staff.",
        "Crafted an immersive, responsive UI that blends storytelling with conversion-focused layouts optimized for mobile shoppers.",
        "Set up automated deployments, performance monitoring, and SEO foundations to ensure reliability and discoverability post-launch."
      ],
      skills: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Stripe", "Prisma", "Vercel", "Full-Stack Development"],
      logoUrl: "/TBC.png",
      website: "https://thebarkingcat.in/"
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
    <section id="freelance" className="pt-10 md:pt-16 pb-20 md:pb-32 bg-transparent">
      <div className="container mx-auto px-6">
        <SectionHeader title="Freelance Work" icon={<Users className="w-6 h-6" />} />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto auto-rows-fr">
          {freelanceWorks.map((work, index) => {
            const workStyles = getWorkStyles(work.company)

            return (
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
                className="relative group cursor-pointer perspective-1000 h-full"
                style={{
                  background: hoveredIndex === index ? workStyles.outerGlow : "transparent",
                  borderRadius: "16px",
                  padding: "2px",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedWork(work)}
              >
              {/* Main Card */}
              <motion.div
                className="relative backdrop-blur-md border border-white/10 rounded-xl p-6 overflow-hidden h-full flex flex-col"
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
                  background: "rgba(6, 8, 12, 0.96)",
                  boxShadow:
                    hoveredIndex === index
                      ? `0 18px 45px ${workStyles.innerTint ?? "rgba(0,0,0,0.45)"}`
                      : "0 10px 28px rgba(0,0,0,0.35)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                {/* Subtle tint overlay */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: hoveredIndex === index ? 0.12 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: workStyles.cardTexture,
                  }}
                />
                
                {/* Glowing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: workStyles.borderGradient,
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
                <div className="relative z-10 mb-6">
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
                        background: workStyles.skillsGradient,
                        boxShadow: workStyles.skillsShadow,
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
                <div className="relative z-10 flex items-center justify-between mt-auto pt-4">
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
                      className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-white font-medium overflow-hidden"
                      whileHover={{ 
                        scale: 1.05,
                        y: -2
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        background: workStyles.buttonBackground,
                        border: workStyles.buttonBorder,
                      }}
                    >
                      {/* Button background glow */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: workStyles.buttonGlow,
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
            )
          })}
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
                className="relative bg-zinc-900 border border-white/10 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-2 sm:m-4"
                style={{
                  boxShadow: modalStyles?.innerTint
                    ? `0 12px 32px ${modalStyles.innerTint}`
                    : undefined,
                }}
              >
                {/* Modal accent overlays */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg"
                  style={{
                    background: modalStyles?.cardTexture,
                    opacity: 0.45,
                    maskImage:
                      "radial-gradient(circle at 20% 20%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at 20% 20%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg"
                  style={{
                    background: modalStyles?.innerTint,
                    opacity: 0.25,
                    maskImage:
                      "linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 25%, rgba(0,0,0,0) 55%)",
                    WebkitMaskImage:
                      "linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 25%, rgba(0,0,0,0) 55%)",
                  }}
                />

                <div className="p-4 sm:p-6 relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{selectedWork.company}</h3>
                      <p className="text-lg text-gray-300 mb-1">{selectedWork.title}</p>
                      {selectedWork.period && <p className="text-sm text-gray-400">{selectedWork.period}</p>}
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