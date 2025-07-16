"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import ReactConfetti from 'react-confetti'

// Section Components
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ExperienceSection from "@/components/sections/experience-section"
import ProjectsSection from "@/components/sections/projects-section"
import CertificationsSection from "@/components/sections/certifications-section"
import ContactSection from "@/components/sections/contact-section"
import FooterSection from "@/components/sections/footer-section"

// UI Components
import MobileMenu from "@/components/ui/mobile-menu"
import CustomCursor from "@/components/custom-cursor"
import SkillCategoryDisplayComponent from "@/components/skill-category-display"
import ProgressSection from "@/components/progress-section"

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
        {windowSize.width > 0 && Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
            initial={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
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
              <Image 
                src="/sign.png" 
                alt="Arhaan Girdhar" 
                width={56} 
                height={56} 
                className="h-14 w-auto object-contain my-auto mt-[3px]" 
                priority={true}
                unoptimized={true}
              />
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
        <HeroSection 
          typedText={typedText} 
          scrollToSection={scrollToSection} 
        />

        <AboutSection />

        <ExperienceSection />

        <ProjectsSection />

        <CertificationsSection />

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

        <ContactSection />
      </main>

      <FooterSection 
        isVideoPlaying={isVideoPlaying}
        setIsVideoPlaying={setIsVideoPlaying}
        setShowConfetti={setShowConfetti}
        VideoPlayer={VideoPlayer}
      />
    </div>
  )
}
