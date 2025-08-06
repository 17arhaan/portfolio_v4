"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, FileText, ExternalLink, X, Briefcase } from "lucide-react"
import Image from "next/image"

// Add this type declaration:
type Experience = {
  id: number
  role: string
  company: string
  location: string
  period: string
  description: string[]
  skills: string[]
  logoUrl: string
}

export default function EnhancedExperienceSection() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Experience data
  const experiences: Experience[] = [
    {
      id: 3,
      role: "Frontend Developer",
      company: "Invisible Mechanics",
      location: "Hybrid | BLR, IN",
      period: "Jan 2025 - Mar 2025",
      description: [
        "Programmed and deployed a responsive, component-based web interface using modern frameworks, increasing user engagement by 45% through improved UI performance and accessibility.",
        "Collaborated closely with backend engineers to optimize API consumption and frontend rendering, contributing to a 98% on-time delivery rate across sprints.",
        "Implemented advanced state management solutions and custom hooks, reducing component re-renders by 60% and improving overall application performance.",
        "Developed comprehensive unit and integration testing suites using Jest and React Testing Library, achieving 85% code coverage and reducing production bugs by 40%.",
        "Led UI/UX design improvements and accessibility enhancements, ensuring WCAG 2.1 compliance and supporting users with disabilities across all platform features.",
      ],
      skills: ["Frontend Development", "React", "Performance Optimization", "API Integration", "UI/UX Development", "Testing", "Accessibility"],
      logoUrl: "/IM_logo.jpg",
    },
    {
      id: 1,
      role: "Internship Trainee",
      company: "Bharat Electronics Limited",
      location: "On-Site | GZB, IN",
      period: "Jun 2025 - Jul 2025",
      description: [
        "Optimized multiple JavaFX-based interfaces to enhance cybersecurity workflows, boosting operational efficiency by 25% and enhancing user experience across internal tools.",
        "Administered the management and performance of 20+ virtual machines, ensuring 99.9% system uptime and automating critical processes to cut manual intervention time by 35%.",
        "Developed automated monitoring scripts using Python and PowerShell that proactively detected system vulnerabilities and performance bottlenecks, reducing incident response time by 50%.",
        "Implemented secure authentication protocols and access control mechanisms across multiple enterprise systems, strengthening cybersecurity posture and compliance with government standards.",
        "Created comprehensive technical documentation and conducted training sessions for 15+ team members on new tools and security procedures, improving overall team productivity and knowledge retention.",
      ],
      skills: ["Cybersecurity", "System Administration", "JavaFX", "UI Development", "VM Management", "Process Automation", "Python", "Security Protocols"],
      logoUrl: "/BEL_logo.jpg",
    },
    {
      id: 2,
      role: "Project Lead",
      company: "Buildspace",
      location: "Remote | LA, US",
      period: "Jul 2024 - Sept 2024",
      description: [
        "Led development of an AI-powered mental health therapy chatbot serving 1000+ monthly users, implementing advanced conversational AI and therapeutic techniques.",
        "Managed a 5-member cross-functional team across different time zones, implementing agile methodologies and delivering features across 12 successful sprints with zero delays.",
        "Improved chatbot response accuracy from 65% to 95% through advanced NLP techniques, fine-tuning transformer models, and implementing context-aware conversation flows.",
        "Reduced average response time from 2.5s to 1s through system optimization, database query optimization, and implementing efficient caching strategies.",
        "Established comprehensive documentation, code review processes, and training protocols that improved team collaboration efficiency by 40% and reduced onboarding time for new members.",
      ],
      skills: ["Artificial Intelligence", "Team Leadership", "Project Management", "NLP", "System Optimization", "Agile Methodology"],
      logoUrl: "/Buildspaceso_logo.jpg",
    },
    {
      id: 0,
      role: "Artificial Intelligence & Machine Learning Intern",
      company: "Concur IP (A Questel Company)",
      location: "On-Site | Noida, IN",
      period: "May 2025 - Jul 2025",
      description: [
        "Contributed to training and optimization of PyTorch-based logo-detection models for low-latency, real-time monitoring microservices under strict confidentiality.",
        "Assisted in designing and maintaining distributed scraping and ETL workflows to automate large-scale image ingestion.",
        "Supported AWS CI/CD pipeline setup, including blue/green deployments to facilitate secure and seamless model updates.",
        "Collaborated with product, QA, and DevOps teams to translate requirements into technical implementations within a confidential project.",
        "Conducted data-quality checks and model performance evaluations to drive continuous improvement of detection accuracy.",
      ],
      skills: [
        "Machine Learning",
        "Python",
        "Data Pipeline Development",
        "Web Scraping",
        "Algorithm Development",
        "IP Protection",
        "Apache Spark",
        "Data Analytics",
        "Automation",
      ],
      logoUrl: "/questel.jpg",
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedExperience(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative mt-8 pb-4">
      {/* Animated timeline vertical line with gradient effect */}
      <motion.div
        className="absolute left-1/2 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/5 via-white/20 to-white/5 overflow-hidden"
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Gradient flowing effect */}
        <motion.div
          className="absolute inset-0 w-full"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)",
            height: "50%",
          }}
          animate={{
            y: ["-100%", "200%"],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      </motion.div>

      {/* Year markers along the timeline */}
      {["2024", "2025"].map((year, index) => (
        <motion.div
          key={year}
          className="absolute left-1/2 md:left-1/2 transform -translate-x-1/2 z-10"
          style={{
            top: index === 0 ? "0%" : "65%",
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
        >
          <div className="bg-black/80 backdrop-blur-sm text-center text-xs border-l-2 border-white/30 pl-2 pr-3 py-1 rounded-r-sm flex items-center">
            <span className="text-white/80">{year}</span>
          </div>
        </motion.div>
      ))}

      {/* Timeline entries */}
      {experiences.map((experience, index) => (
        <motion.div
          key={experience.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className={`relative mb-16 flex items-center w-full ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Fixed position date marker at center of timeline */}
          <div className="absolute left-1/2 md:left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
            <motion.div
              className="w-10 h-10 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className={`w-3 h-3 rounded-sm bg-white/30 backdrop-blur-sm transition-all duration-300 ${
                  hoveredIndex === index ? "bg-white scale-150 rotate-45" : ""
                }`}
                animate={
                  hoveredIndex === index
                    ? {
                        boxShadow: "0 0 10px rgba(255,255,255,0.5)",
                      }
                    : {}
                }
              />

              {/* Date tooltip */}
              <motion.div
                className="absolute whitespace-nowrap text-xs font-medium bg-black/70 backdrop-blur-sm px-2 py-1 rounded-sm border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={hoveredIndex === index ? { opacity: 1, y: 24 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                {experience.period}
              </motion.div>
            </motion.div>
          </div>

          {/* Content box */}
          <motion.div
            className={`w-full md:w-[calc(50%-4rem)] bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-5 cursor-pointer hover:border-white/30 transition-all relative ${
              index % 2 === 0 ? "md:mr-8" : "md:ml-8"
            }`}
            whileHover={{ scale: 1.03 }}
            animate={
              hoveredIndex === index
                ? {
                    boxShadow: "0 0 15px rgba(255,255,255,0.1)",
                    y: -5,
                  }
                : {}
            }
            onClick={() => setSelectedExperience(experience)}
          >
            {/* Animated connector line to timeline - morphing effect */}
            <motion.div
              className={`absolute top-1/2 transform -translate-y-1/2 h-[1px] hidden md:block ${
                index % 2 === 0
                  ? "right-0 translate-x-full bg-gradient-to-r from-white/50 to-transparent"
                  : "left-0 -translate-x-full bg-gradient-to-l from-white/50 to-transparent"
              }`}
              initial={{ width: 0 }}
              whileInView={{ width: "2rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
              style={{
                filter: hoveredIndex === index ? "drop-shadow(0 0 2px rgba(255,255,255,0.5))" : "none",
              }}
            />

            {/* Experience content */}
            <div className="flex items-start">
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden mr-4 md:mr-6 bg-white/5 flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                animate={
                  hoveredIndex === index
                    ? {
                        borderColor: "rgba(255,255,255,0.3)",
                      }
                    : {}
                }
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: hoveredIndex === index ? "0 0 10px rgba(255,255,255,0.1)" : "none",
                }}
              >
                {experience.logoUrl ? (
                  <Image
                    src={experience.logoUrl || "/placeholder.svg"}
                    alt={`${experience.company} logo`}
                    width={64}
                    height={64}
                    className="object-contain w-full h-full p-2"
                    quality={90}
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-white/40" />
                )}
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold">{experience.role}</h3>
                <p className="text-gray-300 text-sm md:text-base">{experience.company}</p>
                <p className="text-gray-400 text-xs md:text-sm mt-1">{experience.location}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}



      <AnimatePresence>
        {selectedExperience && (
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
              className="bg-zinc-900 border border-white/10 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto m-2 sm:m-4"
            >
              <motion.div
                className="p-4 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Header Section */}
                <motion.div
                  className="flex items-start justify-between mb-6"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center">
                    <motion.div
                      className="w-32 h-32 md:w-40 md:h-32 rounded-lg overflow-hidden mr-4 bg-white/5 flex items-center justify-center border border-white/10 relative"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {selectedExperience.logoUrl ? (
                        <Image
                          src={selectedExperience.logoUrl || "/placeholder.svg"}
                          alt={`${selectedExperience.company} logo`}
                          width={128}
                          height={128}
                          className="object-contain w-full h-full p-4"
                          quality={95}
                        />
                      ) : (
                        <Briefcase className="w-8 h-8 text-gray-400" />
                      )}
                    </motion.div>
                    <div>
                      <motion.h3
                        className="text-2xl font-bold"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        {selectedExperience.role}
                      </motion.h3>
                      <motion.p
                        className="text-xl text-gray-300"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        {selectedExperience.company}
                      </motion.p>
                      <motion.div
                        className="flex flex-wrap items-center text-sm text-gray-400 mt-1"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <span>{selectedExperience.period}</span>
                        <span className="mx-2">•</span>
                        <span>{selectedExperience.location}</span>
                      </motion.div>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setSelectedExperience(null)}
                    className="text-gray-400 hover:text-white p-1 z-10"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </motion.div>

                <div className="space-y-8">
                  {/* Experience points with bullet points instead of numbers */}
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

                    <ul className="space-y-4">
                      {selectedExperience.description.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                          className="flex items-start"
                        >
                          <motion.div
                            className="w-2 h-2 rounded-full bg-white/60 mt-2 mr-3 flex-shrink-0"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                            whileHover={{ scale: 1.5 }}
                          />
                          <p className="text-gray-200">{item}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Skills section */}
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

                    <div className="flex flex-wrap gap-2">
                      {selectedExperience.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.7 + skillIndex * 0.1 }}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                          className="px-3 py-1.5 bg-white/10 rounded-sm text-sm"
                        >
                          {skill}
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
    </div>
  )
} 