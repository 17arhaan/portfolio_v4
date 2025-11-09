"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import ReactConfetti from 'react-confetti'

// Section Components
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ExperienceSection from "@/components/sections/experience-section"
import FreelanceSection from "@/components/sections/freelance-section"
import ProjectsSection from "@/components/sections/projects-section"
import CertificationsSection from "@/components/sections/certifications-section"
import ContactSection from "@/components/sections/contact-section"
// Footer removed

// UI Components
import HamburgerMenu from "@/components/ui/hamburger-menu"
import CustomCursor from "@/components/custom-cursor"
import SkillCategoryDisplayComponent from "@/components/skill-category-display"
import ProgressSection from "@/components/progress-section"

function VideoPlayer({ isPlaying, onEnded }: { isPlaying: boolean; onEnded: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  }, [isPlaying]);

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
    "AI / ML Engineer",
    "CS Undergraduate",
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
      const sections = ["home", "about", "experience", "freelance", "projects", "certifications", "skills", "achievements", "contact"]
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
    <div className="min-h-screen font-mono relative overflow-hidden text-foreground">
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

      {/* Simple static background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" />

      {/* Global video overlay */}
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



      {/* Logo and Navigation */}
      <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50" role="banner">
        <nav role="navigation" aria-label="Main navigation">
          <button
            onClick={() => scrollToSection("home")}
            className="focus:outline-none hover:opacity-80 transition-opacity"
            aria-label="Go to home section"
          >
            <Image 
              src="/sign.png" 
              alt="Arhaan Girdhar Logo" 
              width={56} 
              height={56} 
              className="h-14 w-auto object-contain" 
              priority={true}
              unoptimized={true}
            />
          </button>
        </nav>
      </header>

      {/* Hidden navigation for SEO sitelinks */}
      <nav className="sr-only" aria-label="Site navigation">
        <ul>
          <li><a href="/Arhaan_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#certifications">Certifications</a></li>
        </ul>
      </nav>

      {/* Hamburger Menu */}
      <HamburgerMenu scrollToSection={scrollToSection} activeSection={activeSection} />

      <main className="relative z-10" role="main">
        <HeroSection 
          typedText={typedText} 
          scrollToSection={scrollToSection} 
        />

        <div aria-hidden className="section-divider my-12 md:my-16" />

        <AboutSection />

        <div aria-hidden className="section-divider my-12 md:my-16" />

        <ExperienceSection />

        <FreelanceSection />

        <div aria-hidden className="section-divider my-12 md:my-16" />

        <ProjectsSection />

        <div aria-hidden className="section-divider my-12 md:my-16" />

        <CertificationsSection />

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 md:px-8">
          <SkillCategoryDisplayComponent />
        </section>

        <div aria-hidden className="section-divider my-12 md:my-16" />

        {/* Progress Section */}
        <section id="achievements">
          <ProgressSection 
            githubUsername="17arhaan" 
            leetcodeUsername="arhaan17" 
          />
        </section>

        <div aria-hidden className="section-divider my-12 md:my-16" />

        <ContactSection 
          isVideoPlaying={isVideoPlaying}
          setIsVideoPlaying={setIsVideoPlaying}
          setShowConfetti={setShowConfetti}
          VideoPlayer={VideoPlayer}
        />
      </main>

      {/* Footer removed */}
    </div>
  )
}
