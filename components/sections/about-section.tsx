"use client"

import React from "react"
import { motion } from "framer-motion"
import { User, FileText, Download, ExternalLink } from "lucide-react"
import Image from "next/image"
import SectionHeader from "@/components/ui/section-header"
import TimelineItem from "@/components/ui/timeline-item"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-transparent">
      <div className="container mx-auto px-6">
        <SectionHeader title="About Me" icon={<User className="w-6 h-6" />} />

        {/* Three-column layout: Education | Photo + Resume | Person Behind The Code */}
        <div className="max-w-6xl mx-auto mt-12 md:mt-16">
          <div className="grid md:grid-cols-4 gap-10 md:gap-12 items-start">
            {/* Left: Education */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left order-3 md:order-1"
            >
              <h3 className="text-2xl font-bold mb-6">Education</h3>
              <div className="space-y-8">
                <TimelineItem year="2026" title="B.Tech in Computer Science {AI / ML}" description="Manipal Institute of Technology" />
                <TimelineItem year="2022" title="Grade XII" description="Delhi Public School Rajnagar" />
                <TimelineItem year="2020" title="Grade X" description="Delhi Public School Rajnagar" />
              </div>
            </motion.div>

            {/* Center: Photo + Resume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2 flex flex-col items-center"
            >
              <div className="relative">
                <motion.div
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white/20 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Image
                    src="/pfp.png"
                    alt="Arhaan Girdhar"
                    width={224}
                    height={224}
                    className="w-full h-full object-cover transition-all duration-500"
                    priority={true}
                    quality={95}
                    sizes="(max-width: 768px) 192px, 224px"
                  />
                </motion.div>
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-white/40"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-white/40"></div>
              </div>

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
                  <motion.a
                    href="https://drive.google.com/drive/folders/1S55QbJu8Pv5a8wAxj5SMgOviAwjTbmKl?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Certificates"
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
                    transition={{ duration: 0.3, delay: 0.9 }}
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
                        scale: [1, 1.1, 0.95, 1.05, 1],
                        rotate: [0, 5, -5, 3, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                    >
                      <FileText className="w-6 h-6" />
                    </motion.div>
                    <span className="absolute -bottom-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Certificates
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

            {/* Right: Person Behind The Code */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center md:text-left order-2 md:order-3 md:col-span-2"
            >
              <h3 className="text-2xl font-bold mb-6">Person Behind The Code</h3>
              <p className="text-gray-300 leading-relaxed text-[0.95rem] md:text-[1rem]">
                I'm a Computer Science student at MIT Manipal specializing in AI/ML. I love building scalable ideas that solve real-world problems—from intelligent applications to production-grade software deployments. 
                Beyond coursework, I focus on end-to-end product thinking: data pipelines, model training, evaluation, and reliable cloud infrastructure with CI/CD.
                <br/>
                I enjoy translating ambiguous ideas into shipped features with measurable impact and clean engineering practices.
                <br/>
                Open to collaborations, research projects, and connecting with people passionate about building something meaningful.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 