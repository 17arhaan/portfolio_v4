"use client"

import React from "react"
import { motion } from "framer-motion"
import { User, FileText, Download, ExternalLink, Brain, Code2, Target, Users, BarChart2, MessageSquare } from "lucide-react"
import Image from "next/image"
import SectionHeader from "@/components/ui/section-header"
import TimelineItem from "@/components/ui/timeline-item"
import CollapsibleSkillSection from "@/components/ui/collapsible-skill-section"

export default function AboutSection() {
  return (
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
  )
} 