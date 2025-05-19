"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
// Import the additional Lucide icon needed for the experience section
import {
  User,
  Briefcase,
  Cpu,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  Award,
  X,
  ChevronRight,
  Phone,
  Calendar,
  Building2,
  Globe,
  Send,
  MessageSquare,
  Quote,
  Download,
  FileText,
  Code,
} from "lucide-react"
import SkillCategoryDisplayComponent from "@/components/skill-category-display"
import CustomCursor from "@/components/custom-cursor"
import LeetCodeLink from "@/components/leetcode-link"

// Define types for skills
type SkillCategory =
  | "programming"
  | "frameworks"
  | "libraries"
  | "tools"
  | "platforms"
  | "domains"
  | "languages"
  | "commands"

type Skill = {
  name: string
  level: number
}

// Add this type declaration at the top of the file:
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

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)

  const textArray = [
    "Software Developer",
    "Problem Solver",
    "Algorithm Enthusiast",
    "Machine Learning Student",
    "Computer Science Student",
  ]

  useEffect(() => {
    // Check if device is mobile/tablet
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || "ontouchstart" in window)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Text typing effect
  useEffect(() => {
    const text = textArray[currentTextIndex]

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(text.substring(0, typedText.length + 1))
        setTypingSpeed(100)

        if (typedText.length === text.length) {
          setIsDeleting(true)
          setTypingSpeed(1500) // Pause at the end
        }
      } else {
        setTypedText(text.substring(0, typedText.length - 1))
        setTypingSpeed(50)

        if (typedText.length === 0) {
          setIsDeleting(false)
          setCurrentTextIndex((currentTextIndex + 1) % textArray.length)
          setTypingSpeed(500) // Pause before next word
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [typedText, currentTextIndex, isDeleting, typingSpeed, textArray])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects", "certifications", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  if (isLoading) {
    return (
      <>
        {!isMobile && <CustomCursor />}
        <LoadingScreen />
      </>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen font-mono relative overflow-hidden">
      {/* Only show custom cursor on non-mobile devices */}
      {!isMobile && <CustomCursor />}

      {/* Subtle moving gradient background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_70%)] animate-gradient-slow"></div>
        <div className="absolute -inset-[100%] opacity-[0.06] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_80%)] blur-xl animate-gradient-medium"></div>
        <div className="absolute -inset-[50%] opacity-[0.05] bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.15),transparent_60%)] blur-md animate-gradient-fast"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] opacity-[0.05] bg-[linear-gradient(180deg,rgba(255,255,255,0.2),transparent)] animate-pulse"></div>
      </div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-sm border-b border-white/10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            <span className="text-gray-400">{"<"}</span>
            <span>CS.Student</span>
            <span className="text-gray-400">{"/>"}</span>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-8"
          >
            {["home", "about", "experience", "projects", "certifications", "skills", "contact"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:text-white transition-colors relative ${
                    activeSection === item ? "text-white" : "text-gray-400"
                  }`}
                >
                  {activeSection === item && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item}
                </button>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:hidden"
          >
            <MobileMenu scrollToSection={scrollToSection} activeSection={activeSection} />
          </motion.div>
        </nav>
      </header>

      <main className="relative z-10">
        <section id="home" className="min-h-screen flex items-center justify-center relative">
          {/* Grid background effect */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-5 pointer-events-none">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/20" />
            ))}
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/30"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: Math.random() * 0.5 + 0.5,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  y: [null, Math.random() * -100 - 50],
                  opacity: [null, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                {/* Code brackets decoration */}
                <motion.div
                  className="flex justify-center items-center mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div
                    className="text-4xl md:text-6xl text-white/20 font-mono mr-4"
                    animate={{ x: [-5, 0, -5], rotate: [-2, 0, -2] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  >
                    {"{"}
                  </motion.div>
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/30 flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(255,255,255,0.1)",
                        "0 0 20px rgba(255,255,255,0.2)",
                        "0 0 0 rgba(255,255,255,0.1)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Code className="w-8 h-8 md:w-10 md:h-10 text-white/70" />
                  </motion.div>
                  <motion.div
                    className="text-4xl md:text-6xl text-white/20 font-mono ml-4"
                    animate={{ x: [5, 0, 5], rotate: [2, 0, 2] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  >
                    {"}"}
                  </motion.div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-4xl md:text-7xl font-bold mb-4 tracking-tight"
                >
                  <span className="text-gray-400">Hello, I'm </span>
                  <span className="relative inline-block">
                    <span className="relative z-10">Arhaan Girdhar</span>
                    <motion.span
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      className="absolute bottom-0 left-0 h-3 bg-white/10 z-0"
                    />
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-xl md:text-3xl text-gray-300 mb-8 h-10 flex items-center justify-center"
                >
                  <span className="mr-2">I'm a</span>
                  <span className="text-white font-medium relative">
                    {typedText}
                    <motion.span
                      className="absolute right-[-8px] top-0 h-full w-[2px] bg-white"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                  Passionate about creating elegant solutions to complex problems through code. Exploring the
                  intersection of algorithms, machine learning, and software development.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="flex justify-center space-x-4 mb-16"
                >
                  <SocialLink icon={<Github className="w-5 h-5" />} href="https://github.com/17arhaan" />
                  <SocialLink icon={<Linkedin className="w-5 h-5" />} href="https://www.linkedin.com/in/arhaan17/" />
                  <LeetCodeLink href="https://leetcode.com/u/arhaan17/" />
                  <SocialLink icon={<Mail className="w-5 h-5" />} href="mailto:17arhaan.connect@gmail.com" />
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4"
            >
              <motion.button
                onClick={() => scrollToSection("about")}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronDown className="w-8 h-8" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-20 md:py-32 bg-black">
          <div className="container mx-auto px-6">
            <SectionHeader title="About Me" icon={<User className="w-6 h-6" />} />

            {/* Profile Picture Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 mb-16 flex flex-col items-center"
            >
              <div className="relative">
                <motion.div
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white/20 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <img
                    src="/placeholder-hilm8.png"
                    alt="Arhaan Girdhar"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-white/40"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-white/40"></div>
              </div>

              {/* Resume Box with Animation */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
                  transition: { duration: 0.3 },
                }}
                className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4 flex flex-col items-center"
              >
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />

                <motion.h4
                  className="text-lg font-medium text-white/90 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  Resume
                </motion.h4>

                <div className="flex space-x-6">
                  <motion.a
                    href="#"
                    title="Download Resume"
                    whileHover={{
                      scale: 1.15,
                      y: -2,
                      color: "rgba(255, 255, 255, 1)",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      transition: {
                        duration: 0.3,
                        ease: "easeOut",
                        scale: { type: "spring", stiffness: 400, damping: 10 },
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    className="w-10 h-10 bg-white/10 hover:bg-white/15 rounded-full flex items-center justify-center transition-all text-white/80 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/20 opacity-0 group-hover:opacity-100"
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 1.5 }}
                    />
                    <motion.div
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        y: [0, -2, 2, -1, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                    >
                      <Download className="w-5 h-5" />
                    </motion.div>
                  </motion.a>

                  <motion.a
                    href="#"
                    title="View Resume"
                    whileHover={{
                      scale: 1.15,
                      y: -2,
                      color: "rgba(255, 255, 255, 1)",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      transition: {
                        duration: 0.3,
                        ease: "easeOut",
                        scale: { type: "spring", stiffness: 400, damping: 10 },
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="w-10 h-10 bg-white/10 hover:bg-white/15 rounded-full flex items-center justify-center transition-all text-white/80 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/20 opacity-0 group-hover:opacity-100"
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 1.5 }}
                    />
                    <motion.div
                      whileHover={{
                        scale: [1, 1.2, 0.9, 1.1, 1],
                        rotate: [0, 10, -10, 5, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                    >
                      <FileText className="w-5 h-5" />
                    </motion.div>
                  </motion.a>
                </div>

                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-6">Who I Am</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  I'm a Computer Science student passionate about software development, algorithms, and creating elegant
                  solutions to complex problems.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Currently pursuing my degree at Tech University, I focus on full-stack development, machine learning,
                  and data structures.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  When I'm not coding, you can find me participating in hackathons, contributing to open-source
                  projects, or exploring new technologies.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6">Education</h3>

                <div className="space-y-8">
                  <TimelineItem year="2021 - Present" title="BSc in Computer Science" description="Tech University" />
                  <TimelineItem year="2019 - 2021" title="Associate's Degree in CS" description="Community College" />
                  <TimelineItem year="2015 - 2019" title="High School Diploma" description="Science Academy" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="experience" className="py-20 md:py-32 bg-zinc-950">
          <div className="container mx-auto px-6">
            <SectionHeader title="Experience" icon={<Briefcase className="w-6 h-6" />} />

            <div className="mt-16">
              <EnhancedExperienceSection />
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 md:py-32 bg-black">
          <div className="container mx-auto px-6">
            <SectionHeader title="Projects" icon={<Briefcase className="w-6 h-6" />} />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              <ProjectCard
                title="Algorithm Visualizer"
                description="Interactive web application that visualizes various sorting and pathfinding algorithms."
                tags={["React", "TypeScript", "Algorithms"]}
                link="https://github.com"
              />

              <ProjectCard
                title="Smart Home Dashboard"
                description="IoT dashboard for monitoring and controlling smart home devices with real-time data visualization."
                tags={["Next.js", "IoT", "WebSockets"]}
                link="https://github.com"
              />

              <ProjectCard
                title="Neural Network Library"
                description="Lightweight neural network library built from scratch for educational purposes."
                tags={["Python", "Machine Learning", "NumPy"]}
                link="https://github.com"
              />

              <ProjectCard
                title="Crypto Portfolio Tracker"
                description="Web application to track cryptocurrency investments and visualize portfolio performance."
                tags={["React", "Node.js", "API"]}
                link="https://github.com"
              />

              <ProjectCard
                title="Compiler Design Project"
                description="A simple compiler for a custom programming language with lexical analysis and parsing."
                tags={["C++", "Compiler Design", "LLVM"]}
                link="https://github.com"
              />

              <ProjectCard
                title="Augmented Reality Study App"
                description="Mobile application that uses AR to help students visualize complex 3D concepts."
                tags={["Unity", "AR", "C#"]}
                link="https://github.com"
              />
            </div>
          </div>
        </section>

        <section id="certifications" className="py-20 md:py-32 bg-zinc-950">
          <div className="container mx-auto px-6">
            <SectionHeader title="Certifications" icon={<Award className="w-6 h-6" />} />

            <CertificationsGrid />
          </div>
        </section>

        <section id="skills" className="py-20 md:py-32 bg-black">
          <div className="container mx-auto px-6">
            <SectionHeader title="Skills" icon={<Cpu className="w-6 h-6" />} />

            <div className="mt-16">
              <SkillCategoryDisplayComponent />
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 md:py-32 bg-zinc-950">
          <div className="container mx-auto px-6">
            <SectionHeader title="Get in Touch" icon={<Mail className="w-6 h-6" />} />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center text-gray-300 italic mt-6 mb-16 max-w-2xl mx-auto"
            >
              Let's collaborate and create something amazing together.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-8">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg p-8 flex flex-col h-full"
              >
                <h3 className="text-2xl font-bold mb-8">Let's Connect</h3>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="w-5 h-5 text-gray-300" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium">17arhaan.connect@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="w-5 h-5 text-gray-300" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-medium">+919650984445</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-gray-400 mb-4">Follow Me:</p>
                  <div className="flex space-x-4">
                    <SocialLink icon={<Github className="w-5 h-5" />} href="https://github.com/17arhaan" />
                    <SocialLink icon={<Linkedin className="w-5 h-5" />} href="https://www.linkedin.com/in/arhaan17/" />
                    <LeetCodeLink href="https://leetcode.com/u/arhaan17/" />
                  </div>
                </div>

                {/* Redesigned Quote Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-12 relative"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 relative">
                    {/* Large quote marks */}
                    <div className="absolute -top-5 -left-2 text-white/10 text-7xl font-serif leading-none">"</div>
                    <div className="absolute -bottom-8 -right-2 text-white/10 text-7xl font-serif leading-none">"</div>

                    {/* Quote icon */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-white/10 rounded-full p-2">
                        <Quote className="w-5 h-5 text-white/70" />
                      </div>
                    </div>

                    {/* Quote text */}
                    <p className="text-white/90 text-lg font-light leading-relaxed tracking-wide text-center">
                      I believe great technology should feel personal, solving real problems with a human touch. Let's
                      create something meaningful together.
                    </p>

                    {/* Decorative line */}
                    <div className="mt-5 flex justify-center">
                      <motion.div
                        className="h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent w-24"
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold mb-8">Send a Message</h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                        Name <span className="text-white/60">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="text"
                          id="name"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                          placeholder="Your name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                        Email <span className="text-white/60">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="email"
                          id="email"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                        Phone
                      </label>
                      <div className="flex">
                        <div className="relative">
                          <select className="appearance-none bg-white/5 border border-white/10 rounded-l-md py-3 px-4 pr-8 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all text-gray-300">
                            <option>India</option>
                            <option>USA</option>
                            <option>UK</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                        <div className="relative flex-grow">
                          <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="tel"
                            id="phone"
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 border-l-0 rounded-r-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                            placeholder="1234567890"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">
                        Company
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="text"
                          id="company"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                          placeholder="Your company"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="inquiry" className="block text-sm font-medium text-gray-400 mb-2">
                        Inquiry Type <span className="text-white/60">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="inquiry"
                          className="w-full appearance-none bg-white/5 border border-white/10 rounded-md py-3 pl-4 pr-8 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all text-gray-300"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          <option>Project Inquiry</option>
                          <option>Job Opportunity</option>
                          <option>Collaboration</option>
                          <option>Other</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-400 mb-2">
                        Website
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="url"
                          id="website"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                          placeholder="yourwebsite.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="availability" className="block text-sm font-medium text-gray-400 mb-2">
                        Your Availability
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="date"
                          id="availability"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                        Subject <span className="text-white/60">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                        placeholder="What's this about?"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                      Message <span className="text-white/60">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                      <textarea
                        id="message"
                        rows={6}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all resize-none"
                        placeholder="Your message..."
                        required
                      ></textarea>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-medium rounded-md transition-colors"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-white/10 bg-black">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Arhaan Girdhar. All rights reserved.</p>
          <p className="text-gray-600 text-sm mt-2">Designed and built with Next.js and Framer Motion</p>
        </div>
      </footer>
    </div>
  )
}

function CertificationsGrid() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const certifications = [
    {
      id: 8,
      title: "Meta Back-End Developer Professional Certificate",
      issuer: "Meta",
      date: "June 2025",
      expiryDate: null,
      description:
        "Comprehensive professional certification covering back-end development fundamentals, APIs, databases, security, and deployment. Building job-ready skills with hands-on projects and real-world applications.",
      credentialId: null,
      credentialURL: "",
      skills: [
        "Back-End Development",
        "APIs",
        "Database Design",
        "Python",
        "Django",
        "Version Control",
        "Cloud Deployment",
        "Security",
        "System Design",
        "Web Development",
      ],
      image: "/meta-logo-abstract.png",
    },
    {
      id: 5,
      title: "Foundations of AI and Machine Learning",
      issuer: "Microsoft",
      date: "May 2025",
      expiryDate: null,
      description:
        "Comprehensive introduction to AI & ML infrastructure, covering data pipelines, model frameworks, deployment strategies, and cloud computing solutions.",
      credentialId: null,
      credentialURL: "",
      skills: [
        "AI",
        "ML",
        "Data Management",
        "Model Frameworks",
        "Model Deployment",
        "Cloud Computing",
        "AI Infrastructure",
        "Version Control",
        "Scalability",
      ],
      image: "/placeholder-szria.png",
    },
    {
      id: 7,
      title: "Digital Marketing Specialization",
      issuer: "Illinois",
      date: "April 2025",
      expiryDate: null,
      description:
        "Strategic digital marketing training focusing on data analysis, consumer behavior, brand measurement, and campaign attribution through practical application of tools and visualization techniques.",
      credentialId: "1ME6P85IAKC7 | QDDUU62J27AK | HT1IYP3OUP4U",
      credentialURL: [
        {
          title: "Marketing in Digital World",
          url: "https://www.coursera.org/account/accomplishments/certificate/1ME6P85IAKC7",
        },
        {
          title: "Digital Marketing Analysis in Theory",
          url: "https://www.coursera.org/account/accomplishments/certificate/QDDUU62J27AK",
        },
        {
          title: "Digital Marketing Analysis in Practice",
          url: "https://www.coursera.org/account/accomplishments/certificate/HT1IYP3OUP4U",
        },
      ],
      skills: [
        "Data Analysis",
        "Consumer Behavior",
        "Brand Measurement",
        "Campaign Attribution",
        "Data Visualization",
        "Marketing Analytics",
        "Storytelling",
        "Business Impact",
      ],
      image: "/university-of-illinois-logo.png",
    },
    {
      id: 6,
      title: "Foundations of Project Management",
      issuer: "Google",
      date: "April 2025",
      expiryDate: null,
      description:
        "Essential project management concepts including project selection, resource allocation, risk management, and team leadership for successful project delivery.",
      credentialId: "PR9LFUKNWDA1",
      credentialURL: "https://www.coursera.org/account/accomplishments/certificate/PR9LFUKNWDA1",
      skills: ["Problem Solving", "Leadership", "Project Management", "Risk Management", "Responsiblity"],
      image: "/google-logo.png",
    },
    {
      id: 4,
      title: "Generative AI with Large Language Models",
      issuer: "AWS",
      date: "Jan 2025",
      expiryDate: null,
      description:
        "Advanced training in Generative AI and LLMs, covering model training, fine-tuning, deployment, and optimization for real-world applications.",
      credentialId: "6763NRR61X28",
      credentialURL: "https://www.coursera.org/account/accomplishments/certificate/6763NRR61X28",
      skills: [
        "Generative AI",
        "Large Language Models",
        "Transformer Architecture",
        "Model Training",
        "Fine-Tuning",
        "AI Deployment",
        "Inference Optimization",
        "Scaling Laws",
        "Python",
        "Machine Learning",
      ],
      image: "/aws-logo.png",
    },
    {
      id: 3,
      title: "Introduction to Generative AI",
      issuer: "Google",
      date: "Dec 2024",
      expiryDate: null,
      description:
        "Fundamental concepts of Generative AI, exploring its applications, differences from traditional ML, and practical implementation strategies.",
      credentialId: "5VKU3Z5HMB2G",
      credentialURL: "https://www.coursera.org/account/accomplishments/certificate/5VKU3Z5HMB2G",
      skills: [
        "Generative AI",
        "Machine Learning",
        "AI Applications",
        "Google AI Tools",
        "Deep Learning",
        "Model Development",
      ],
      image: "/google-logo.png",
    },
    {
      id: 9,
      title: "Mastering Big Data Analytics with PySpark",
      issuer: "Infosys",
      date: "October 2024",
      expiryDate: null,
      description:
        "Comprehensive training in big data analytics using PySpark, covering data processing, machine learning, and distributed computing for large-scale data analysis.",
      credentialURL: "https://drive.google.com/drive/u/0/folders/1S55QbJu8Pv5a8wAxj5SMgOviAwjTbmKl",
      skills: [
        "Big Data",
        "PySpark",
        "Data Processing",
        "Machine Learning",
        "Distributed Computing",
        "Data Analysis",
        "Python",
        "Data Engineering",
        "ETL",
        "Data Visualization",
      ],
      image: "/infosys-logo.png",
    },
    {
      id: 2,
      title: "Neural Networks and Deep Learning",
      issuer: "DeepLearning.AI",
      date: "Dec 2024",
      expiryDate: null,
      description:
        "Comprehensive deep learning fundamentals covering neural network architectures, training techniques, and optimization strategies for AI applications.",
      credentialId: "1XMZBVRYNKB2",
      credentialURL: "https://www.coursera.org/account/accomplishments/certificate/1XMZBVRYNKB2",
      skills: [
        "Deep Learning",
        "Neural Networks",
        "AI",
        "Machine Learning",
        "Model Training",
        "Vectorization",
        "Hyperparameter Tuning",
        "AI Applications",
        "Model Optimization",
      ],
      image: "/deeplearning-ai-logo.png",
    },
    {
      id: 1,
      title: "Exploratory Data Analysis for Machine Learning",
      issuer: "IBM",
      date: "Dec 2024",
      expiryDate: null,
      description:
        "Essential data analysis techniques for machine learning, including data cleaning, feature engineering, and statistical analysis methods.",
      credentialId: "Y53G36TKQGCU",
      credentialURL: "https://www.coursera.org/account/accomplishments/certificate/Y53G36TKQGCU",
      skills: [
        "Machine Learning",
        "Data Preprocessing",
        "Feature Engineering",
        "Data Cleaning",
        "SQL",
        "NoSQL",
        "APIs",
        "Outlier Detection",
        "Feature Scaling",
        "Hypothesis Testing",
      ],
      image: "/ibm-logo.png",
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedCert(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const selectedCertificate = selectedCert !== null ? certifications.find((cert) => cert.id === selectedCert) : null

  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {certifications.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedCert(cert.id)}
            className="border border-white/10 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm cursor-pointer h-auto sm:h-64 md:h-72 flex flex-col items-center justify-center p-4 sm:p-6 transition-all hover:border-white/30"
          >
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 md:mb-6 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src={cert.image || "/placeholder.svg"}
                alt={cert.issuer}
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-center line-clamp-3 mb-2">
                  {cert.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 text-center">
                  {cert.issuer} • {cert.date}
                </p>
              </div>
              <motion.div
                className="mt-4 flex items-center text-gray-400 text-sm justify-center"
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
              >
                <span>View details</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCert !== null && selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-zinc-900 border border-white/10 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto m-3 sm:m-6"
            >
              <motion.div
                className="p-6 sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="flex items-start justify-between mb-8"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center">
                    <motion.div
                      className="w-16 h-16 rounded-lg overflow-hidden mr-5 bg-white/5 flex items-center justify-center border border-white/10"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {selectedCertificate.logoUrl ? (
                        <img
                          src={selectedCertificate.logoUrl || "/placeholder.svg"}
                          alt={`${selectedCertificate.issuer} logo`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/generic-company-logo.png"
                          }}
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
                        {selectedCertificate.title}
                      </motion.h3>
                      <motion.p
                        className="text-xl text-gray-300"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        {selectedCertificate.issuer}
                      </motion.p>
                      <motion.div
                        className="flex flex-wrap items-center text-sm text-gray-400 mt-1"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <span>{selectedCertificate.date}</span>
                      </motion.div>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setSelectedCert(null)}
                    className="text-gray-400 hover:text-white p-1"
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
                      {selectedCertificate.description.map((item, index) => (
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
                            whileHover={{ scale: 1.5, backgroundColor: "rgba(255,255,255,0.9)" }}
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
                      {selectedCertificate.skills.map((skill, skillIndex) => (
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

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          className="w-16 h-16 border-t-2 border-white rounded-full mx-auto mb-6"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5 }}
          className="h-0.5 bg-white/50 w-48 mx-auto"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-gray-400"
        >
          Loading portfolio...
        </motion.p>
      </motion.div>
    </div>
  )
}

function MobileMenu({
  scrollToSection,
  activeSection,
}: { scrollToSection: (id: string) => void; activeSection: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
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
              {["home", "about", "experience", "projects", "certifications", "skills", "contact"].map((item) => (
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

function SectionHeader({ title, icon }: { title: string; icon: React.ReactNode }) {
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

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
    >
      {icon}
    </motion.a>
  )
}

function TimelineItem({ year, title, description }: { year: string; title: string; description: string }) {
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

function ProjectCard({
  title,
  description,
  tags,
  link,
}: {
  title: string
  description: string
  tags: string[]
  link: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="border border-white/10 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 flex items-center justify-between">
          {title}
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </h3>
        <p className="text-gray-300 mb-4 text-sm">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function EnhancedExperienceSection() {
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
      period: "Jan 2024 - Mar 2024",
      description: [
        "Developed responsive website serving 50,000+ monthly active users",
        "Reduced page load time from 3.2s to 1.8s through caching optimization",
        "Maintained 99% on-time delivery rate across 15 sprint cycles",
        "Decreased application bundle size from 2.8MB to 1.7MB through code splitting",
        "Implemented comprehensive error handling and monitoring systems",
      ],
      skills: ["Frontend Development", "Performance Optimization", "Digital AM"],
      logoUrl: "/IM_logo.jpg",
    },
    {
      id: 1,
      role: "Internship Trainee",
      company: "Bharat Electronics Limited",
      location: "On-Site | GZB, IN",
      period: "Jun 2024 - Jul 2024",
      description: [
        "Developed 7 JavaFX interfaces handling 500+ daily cybersecurity operations",
        "Implemented VM management system for 25+ virtual machines achieving 99.99% uptime",
        "Reduced manual processing time from 45 minutes to 27 minutes through automation",
        "Enhanced system security by implementing AES-256 encryption across all interfaces",
        "Established standardized testing procedures for all new features",
      ],
      skills: ["Cybersecurity", "System Administration", "UI Development"],
      logoUrl: "/BEL_logo.jpg",
    },
    {
      id: 2,
      role: "Project Lead",
      company: "Buildspace",
      location: "Remote | LA, US",
      period: "Jul 2024 - Sept 2024",
      description: [
        "Led development of an AI-powered mental health therapy chatbot served many monthly users",
        "Managed a 5-member cross-functional team, implementing agile methodologies across 12 sprints",
        "Improved chatbot response accuracy from 65% to 95% through advanced NLP techniques",
        "Reduced average response time from 2.5s to 1s through system optimization",
        "Established comprehensive documentation and training protocols for team members",
      ],
      skills: ["Artificial Intelligence", "Team Leadership", "Project Management"],
      logoUrl: "/Buildspaceso_logo.jpg",
    },
    {
      id: 0,
      role: "AI Intern",
      company: "Concur IP",
      location: "Noida, Uttar Pradesh, India · On-site",
      period: "Present",
      description: [
        "Collaborated with AI engineers to optimize and build machine learning models for IP-related tasks.",
        "Worked on model architecture, training, and participated in code reviews.",
        "Assisted with data preprocessing and feature engineering for ML pipelines.",
        "Maintained technical documentation for ongoing projects and experiments.",
        "Utilized Python, TensorFlow, and strong team collaboration skills throughout the ML lifecycle.",
      ],
      skills: [
        "Artificial Intelligence",
        "Machine Learning",
        "Python",
        "TensorFlow",
        "Model Building",
        "Team Collaboration",
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
        className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/5 via-white/20 to-white/5 overflow-hidden"
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
          className="absolute left-1/2 transform -translate-x-1/2 z-10"
          style={{
            top: index === 0 ? "0%" : "65%", // Changed from 50% to 65% to position between last two experiences
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
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
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
            className={`w-[calc(50%-2rem)] bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-5 cursor-pointer hover:border-white/30 transition-all relative ${
              index % 2 === 0 ? "mr-8" : "ml-8"
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
              className={`absolute top-1/2 transform -translate-y-1/2 h-[1px] ${
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
                className="w-20 h-20 rounded-md overflow-hidden mr-6 bg-white/5 flex items-center justify-center flex-shrink-0"
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
                  <img
                    src={experience.logoUrl || "/placeholder.svg"}
                    alt={`${experience.company} logo`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/generic-company-logo.png"
                    }}
                  />
                ) : (
                  <Briefcase className="w-6 h-6 text-gray-400" />
                )}
              </motion.div>
              <div className="flex-1">
                <motion.h3
                  className="text-xl font-bold"
                  animate={hoveredIndex === index ? { color: "#ffffff" } : { color: "#f8f8f8" }}
                >
                  {experience.role}
                </motion.h3>
                <p className="text-gray-300">{experience.company}</p>
                <div className="flex flex-wrap items-center text-sm text-gray-400 mt-1">
                  <span>{experience.period}</span>
                  <span className="mx-2">•</span>
                  <span>{experience.location}</span>
                </div>

                {/* View details prompt */}
                <motion.div
                  className="mt-3 text-sm text-white/60 flex items-center"
                  animate={
                    hoveredIndex === index
                      ? {
                          x: [0, 3, 0],
                          color: "rgba(255,255,255,0.9)",
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <span>View details</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </motion.div>
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-zinc-900 border border-white/10 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto m-3 sm:m-6"
            >
              <motion.div
                className="p-6 sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="flex items-start justify-between mb-8"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center">
                    <motion.div
                      className="w-24 h-24 rounded-lg overflow-hidden mr-6 bg-white/5 flex items-center justify-center border border-white/10"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {selectedExperience.logoUrl ? (
                        <img
                          src={selectedExperience.logoUrl || "/placeholder.svg"}
                          alt={`${selectedExperience.company} logo`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/generic-company-logo.png"
                          }}
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
                    className="text-gray-400 hover:text-white p-1"
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
                            whileHover={{ scale: 1.5, backgroundColor: "rgba(255,255,255,0.9)" }}
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
