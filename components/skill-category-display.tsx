"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, Layers, Library, Wrench, Globe, Brain, Languages, Terminal, MousePointerClick, X } from "lucide-react"

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
  description: string
}

export default function SkillCategoryDisplay() {
  const categories: SkillCategory[] = [
    "programming",
    "frameworks",
    "libraries",
    "tools",
    "platforms",
    "domains",
    "languages",
    "commands",
  ]

  const categoryLabels: Record<SkillCategory, string> = {
    programming: "Programming",
    frameworks: "Frameworks",
    libraries: "Libraries",
    tools: "Tools",
    platforms: "Platforms",
    domains: "Domains",
    languages: "Languages",
    commands: "Commands",
  }

  const categoryIcons: Record<SkillCategory, React.ReactNode> = {
    programming: <Code2 className="w-5 h-5" />,
    frameworks: <Layers className="w-5 h-5" />,
    libraries: <Library className="w-5 h-5" />,
    tools: <Wrench className="w-5 h-5" />,
    platforms: <Globe className="w-5 h-5" />,
    domains: <Brain className="w-5 h-5" />,
    languages: <Languages className="w-5 h-5" />,
    commands: <Terminal className="w-5 h-5" />,
  }

  const [activeCategory, setActiveCategory] = useState<SkillCategory | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; description: string } | null>(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<SkillCategory | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setAnimationComplete(false)
    if (activeCategory) {
      const timer = setTimeout(() => {
        setAnimationComplete(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [activeCategory])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setSelectedSkill(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Complete skills data from the reference with added descriptions
  const skillsData: Record<SkillCategory, Skill[]> = {
    programming: [
      {
        name: "Python",
        level: 95,
        description:
          "My primary programming language with extensive experience in data science, machine learning, and backend development. Proficient in Python frameworks like Django and Flask.",
      },
      {
        name: "JavaScript",
        level: 70,
        description:
          "Used for frontend development and interactive web applications. Experienced with modern ES6+ features and asynchronous programming patterns.",
      },
      {
        name: "TypeScript",
        level: 20,
        description:
          "Recently started learning TypeScript to add static typing to JavaScript projects. Currently building small components and learning type definitions.",
      },
      {
        name: "Java",
        level: 60,
        description:
          "Used Java for Android development and university coursework. Familiar with OOP principles, collections, and multithreading in Java.",
      },
      {
        name: "C++",
        level: 75,
        description:
          "Strong foundation in C++ from algorithm implementation and competitive programming. Experience with STL, memory management, and optimization techniques.",
      },
      {
        name: "C",
        level: 75,
        description:
          "Used for system programming, embedded systems projects, and understanding computer architecture. Comfortable with pointers, memory allocation, and low-level operations.",
      },
      {
        name: "MySQL",
        level: 90,
        description:
          "Extensive experience designing and optimizing relational databases. Proficient in complex queries, stored procedures, and database normalization.",
      },
      {
        name: "PostgreSQL",
        level: 75,
        description:
          "Used for projects requiring advanced database features. Familiar with JSON operations, full-text search, and performance tuning in PostgreSQL.",
      },
    ],
    frameworks: [
      {
        name: "ReactJS",
        level: 85,
        description:
          "My primary frontend framework. Experienced with hooks, context API, and state management solutions like Redux. Built multiple production applications with React.",
      },
      {
        name: "NodeJS",
        level: 80,
        description:
          "Used for building backend services and APIs. Comfortable with Express.js, middleware patterns, and asynchronous programming in Node.",
      },
      {
        name: "Django",
        level: 85,
        description:
          "Extensive experience building full-stack web applications with Django. Proficient with the ORM, authentication system, and admin interface customization.",
      },
      {
        name: "Flask",
        level: 90,
        description:
          "Go-to framework for lightweight Python web applications and microservices. Experienced with extensions, blueprints, and RESTful API design.",
      },
      {
        name: "Tailwind CSS",
        level: 70,
        description:
          "Recently adopted for rapid UI development. Appreciate the utility-first approach and customization options for creating responsive designs.",
      },
      {
        name: "Bootstrap",
        level: 85,
        description:
          "Extensive experience creating responsive layouts and components. Familiar with customization using Sass and Bootstrap's JavaScript components.",
      },
      {
        name: "jQuery",
        level: 80,
        description:
          "Used in legacy projects for DOM manipulation and AJAX requests. Understand the library's core concepts and plugin architecture.",
      },
      {
        name: "Express.js",
        level: 65,
        description:
          "Used for building RESTful APIs and server-side applications with Node.js. Familiar with routing, middleware, and error handling patterns.",
      },
      {
        name: "Next.js",
        level: 70,
        description:
          "Recently adopted for React projects requiring server-side rendering and static site generation. Learning advanced features like API routes and incremental static regeneration.",
      },
      {
        name: "FastAPI",
        level: 45,
        description:
          "Beginning to use for high-performance Python APIs. Appreciate the automatic documentation, type checking, and async support.",
      },
      {
        name: "restAPI",
        level: 75,
        description:
          "Experience designing and implementing RESTful APIs following best practices. Proficient with API documentation, versioning, and security measures.",
      },
      {
        name: "Chart.js",
        level: 70,
        description:
          "Used for creating interactive and responsive data visualizations. Familiar with various chart types, customization options, and animation features.",
      },
    ],
    libraries: [
      {
        name: "NumPy",
        level: 95,
        description:
          "Core library for numerical computing in my data science workflow. Expert in array operations, broadcasting, and vectorized calculations.",
      },
      {
        name: "Pandas",
        level: 95,
        description:
          "Essential for data manipulation and analysis in my projects. Proficient with DataFrame operations, groupby, merging, and time series analysis.",
      },
      {
        name: "Matplotlib",
        level: 95,
        description:
          "Primary visualization library for creating static, interactive, and publication-quality figures. Experienced with customizing plots for data presentation.",
      },
      {
        name: "Seaborn",
        level: 90,
        description:
          "Used for statistical data visualization. Familiar with creating complex visualizations like heatmaps, pair plots, and distribution plots.",
      },
      {
        name: "PyTorch",
        level: 85,
        description:
          "Preferred deep learning framework for research projects. Experienced with building custom neural network architectures and training pipelines.",
      },
      {
        name: "Scikit-learn",
        level: 85,
        description:
          "Go-to library for classical machine learning algorithms. Proficient with the pipeline API, model selection, and evaluation metrics.",
      },
      {
        name: "OpenCV",
        level: 80,
        description:
          "Used for computer vision projects. Experienced with image processing, feature detection, and object tracking algorithms.",
      },
      {
        name: "OpenMPI",
        level: 75,
        description:
          "Used for distributed computing in high-performance applications. Familiar with parallel programming patterns and communication protocols.",
      },
      {
        name: "TensorFlow",
        level: 75,
        description:
          "Experience building and deploying deep learning models. Familiar with both the Keras API and lower-level TensorFlow operations.",
      },
      {
        name: "Transformers",
        level: 60,
        description:
          "Used for NLP projects with pre-trained models. Learning advanced techniques for fine-tuning and deploying transformer-based models.",
      },
      {
        name: "SciPy",
        level: 50,
        description:
          "Used for scientific computing tasks like optimization, signal processing, and statistical analysis. Building deeper expertise in specific modules.",
      },
      {
        name: "CUDA",
        level: 70,
        description:
          "Experience accelerating computations with GPU programming. Familiar with memory management and optimization techniques for CUDA kernels.",
      },
      {
        name: "Selenium",
        level: 65,
        description:
          "Experience with web automation and testing using Selenium. Familiar with element locators, wait strategies, and cross-browser testing.",
      },
    ],
    tools: [
      {
        name: "Microsoft Office",
        level: 100,
        description:
          "Expert in the entire Office suite, particularly Excel for data analysis, PowerPoint for presentations, and Word for documentation.",
      },
      {
        name: "HTML5",
        level: 95,
        description:
          "Extensive experience with modern HTML features, semantic markup, and accessibility best practices for web development.",
      },
      {
        name: "CSS3",
        level: 95,
        description:
          "Strong skills in responsive design, animations, grid layouts, and CSS variables. Familiar with preprocessors like Sass.",
      },
      {
        name: "Git",
        level: 95,
        description:
          "Daily use for version control. Proficient with branching strategies, resolving conflicts, and collaborative workflows.",
      },
      {
        name: "Jupyter Notebook",
        level: 90,
        description:
          "Essential tool for data exploration, visualization, and creating reproducible research. Experienced with advanced features and extensions.",
      },
      {
        name: "MATLAB",
        level: 80,
        description:
          "Used for numerical computing, signal processing, and algorithm prototyping in academic projects. Familiar with toolboxes for specialized domains.",
      },
      {
        name: "JavaFX",
        level: 70,
        description:
          "Experience building desktop applications with Java. Familiar with the component model, styling, and event handling.",
      },
      {
        name: "Docker",
        level: 65,
        description:
          "Used for containerizing applications and ensuring consistent development environments. Learning orchestration with Docker Compose.",
      },
      {
        name: "Azure",
        level: 60,
        description:
          "Experience deploying applications and services to Microsoft's cloud platform. Familiar with Azure Functions, App Service, and Storage.",
      },
      {
        name: "AWS",
        level: 40,
        description:
          "Beginning to use services like S3, Lambda, and EC2. Currently expanding knowledge of the AWS ecosystem for cloud-native applications.",
      },
    ],
    platforms: [
      {
        name: "GitHub Pages",
        level: 90,
        description:
          "Regularly use for hosting static websites and documentation. Familiar with custom domains, Jekyll integration, and CI/CD workflows.",
      },
      {
        name: "Vercel",
        level: 85,
        description:
          "Preferred platform for deploying Next.js applications. Experienced with preview deployments, environment variables, and serverless functions.",
      },
      {
        name: "Google Cloud",
        level: 55,
        description:
          "Used GCP services for machine learning projects. Familiar with Google Colab, Cloud Storage, and BigQuery for data processing.",
      },
      {
        name: "Heroku",
        level: 60,
        description:
          "Experience deploying web applications and APIs. Familiar with the CLI, add-ons ecosystem, and review apps workflow.",
      },
      {
        name: "Netlify",
        level: 60,
        description:
          "Used for static site hosting with continuous deployment. Familiar with forms, functions, and identity services.",
      },
    ],
    domains: [
      {
        name: "Data Structures and Algorithms",
        level: 95,
        description:
          "Strong foundation in algorithm design, complexity analysis, and optimization. Regularly practice competitive programming and system design.",
      },
      {
        name: "Object Oriented Programming",
        level: 90,
        description:
          "Extensive experience applying OOP principles across multiple languages. Proficient with design patterns, SOLID principles, and clean code practices.",
      },
      {
        name: "Artificial Intelligence",
        level: 90,
        description:
          "Broad knowledge of AI concepts, algorithms, and applications. Experience implementing search algorithms, knowledge representation, and reasoning systems.",
      },
      {
        name: "Database Management",
        level: 95,
        description:
          "Expert in database design, normalization, query optimization, and administration for both SQL and NoSQL databases.",
      },
      {
        name: "Machine Learning",
        level: 90,
        description:
          "Strong theoretical understanding and practical experience implementing supervised and unsupervised learning algorithms for various applications.",
      },
      {
        name: "Deep Learning",
        level: 80,
        description:
          "Experience designing and training neural networks for computer vision and NLP tasks. Familiar with CNNs, RNNs, and transformer architectures.",
      },
      {
        name: "Computer Vision",
        level: 75,
        description:
          "Applied computer vision techniques for object detection, image segmentation, and feature extraction in research and practical projects.",
      },
      {
        name: "Natural Language Processing",
        level: 70,
        description:
          "Experience with text classification, sentiment analysis, and language generation. Currently exploring advanced NLP with transformer models.",
      },
      {
        name: "Web Development",
        level: 90,
        description:
          "Full-stack expertise across multiple frameworks and technologies. Strong understanding of web standards, performance optimization, and security best practices.",
      },
      {
        name: "Data Science",
        level: 80,
        description:
          "Experience with the complete data science workflow from collection and cleaning to modeling and deployment. Familiar with statistical methods and visualization techniques.",
      },
      {
        name: "Cloud Computing",
        level: 50,
        description:
          "Growing experience with cloud services and architectures. Learning best practices for scalable, resilient cloud-native applications.",
      },
      {
        name: "DevOps",
        level: 40,
        description:
          "Beginning to implement CI/CD pipelines and infrastructure as code. Learning containerization, orchestration, and monitoring tools.",
      },
      {
        name: "Parallel Programming",
        level: 65,
        description:
          "Experience optimizing algorithms for multi-core and distributed systems. Familiar with threading models, synchronization, and parallel patterns.",
      },
    ],
    languages: [
      {
        name: "English",
        level: 95,
        description:
          "Professional working proficiency. Comfortable with technical writing, presentations, and business communication in English.",
      },
      {
        name: "Hindi",
        level: 100,
        description:
          "Native language with complete fluency in reading, writing, and speaking. Able to communicate complex technical concepts effectively.",
      },
    ],
    commands: [
      {
        name: "PowerShell",
        level: 85,
        description:
          "Proficient with PowerShell for Windows automation and system administration. Experience writing reusable scripts and modules.",
      },
      {
        name: "Bash",
        level: 80,
        description:
          "Daily use for Linux/Unix environments. Comfortable with shell scripting for automation and system management.",
      },
      {
        name: "Shell Scripting",
        level: 75,
        description:
          "Experience writing portable shell scripts for automation across different environments. Familiar with common utilities and text processing tools.",
      },
      {
        name: "cmd",
        level: 90,
        description:
          "Extensive experience with Windows Command Prompt for system administration and batch file creation.",
      },
      {
        name: "Terminal Navigation",
        level: 95,
        description: "Expert in efficient command-line navigation and file manipulation across operating systems.",
      },
      {
        name: "Package Management",
        level: 85,
        description:
          "Proficient with package managers like npm, pip, and apt for dependency management and system maintenance.",
      },
      {
        name: "Git",
        level: 90,
        description:
          "Proficient in version control with Git. Experienced with branching strategies, merge conflicts, and collaborative workflows.",
      },
      {
        name: "Docker",
        level: 85,
        description:
          "Skilled in containerization and orchestration. Experienced with Docker Compose, multi-stage builds, and container optimization.",
      },
      {
        name: "Linux",
        level: 80,
        description:
          "Comfortable with Linux system administration, shell scripting, and command-line tools. Experienced with package management and system configuration.",
      },
      {
        name: "zsh",
        level: 85,
        description:
          "Proficient in zsh shell scripting and configuration. Experienced with custom aliases, plugins, and advanced shell features for improved productivity.",
      },
    ],
  }

  const getSkillColor = (level: number) => {
    if (level >= 90) return "rgba(255, 255, 255, 1)"
    if (level >= 70) return "rgba(220, 220, 220, 0.95)"
    if (level >= 50) return "rgba(200, 200, 200, 0.9)"
    return "rgba(180, 180, 180, 0.85)"
  }

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill({
      name: skill.name,
      description: skill.description,
    })
  }

  return (
    <div className="relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-5 pointer-events-none">
        {Array.from({ length: 64 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-white/20" />
        ))}
      </div>

      {/* Category selector */}
      <div className="flex justify-center relative z-10">
        <motion.div
          className="flex flex-wrap gap-4 mb-12 pb-2 justify-center max-w-full"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category, index) => (
            <div key={category} className="relative group">
              <motion.button
                onClick={() => setActiveCategory(category)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  activeCategory === category
                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
                whileHover={{
                  scale: 1.15,
                  rotate: [0, 5, -5, 0],
                  boxShadow: "0 0 15px rgba(255,255,255,0.4)",
                  transition: {
                    scale: { duration: 0.2 },
                    rotate: { duration: 0.5, repeat: 0, repeatType: "loop" },
                    boxShadow: { duration: 0.2 },
                  },
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.1 * index, duration: 0.4 },
                }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.2 },
                  }}
                >
                  {categoryIcons[category]}
                </motion.div>
              </motion.button>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {activeCategory ? (
          <>
            {/* Category title */}
            <motion.div
              key={`title-${activeCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold inline-block relative">
                {categoryLabels[activeCategory]}
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute bottom-0 left-0 h-[2px] bg-white/50"
                />
              </h3>
            </motion.div>

            {/* Skills grid */}
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`left-${activeCategory}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {skillsData[activeCategory]
                    .slice(0, Math.ceil(skillsData[activeCategory].length / 2))
                    .map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onClick={() => handleSkillClick(skill)}
                      >
                        <div className="flex justify-between items-center cursor-pointer">
                          <motion.span
                            className="text-gray-200 font-medium"
                            animate={{
                              scale: hoveredSkill === skill.name ? 1.05 : 1,
                              color: hoveredSkill === skill.name ? "#ffffff" : "#e0e0e0",
                            }}
                          >
                            {skill.name}
                          </motion.span>
                          <motion.div
                            className="bg-white/10 rounded-full px-2 py-0.5 text-sm"
                            animate={{
                              backgroundColor:
                                hoveredSkill === skill.name ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
                            }}
                          >
                            {skill.level}%
                          </motion.div>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1.5,
                              delay: 0.2 * index,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full relative"
                            style={{
                              background: `linear-gradient(90deg, 
                              rgba(255,255,255,0.7) ${skill.level - 30}%, 
                              ${getSkillColor(skill.level)} 100%)`,
                            }}
                          >
                            {/* Animated glow effect */}
                            {hoveredSkill === skill.name && (
                              <motion.div
                                className="absolute inset-0 rounded-full"
                                animate={{
                                  boxShadow: [
                                    "0 0 3px rgba(255,255,255,0.5)",
                                    "0 0 7px rgba(255,255,255,0.7)",
                                    "0 0 3px rgba(255,255,255,0.5)",
                                  ],
                                }}
                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                              />
                            )}
                          </motion.div>

                          {/* Animated progress indicator */}
                          {animationComplete && (
                            <motion.div
                              className="absolute top-0 bottom-0 w-1 bg-white/80 rounded-full"
                              initial={{ left: 0 }}
                              animate={{ left: `${skill.level}%` }}
                              transition={{ duration: 0.3 }}
                              style={{ display: hoveredSkill === skill.name ? "block" : "none" }}
                            />
                          )}
                        </div>
                      </motion.div>
                    ))}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`right-${activeCategory}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {skillsData[activeCategory]
                    .slice(Math.ceil(skillsData[activeCategory].length / 2))
                    .map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1 * (index + Math.ceil(skillsData[activeCategory].length / 2)),
                        }}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onClick={() => handleSkillClick(skill)}
                      >
                        <div className="flex justify-between items-center cursor-pointer">
                          <motion.span
                            className="text-gray-200 font-medium"
                            animate={{
                              scale: hoveredSkill === skill.name ? 1.05 : 1,
                              color: hoveredSkill === skill.name ? "#ffffff" : "#e0e0e0",
                            }}
                          >
                            {skill.name}
                          </motion.span>
                          <motion.div
                            className="bg-white/10 rounded-full px-2 py-0.5 text-sm"
                            animate={{
                              backgroundColor:
                                hoveredSkill === skill.name ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
                            }}
                          >
                            {skill.level}%
                          </motion.div>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1.5,
                              delay: 0.2 * (index + Math.ceil(skillsData[activeCategory].length / 2)),
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full relative"
                            style={{
                              background: `linear-gradient(90deg, 
                              rgba(255,255,255,0.7) ${skill.level - 30}%, 
                              ${getSkillColor(skill.level)} 100%)`,
                            }}
                          >
                            {/* Animated glow effect */}
                            {hoveredSkill === skill.name && (
                              <motion.div
                                className="absolute inset-0 rounded-full"
                                animate={{
                                  boxShadow: [
                                    "0 0 3px rgba(255,255,255,0.5)",
                                    "0 0 7px rgba(255,255,255,0.7)",
                                    "0 0 3px rgba(255,255,255,0.5)",
                                  ],
                                }}
                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                              />
                            )}
                          </motion.div>

                          {/* Animated progress indicator */}
                          {animationComplete && (
                            <motion.div
                              className="absolute top-0 bottom-0 w-1 bg-white/80 rounded-full"
                              initial={{ left: 0 }}
                              animate={{ left: `${skill.level}%` }}
                              transition={{ duration: 0.3 }}
                              style={{ display: hoveredSkill === skill.name ? "block" : "none" }}
                            />
                          )}
                        </div>
                      </motion.div>
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Skill level legend */}
            <motion.div
              className="mt-16 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="inline-flex items-center space-x-8 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  <span className="text-sm text-gray-400">Beginner</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-white/50"></div>
                  <span className="text-sm text-gray-300">Intermediate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-white/70"></div>
                  <span className="text-sm text-gray-200">Advanced</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                  <span className="text-sm text-white">Expert</span>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          // Default state - prompt to select a category
          <motion.div
            key="default-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 px-4"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="text-white/50 mb-6"
            >
              <MousePointerClick className="w-12 h-12" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold text-center text-white/90 mb-3">
              Choose an icon above to view skills
            </h3>
            <p className="text-center text-white/60 max-w-md">
              Select a category to explore my proficiency levels in different skill areas
            </p>

            <motion.div
              className="mt-12 grid grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {categories.slice(0, 4).map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                    <div className="text-white/70">{categoryIcons[category]}</div>
                  </div>
                  <span className="text-xs text-white/50">{categoryLabels[category]}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skill description popup */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4 py-6"
            style={{ pointerEvents: "none" }}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
            <motion.div
              ref={popupRef}
              className="bg-black/70 backdrop-blur-md border border-white/20 rounded-md p-5 max-w-sm w-full relative z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              style={{ pointerEvents: "auto" }}
            >
              <div className="absolute -top-3 -right-3">
                <motion.button
                  onClick={() => setSelectedSkill(null)}
                  className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              </div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="flex items-center mb-3">
                  <div className="text-white/70 text-3xl font-serif mr-2">"</div>
                  <h4 className="text-lg font-bold text-white">{selectedSkill.name}</h4>
                </div>

                <p className="text-white/90 text-sm leading-relaxed pl-4 border-l-2 border-white/30">
                  {selectedSkill.description}
                </p>

                <div className="flex justify-end mt-3">
                  <div className="text-white/70 text-3xl font-serif">"</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
