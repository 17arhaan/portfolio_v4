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
  Calendar as CalendarIcon,
  Building2,
  Globe,
  Send,
  MessageSquare,
  Quote,
  Download,
  FileText,
  Code,
  Brain,
  Code2,
  Target,
  Users,
  BarChart2,
  Check,
  Trophy,
  Star,
  GitFork,
  GitPullRequest,
} from "lucide-react"
import SkillCategoryDisplayComponent from "@/components/skill-category-display"
import CustomCursor from "@/components/custom-cursor"
import LeetCodeLink from "@/components/leetcode-link"
import ReactConfetti from 'react-confetti';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import ProgressSection from "@/components/progress-section"

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

function VideoPlayer({ isPlaying, onEnded }: { isPlaying: boolean; onEnded: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  }, [isPlaying]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleVideoEnded = () => {
    onEnded();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isPlaying ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onEnded}
    >
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
        <video
          ref={videoRef}
          src="/ArhaanGirdhar_MC.mp4"
          className="w-full h-full object-contain"
          autoPlay
          playsInline
          onEnded={handleVideoEnded}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-4 py-2 rounded-lg flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 accent-white"
            aria-label="Volume control"
          />
          <span className="text-white text-sm">{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const formRef = useRef<HTMLFormElement>(null);
  const [messageValue, setMessageValue] = useState("");
  const [messageHeight, setMessageHeight] = useState("auto");
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [date, setDate] = useState<Date>()

  const textArray = [
    "Software Developer",
    "Problem Solver",
    "Algorithm Enthusiast",
    "AI / ML Junior",
    "CS Student",
  ]

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      const sections = ["home", "about", "experience", "projects", "certifications", "skills", "achievements", "contact"]
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

  useEffect(() => {
    if (submitStatus.type === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus.type]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageValue(e.target.value);
    setMessageHeight('auto');
    if (messageRef.current) {
      setMessageHeight(messageRef.current.scrollHeight + 'px');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        inquiry: formData.get('inquiry'),
        website: formData.get('website'),
        availability: formData.get('availability'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      };

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        formRef.current?.reset();
        setMessageValue("");
        setMessageHeight("auto");
        setSubmitStatus({
          type: 'success',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: '',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
      {/* Confetti container */}
      {showConfetti && (
        <motion.div 
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 4 }}
        >
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            colors={['#ffffff']}
            numberOfPieces={300}
            recycle={false}
            gravity={0.2}
            initialVelocityY={5}
            tweenDuration={4000}
            confettiSource={{
              x: 0,
              y: 0,
              w: windowSize.width,
              h: 0
            }}
            style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}
          />
        </motion.div>
      )}

      {/* Only show custom cursor on non-mobile devices */}
      {!isMobile && <CustomCursor />}

      {/* Subtle moving gradient background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25),transparent_70%)] animate-gradient-slow"></div>
        <div className="absolute -inset-[100%] opacity-[0.12] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_80%)] blur-xl animate-gradient-medium"></div>
        <div className="absolute -inset-[50%] opacity-[0.1] bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.25),transparent_60%)] blur-md animate-gradient-fast"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] opacity-[0.1] bg-[linear-gradient(180deg,rgba(255,255,255,0.3),transparent)] animate-pulse"></div>
      </div>

      {/* Grid background effect */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10 pointer-events-none">
        {Array.from({ length: 144 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-white/30" />
        ))}
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.6 + 0.4,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-sm border-b border-white/10">
        <nav className="container mx-auto px-3 sm:px-6 py-2 flex justify-between items-center min-h-[56px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold flex items-center justify-center"
          >
            <motion.button
              onClick={() => scrollToSection("home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="focus:outline-none"
            >
              <img src="/sign.png" alt="Arhaan Girdhar" className="h-14 w-auto object-contain my-auto mt-[3px]" />
            </motion.button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-8"
          >
            {["home", "about", "experience", "projects", "certifications", "skills", "achievements", "contact"].map((item) => (
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
          {/* Main content */}
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center py-20"
              >
                {/* Code brackets decoration */}
                <motion.div
                  className="flex justify-center items-center mb-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div
                    className="text-5xl md:text-7xl text-white/20 font-mono mr-6"
                    animate={{ x: [-5, 0, -5], rotate: [-2, 0, -2] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  >
                    {"{"}
                  </motion.div>
                  <motion.div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/30 flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(255,255,255,0.1)",
                        "0 0 20px rgba(255,255,255,0.2)",
                        "0 0 0 rgba(255,255,255,0.1)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Code className="w-10 h-10 md:w-12 md:h-12 text-white/70" />
                  </motion.div>
                  <motion.div
                    className="text-5xl md:text-7xl text-white/20 font-mono ml-6"
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
                  className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 tracking-tight leading-tight sm:leading-tight"
                >
                  <span className="text-gray-400">Hello, I'm </span>
                  <span className="relative inline-block">
                    <span className="relative z-10">Arhaan Girdhar</span>
                    <motion.span
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      className="absolute bottom-0 left-0 h-3 sm:h-4 bg-white/10 z-0"
                    />
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-lg xs:text-xl sm:text-2xl md:text-4xl text-gray-300 mb-8 sm:mb-12 h-10 sm:h-12 flex items-center justify-center"
                >
                  <span className="mr-2 sm:mr-3">I'm a</span>
                  <span className="text-white font-medium relative">
                    {typedText}
                    <motion.span
                      className="absolute right-[-6px] sm:right-[-8px] top-0 h-full w-[2px] bg-white"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="text-gray-400 max-w-3xl mx-auto mb-10 sm:mb-16 leading-relaxed text-base sm:text-lg md:text-xl italic px-2 sm:px-0"
                >
                  A Computer Science student passionate about AI/ML and software development. Turning visions into reality.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16 sm:mb-24"
                >
                  <SocialLink icon={<Github className="w-6 h-6" />} href="https://github.com/17arhaan" />
                  <SocialLink icon={<Linkedin className="w-6 h-6" />} href="https://www.linkedin.com/in/arhaan17/" />
                  <LeetCodeLink href="https://leetcode.com/u/arhaan17/" />
                  <SocialLink icon={<Mail className="w-6 h-6" />} href="mailto:17arhaan.connect@gmail.com" />
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8"
            >
              <motion.button
                onClick={() => scrollToSection("about")}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Scroll to about section"
              >
                <ChevronDown className="w-10 h-10" />
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
                    src="/pfp.png"
                    alt="Arhaan Girdhar"
                    className="w-full h-full object-cover transition-all duration-500"
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
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.15)",
                  transition: { duration: 0.3 },
                }}
                className="mt-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center relative overflow-hidden group"
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />

                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />

                <motion.h4
                  className="text-xl font-medium text-white/90 mb-4 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <FileText className="w-5 h-5 mr-2 text-white/70" />
                  Resume
                </motion.h4>

                <div className="flex space-x-6">
                  <motion.a
                    href="/Arhaan_Resume.pdf"
                    download
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
                    className="w-12 h-12 bg-white/10 hover:bg-white/15 rounded-full flex items-center justify-center transition-all text-white/80 relative overflow-hidden group"
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
                      <Download className="w-6 h-6" />
                    </motion.div>
                    <span className="absolute -bottom-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Download
                    </span>
                  </motion.a>

                  <motion.a
                    href="/Arhaan_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
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
                    className="w-12 h-12 bg-white/10 hover:bg-white/15 rounded-full flex items-center justify-center transition-all text-white/80 relative overflow-hidden group"
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
                      <ExternalLink className="w-6 h-6" />
                    </motion.div>
                    <span className="absolute -bottom-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View
                    </span>
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

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center md:text-left md:col-span-2"
                >
                  <h3 className="text-2xl font-bold mb-6">Person Behind The Code</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    I'm a Computer Science student at Manipal Institute of Technology, specializing in AI/ML and software development. My passion lies in creating innovative solutions that combine cutting-edge technology with practical applications.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CollapsibleSkillSection
                      icon={<Brain className="w-5 h-5 text-blue-400" />}
                      title="AI & ML"
                      color="text-blue-400"
                      points={[
                        "Building and training neural networks for various applications",
                        "Developing predictive models and recommendation systems",
                        "Working with natural language processing and computer vision",
                        "Implementing deep learning solutions for real-world problems",
                        "Currently pursuing a Minor Specialization in AI & ML at MIT, Manipal"
                      ]}
                    />

                    <CollapsibleSkillSection
                      icon={<Code2 className="w-5 h-5 text-emerald-400" />}
                      title="DSA & Development"
                      color="text-emerald-400"
                      points={[
                        "Expertise in Data Structures and Algorithms with C++ and Python",
                        "Active participation in competitive programming on platforms like LeetCode",
                        "Full-stack development experience with modern frameworks",
                        "Building scalable and efficient web applications",
                        "Strong problem-solving skills and algorithmic thinking"
                      ]}
                    />

                    <CollapsibleSkillSection
                      icon={<Target className="w-5 h-5 text-red-400" />}
                      title="Problem Solving"
                      color="text-red-400"
                      points={[
                        "Systematic approach to complex technical challenges",
                        "Strong debugging and optimization skills",
                        "Creative thinking for innovative solutions",
                        "Efficient algorithm design and implementation",
                        "Continuous learning and adaptation to new challenges"
                      ]}
                    />

                    <CollapsibleSkillSection
                      icon={<Users className="w-5 h-5 text-purple-400" />}
                      title="Leadership"
                      color="text-purple-400"
                      points={[
                        "Leading development teams in complex software projects",
                        "Implementing agile methodologies for efficient project management",
                        "Mentoring team members and fostering collaborative environments",
                        "Managing project timelines and deliverables effectively",
                        "Coordinating between technical and non-technical stakeholders"
                      ]}
                    />

                    <CollapsibleSkillSection
                      icon={<BarChart2 className="w-5 h-5 text-pink-400" />}
                      title="Digital Marketing"
                      color="text-pink-400"
                      points={[
                        "Strategic planning and execution of digital marketing campaigns",
                        "Data-driven decision making using analytics tools",
                        "SEO optimization and content strategy development",
                        "Social media marketing and community engagement",
                        "Performance tracking and ROI analysis",
                        "Integration of marketing automation tools"
                      ]}
                    />

                    <CollapsibleSkillSection
                      icon={<MessageSquare className="w-5 h-5 text-amber-400" />}
                      title="Communication"
                      color="text-amber-400"
                      points={[
                        "Clear and effective technical documentation",
                        "Presenting complex concepts to diverse audiences",
                        "Active listening and constructive feedback",
                        "Cross-functional team collaboration",
                        "Professional networking and relationship building"
                      ]}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center md:text-left"
                >
                  <h3 className="text-2xl font-bold mb-6">Education</h3>

                  <div className="space-y-8">
                    <TimelineItem year="2022 - Present" title="B.Tech in Computer Science { AI / ML }" description="Manipal Institute of Technology" />
                    <TimelineItem year="2022" title="Grade XII" description="Delhi Public School Rajnagar" />
                    <TimelineItem year="2020" title="Grade X" description="Delhi Public School Rajnagar" />
                  </div>
                </motion.div>
              </div>
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

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {[
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
                  title: "Speedy",
                  description:
                    "• Built an interactive reaction time test with Next.js and Framer Motion\n\n• Implemented random delay system to prevent anticipation\n\n• Created performance metrics and feedback system\n\n• Added dark mode support and responsive design\n\n• Integrated beautiful animations and transitions\n\n• Developed tracking system for best times\n\n• Deployed on Vercel with automatic CI/CD pipeline",
                  image: "/speedy_l.png",
                  tags: [
                    "Node.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "Framer Motion",
                    "Next.js",
                    "Vercel",
                    "CI/CD",
                    "React",
                    "Animation",
                  ],
                  links: [
                    { url: "https://speedy-green.vercel.app/", icon: ExternalLink },
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
              ].map((project) => (
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
          </div>
        </section>

        <section id="certifications" className="py-20 md:py-32 bg-zinc-950">
          <div className="container mx-auto px-6">
            <SectionHeader title="Certifications" icon={<Award className="w-6 h-6" />} />

            <CertificationsGrid />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 md:px-8">
          <SkillCategoryDisplayComponent />
        </section>

        {/* Progress Section */}
        <section id="achievements">
          <ProgressSection 
            githubUsername="17arhaan" 
            leetcodeUsername="arhaan17" 
          />
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
                    <a href="mailto:17arhaan.connect@gmail.com" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0 hover:bg-white/20 transition-colors">
                      <Mail className="w-5 h-5 text-gray-300" />
                    </a>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <a href="mailto:17arhaan.connect@gmail.com" className="text-white font-medium hover:text-gray-300 transition-colors">
                        17arhaan.connect@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <a href="tel:+919650984445" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0 hover:bg-white/20 transition-colors">
                      <Phone className="w-5 h-5 text-gray-300" />
                    </a>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <a href="tel:+919650984445" className="text-white font-medium hover:text-gray-300 transition-colors">
                        +919650984445
                      </a>
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

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
                          name="name"
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
                          name="email"
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
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                          placeholder="Your phone number"
                        />
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
                          name="company"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                          placeholder="Your company"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiry" className="block text-sm font-medium text-gray-400 mb-2">
                      Inquiry Type <span className="text-white/60">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <select
                        id="inquiry"
                        name="inquiry"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all appearance-none"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="Project">Project</option>
                        <option value="Job">Job</option>
                        <option value="Collaboration">Collaboration</option>
                        <option value="Other">Other</option>
                      </select>
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
                        name="website"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                        placeholder="https://your-website.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-400 mb-2">
                      Availability
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="relative">
                          <CalendarIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="text"
                            id="availability"
                            name="availability"
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all cursor-text"
                            placeholder="When are you available?"
                            value={date ? format(date, "PPP") : ""}
                            readOnly
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-zinc-900 border border-white/10" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="rounded-md"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                      Subject <span className="text-white/60">*</span>
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
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
                      <MessageSquare className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        ref={messageRef}
                        value={messageValue}
                        onChange={handleMessageChange}
                        style={{ height: messageHeight, overflow: 'hidden', resize: 'none' }}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 transition-all resize-none"
                        placeholder="Your message..."
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-6 py-3 text-white font-medium rounded-md transition-all duration-300 ${
                      isSubmitting 
                        ? 'bg-white/10 opacity-50 cursor-not-allowed' 
                        : submitStatus.type === 'success'
                        ? 'bg-green-500/20 hover:bg-green-500/30 border border-green-500/30'
                        : submitStatus.type === 'error'
                        ? 'bg-red-500/20 hover:bg-red-500/30 border border-red-500/30'
                        : 'bg-white/10 hover:bg-white/15 border border-white/10'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Sending...
                      </>
                    ) : submitStatus.type === 'success' ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center"
                      >
                        <motion.div
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="mr-2"
                        >
                          <Check className="w-4 h-4" />
                        </motion.div>
                        Message Sent!
                      </motion.div>
                    ) : submitStatus.type === 'error' ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center"
                      >
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="mr-2"
                        >
                          <X className="w-4 h-4" />
                        </motion.div>
                        Failed to Send
                      </motion.div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="cursor-pointer"
              onClick={() => setIsVideoPlaying(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setIsVideoPlaying(true);
                }
              }}
            >
              <img 
                src="/sign.png" 
                alt="Arhaan Girdhar" 
                className="h-24 w-auto object-contain hover:opacity-80 transition-opacity" 
              />
            </motion.div>
            
            <AnimatePresence>
              {isVideoPlaying && (
                <VideoPlayer 
                  isPlaying={isVideoPlaying} 
                  onEnded={() => {
                    setIsVideoPlaying(false);
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 5000);
                  }} 
                />
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-6"
            >
              <SocialLink icon={<Github className="w-5 h-5" />} href="https://github.com/17arhaan" />
              <SocialLink icon={<Linkedin className="w-5 h-5" />} href="https://www.linkedin.com/in/arhaan17/" />
              <LeetCodeLink href="https://leetcode.com/u/arhaan17/" />
              <SocialLink icon={<Mail className="w-5 h-5" />} href="mailto:17arhaan.connect@gmail.com" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Arhaan Girdhar. All rights reserved.</p>
            </motion.div>
          </div>
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
      description: "Comprehensive professional certification covering back-end development fundamentals, APIs, databases, security, and deployment. Building job-ready skills with hands-on projects and real-world applications. Mastered advanced concepts in server-side programming, database management, and API development. Implemented secure authentication systems and optimized database queries for performance.",
      credentialId: null,
      credentialURL: "",
      skills: ["Back-End Development", "APIs", "Database Design", "Python", "Django", "Version Control", "Cloud Deployment", "Security", "System Design", "Web Development"],
      image: "/meta.png",
    },
    {
      id: 5,
      title: "Foundations of AI and Machine Learning",
      issuer: "Microsoft",
      date: "May 2025",
      expiryDate: null,
      description: "Comprehensive introduction to AI & ML infrastructure, covering data pipelines, model frameworks, deployment strategies, and cloud computing solutions. Explored advanced topics in machine learning algorithms, neural networks, and deep learning architectures. Gained hands-on experience with Azure ML services and implemented end-to-end ML solutions for real-world problems.",
      credentialId: "MY6XZH187WW2",
      credentialURL: "https://www.coursera.org/account/accomplishments/verify/MY6XZH187WW2",
      skills: ["AI", "ML", "Data Management", "Model Frameworks", "Model Deployment", "Cloud Computing", "AI Infrastructure", "Version Control", "Scalability"],
      image: "/microsoft.svg",
    },
    {
      id: 7,
      title: "Digital Marketing Specialization",
      issuer: "Illinois",
      date: "April 2025",
      expiryDate: null,
      description: "Strategic digital marketing training focusing on data analysis, consumer behavior, brand measurement, and campaign attribution through practical application of tools and visualization techniques. Mastered advanced analytics platforms and developed comprehensive marketing strategies. Implemented data-driven decision making and ROI optimization techniques for various marketing campaigns.",
      credentialId: "1ME6P85IAKC7 | QDDUU62J27AK | HT1IYP3OUP4U",
      credentialURL: [
        {
          title: "Marketing in Digital World",
          url: "https://www.coursera.org/account/accomplishments/certificate/1ME6P85IAKC7"
        },
        {
          title: "Digital Marketing Analysis in Theory",
          url: "https://www.coursera.org/account/accomplishments/certificate/QDDUU62J27AK"
        },
        {
          title: "Digital Marketing Analysis in Practice",
          url: "https://www.coursera.org/account/accomplishments/certificate/HT1IYP3OUP4U"
        }
      ],
      skills: ["Data Analysis", "Consumer Behavior", "Brand Measurement", "Campaign Attribution", "Data Visualization", "Marketing Analytics", "Storytelling", "Business Impact"],
      image: "/igies.png",
    },
    {
      id: 10,
      title: "Leading Teams: Developing as a Leader",
      issuer: "University of Illinois Urbana-Champaign",
      date: "April 2024",
      expiryDate: null,
      description: "Comprehensive leadership development program focusing on personal growth and team dynamics. Mastered essential skills in team management and decision-making, developed expertise in leadership strategies and people development. Implemented effective communication techniques and conflict resolution strategies. Learned to build high-performing teams and foster a positive organizational culture.",
      credentialId: "ZU3G2X5YR2VG",
      credentialURL: "https://www.coursera.org/account/accomplishments/verify/ZU3G2X5YR2VG",
      skills: ["Leadership Development", "Team Management", "Decision Making", "People Development", "Research and Design", "Entrepreneurship"],
      image: "/igies.png",
    },
    {
      id: 6,
      title: "Foundations of Project Management",
      issuer: "Google",
      date: "April 2025",
      expiryDate: null,
      description: "Essential project management concepts including project selection, resource allocation, risk management, and team leadership for successful project delivery. Mastered agile methodologies and project management tools. Developed expertise in stakeholder management and project documentation. Implemented effective project planning and execution strategies.",
      credentialId: "PR9LFUKNWDA1",
      credentialURL: "https://www.coursera.org/account/accomplishments/certificate/PR9LFUKNWDA1",
      skills: ["Problem Solving", "Leadership", "Project Management", "Risk Management", "Responsiblity"],
      image: "/google.png",
    },
    {
      id: 4,
      title: "Generative AI with Large Language Models",
      issuer: "AWS",
      date: "Jan 2025",
      expiryDate: null,
      description: "Advanced training in Generative AI and LLMs, covering model training, fine-tuning, deployment, and optimization for real-world applications.",
      credentialId: "6763NRR61X28",
      credentialURL: "https://www.coursera.org/account/accomplishments/certificate/6763NRR61X28",
      skills: ["Generative AI", "Large Language Models", "Transformer Architecture", "Model Training", "Fine-Tuning", "AI Deployment", "Inference Optimization", "Scaling Laws", "Python", "Machine Learning"],
      image: "/aws.webp",
    },
    {
      id: 3,
      title: "Introduction to Generative AI",
      issuer: "Google",
      date: "Dec 2024",
      expiryDate: null,
      description: "Fundamental concepts of Generative AI, exploring its applications, differences from traditional ML, and practical implementation strategies.",
      credentialId: "5VKU3Z5HMB2G",
      credentialURL: "https://www.coursera.org/account/accomplishments/certificate/5VKU3Z5HMB2G",
      skills: ["Generative AI", "Machine Learning", "AI Applications", "Google AI Tools", "Deep Learning", "Model Development"],
      image: "/google.png",
    },
    {
      id: 9,
      title: "Mastering Big Data Analytics with PySpark",
      issuer: "Infosys",
      date: "October 2024",
      expiryDate: null,
      description: "Comprehensive training in big data analytics using PySpark, covering data processing, machine learning, and distributed computing for large-scale data analysis.",
      credentialURL: "https://drive.google.com/drive/u/0/folders/1S55QbJu8Pv5a8wAxj5SMgOviAwjTbmKl",
      skills: ["Big Data", "PySpark", "Data Processing", "Machine Learning", "Distributed Computing", "Data Analysis", "Python", "Data Engineering", "ETL", "Data Visualization"],
      image: "/infosys.webp",
    },
    {
      id: 2,
      title: "Neural Networks and Deep Learning",
      issuer: "DeepLearning.AI",
      date: "Dec 2024",
      expiryDate: null,
      description: "Comprehensive deep learning fundamentals covering neural network architectures, training techniques, and optimization strategies for AI applications.",
      credentialId: "1XMZBVRYNKB2",
      credentialURL: "https://www.coursera.org/account/accomplishments/certificate/1XMZBVRYNKB2",
      skills: ["Deep Learning", "Neural Networks", "AI", "Machine Learning", "Model Training", "Vectorization", "Hyperparameter Tuning", "AI Applications", "Model Optimization"],
      image: "/deeplearningai.png",
    },
    {
      id: 1,
      title: "Exploratory Data Analysis for Machine Learning",
      issuer: "IBM",
      date: "Dec 2024",
      expiryDate: null,
      description: "Essential data analysis techniques for machine learning, including data cleaning, feature engineering, and statistical analysis methods.",
      credentialId: "Y53G36TKQGCU",
      credentialURL: "https://www.coursera.org/account/accomplishments/certificate/Y53G36TKQGCU",
      skills: ["Machine Learning", "Data Preprocessing", "Feature Engineering", "Data Cleaning", "SQL", "NoSQL", "APIs", "Outlier Detection", "Feature Scaling", "Hypothesis Testing"],
      image: "/ibm.png",
    }
  ].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

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
                {cert.credentialId && (
                  <p className="text-gray-500 text-xs mt-1 text-center">
                    ID: {cert.credentialId}
                  </p>
                )}
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
                      className="w-96 h-48 rounded-lg overflow-hidden mr-4 bg-white/5 flex items-center justify-center border border-white/10"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={selectedCertificate.image}
                        alt={`${selectedCertificate.issuer} logo`}
                        className="w-full h-full object-contain p-4"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/generic-company-logo.png"
                        }}
                      />
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
                      {selectedCertificate.credentialURL && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                          className="mt-4"
                        >
                          {Array.isArray(selectedCertificate.credentialURL) ? (
                            <div className="space-y-2">
                              {selectedCertificate.credentialURL.map((cred, index) => (
                                <motion.a
                                  key={index}
                                  href={cred.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Verify {cred.title}
                                </motion.a>
                              ))}
                            </div>
                          ) : (
                            <motion.a
                              href={selectedCertificate.credentialURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Verify Credentials
                            </motion.a>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setSelectedCert(null)}
                    className="text-gray-400 hover:text-white p-1 z-10"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </motion.div>

                <div className="space-y-8">
                  {/* Description section */}
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

                    <motion.p
                      className="text-gray-200 leading-relaxed text-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      {selectedCertificate.description}
                    </motion.p>
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
      case "Speedy":
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
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
                      className="w-full md:w-96 h-48 rounded-lg overflow-hidden md:mr-4 bg-white/5 flex items-center justify-center border border-white/10 mb-4 md:mb-0"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
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
                        {links.map((link, index) => (
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
                        ))}
                      </div>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-white p-1 z-10"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
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

      {/* References Button - After timeline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mt-16"
      >
        <motion.a
          href="https://drive.google.com/drive/folders/1S55QbJu8Pv5a8wAxj5SMgOviAwjTbmKl?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg hover:bg-black/60 transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FileText className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          <span className="text-white/70 group-hover:text-white transition-colors">View References</span>
          <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
        </motion.a>
      </motion.div>

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
                      className="w-96 h-48 rounded-lg overflow-hidden mr-4 bg-white/5 flex items-center justify-center border border-white/10"
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

// Add this component before the Portfolio component
function CollapsibleSkillSection({ icon, title, color, points }: { icon: React.ReactNode; title: string; color: string; points: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-4">
          <motion.div 
            className={`p-3 rounded-lg ${color.replace('text-', 'bg-')} bg-opacity-10`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <h4 className={`text-xl font-semibold ${color} group-hover:scale-105 transition-transform`}>{title}</h4>
        </div>
        <motion.div 
          className={`p-2 rounded-full ${color.replace('text-', 'bg-')} bg-opacity-10`}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="w-6 h-6 text-white/70" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden"
            >
              {/* Header with close button */}
              <motion.div 
                className="p-4 border-b border-white/10 flex items-center justify-between"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className={`p-2 rounded-lg ${color.replace('text-', 'bg-')} bg-opacity-20`}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    {icon}
                  </motion.div>
                  <h3 className={`text-xl font-semibold ${color}`}>{title}</h3>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-white/70" />
                </motion.button>
              </motion.div>

              {/* Points with enhanced animations */}
              <div className="p-6 space-y-4">
                {points.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <motion.div 
                      className="relative"
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      {/* Glow effect */}
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-white/20 blur-sm"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                      {/* Main dot */}
                      <motion.div 
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-white`}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                    </motion.div>
                    <motion.span 
                      className="text-sm text-white/80 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {point.endsWith('.') ? point : `${point}.`}
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.2 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
