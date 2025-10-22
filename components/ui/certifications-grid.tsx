"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ExternalLink, X } from "lucide-react"
import Image from "next/image"

interface Certification {
  id: number
  title: string
  issuer: string
  date: string
  expiryDate?: string | null
  description: string
  credentialId?: string
  credentialURL?: string | { title: string; url: string }[] | null
  skills: string[]
  image: string
}

export default function CertificationsGrid() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const certifications: Certification[] = [
    {
      id: 15,
      title: "Google Cloud Fundamentals: Core Infrastructure",
      issuer: "Google",
      date: "Nov 2025",
      expiryDate: null,
      description: "This beginner-level course introduces the core concepts, services, and architecture of Google Cloud Platform (GCP). Learners gain hands-on experience with cloud computing, identity and access management, virtual machines, storage options, and application deployment. The program emphasizes how infrastructure is organized and controlled in GCP, how to build basic cloud environments, and how to scale applications efficiently.",
      credentialId: "Currently Ongoing",
      credentialURL: null,
      skills: ["Cloud Infrastructure", "GCP Resource Management", "IAM", "Scalability", "Application Deployment", "VM Setup", "Storage Configuration", "Google Cloud Platform", "Cloud Computing", "Infrastructure as Code"],
      image: "/google.png",
    },
    {
      id: 14,
      title: "Python for Data Science, AI & Development",
      issuer: "IBM",
      date: "Nov 2025",
      expiryDate: null,
      description: "A beginner-friendly, hands-on course designed to teach Python programming from scratch with a focus on data science and AI applications. Learners gain practical experience in writing Python code, working with data, and automating tasks using Jupyter Notebooks. Covers Python basics, data structures, control flow, OOP fundamentals, file handling, data analysis with NumPy and Pandas, and web scraping with BeautifulSoup & API access with requests.",
      credentialId: "Currently Ongoing",
      credentialURL: null,
      skills: ["Python Scripting", "Data Manipulation", "OOP", "Automation", "Web Scraping", "API Integration", "Data Analysis", "NumPy", "Pandas", "BeautifulSoup", "Jupyter Notebooks", "Machine Learning", "AI Applications"],
      image: "/ibm.png",
    },
    {
      id: 13,
      title: "Software Engineer Intern",
      issuer: "HackerRank",
      date: "July 2025",
      expiryDate: null,
      description: "Verified certification demonstrating proficiency in software engineering fundamentals including problem-solving techniques, algorithmic thinking, and programming skills. This credential validates competency in core computer science concepts, data structures, algorithms, and practical coding abilities essential for software engineering roles. The certification covers essential programming paradigms and best practices used in modern software development.",
      credentialId: "eea1b7288ec1",
      credentialURL: "https://www.hackerrank.com/certificates/eea1b7288ec1",
      skills: ["Software Engineering", "Problem Solving", "Algorithms", "Data Structures", "Programming", "Computer Science", "Coding", "Technical Assessment"],
      image: "/hackerrank.png",
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
      description: "Comprehensive digital marketing specialization covering strategic planning, implementation, and emerging technologies. Mastered data analysis, consumer behavior, brand measurement, and campaign attribution through practical application of tools and visualization techniques. Explored digital marketing revolution, AI integration, and emerging media strategies. Developed expertise in executing data-driven marketing campaigns and ROI optimization techniques.",
      credentialId: "1ME6P85IAKC7 | QDDUU62J27AK | HT1IYP3OUP4U | SVK1J4UO7A5K | S14GC9RAC5X1 | TLX9N9272I35",
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
        },
        {
          title: "Digital Marketing Implementation: Executing Strategies in a Connected, Data-Driven World",
          url: "https://www.coursera.org/account/accomplishments/verify/SVK1J4UO7A5K"
        },
        {
          title: "Digital Marketing Strategy: Navigating Emerging Media and AI",
          url: "http://coursera.org/account/accomplishments/verify/S14GC9RAC5X1"
        },
        {
          title: "The Digital Marketing Revolution",
          url: "https://www.coursera.org/account/accomplishments/verify/TLX9N9272I35"
        }
      ],
      skills: ["Data Analysis", "Consumer Behavior", "Brand Measurement", "Campaign Attribution", "Data Visualization", "Marketing Analytics", "Storytelling", "Business Impact", "Digital Marketing", "Web Analytics", "SEO", "Cross-Channel Marketing", "Customer Relationship Management", "AI Personalization", "Brand Management", "Marketing Automation", "Campaign Management", "Social Media Strategy", "Customer Experience Strategy", "Search Engine Optimization", "Emerging Technologies", "Data Ethics", "Marketing Communications", "Augmented Reality", "Data-Driven Decision-Making", "Strategic Communication", "Integrated Marketing Communications", "Artificial Intelligence", "Marketing Channel", "Innovation", "Marketing Strategies", "Business Strategy", "Business Transformation", "Case Studies", "Analysis", "Global Marketing", "Digital Transformation", "MarTech"],
      image: "/igies.png",
    },
    {
      id: 10,
      title: "Leading Teams: Developing as a Leader",
      issuer: "University of Illinois",
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
      skills: ["Machine Learning", "Data Preprocessing", "Feature Engineering", "Data Cleaning", "SQLite", "MongoDB", "APIs", "Outlier Detection", "Feature Scaling", "Hypothesis Testing"],
      image: "/ibm.png",
    },
    {
      id: 11,
      title: "Ethics in Engineering",
      issuer: "University of Michigan",
      date: "July 2025",
      expiryDate: null,
      description: "Comprehensive exploration of engineering ethics through four unique case studies including the VW emissions scandal, Denver airport baggage system failure, Therac 25 radiation machine malfunction, and Ariane 5 rocket launch disaster. Developed working knowledge of ethical foundations in engineering design and decision-making, analyzing key aspects that led to engineering failures and their subsequent corrective actions. Gained insights into engineering as a design discipline and its impact on humans under expert guidance.",
      credentialId: "SJLWN7K2IOV1",
      credentialURL: "https://www.coursera.org/account/accomplishments/verify/SJLWN7K2IOV1",
      skills: ["Engineering Ethics", "Case Study Analysis", "Risk Assessment", "Decision Making", "Problem Solving", "Critical Thinking", "Professional Responsibility", "Safety Engineering", "Failure Analysis"],
      image: "/michigan.jpg",
    },
    {
      id: 12,
      title: "Introduction to Back-End Development",
      issuer: "Meta",
      date: "July 2025",
      expiryDate: null,
      description: "Foundational course in the Meta Back-End Developer program covering core web development technologies and back-end fundamentals. Mastered HTML and CSS for webpage creation and styling, explored modern UI frameworks including Bootstrap and React for interactive user experiences. Built responsive layouts using grid systems and learned about front-end, back-end, and full-stack developer roles. Completed hands-on projects creating responsive webpages with text and images optimized for any screen size.",
      credentialId: "LBQ4R2YP81ZN",
      credentialURL: "https://www.coursera.org/account/accomplishments/verify/LBQ4R2YP81ZN",
      skills: ["Back-End Development", "HTML", "CSS", "Bootstrap", "React", "Responsive Design", "Web Development", "UI Frameworks", "JavaScript", "Front-End Development"],
      image: "/meta.png",
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
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 md:mb-6 flex items-center justify-center relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src={cert.image || "/placeholder.svg"}
                alt={cert.issuer}
                width={96}
                height={96}
                className="max-w-full max-h-full object-contain"
                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
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
                    {cert.credentialId === "Currently Ongoing" ? "Status: Currently Ongoing" : `ID: ${cert.credentialId}`}
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
                  <div className="flex items-start">
                    <motion.div
                      className="w-32 h-32 rounded-lg overflow-hidden mr-6 bg-white/5 flex items-center justify-center border border-white/10 relative flex-shrink-0"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={selectedCertificate.image}
                        alt={`${selectedCertificate.issuer} logo`}
                        fill
                        className="object-contain p-3"
                        sizes="128px"
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
                      {selectedCertificate.credentialURL ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                          className="mt-4"
                        >
                          {Array.isArray(selectedCertificate.credentialURL) ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {selectedCertificate.credentialURL.map((cred, index) => (
                                <motion.a
                                  key={index}
                                  href={cred.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="flex items-start px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors w-full"
                                >
                                  <ExternalLink className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm leading-relaxed">Verify {cred.title}</span>
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
                      ) : selectedCertificate.credentialId === "Currently Ongoing" ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                          className="mt-4"
                        >
                          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-400 rounded-md border border-blue-500/30">
                            <span className="text-sm font-medium">Course in Progress</span>
                          </div>
                        </motion.div>
                      ) : null}
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