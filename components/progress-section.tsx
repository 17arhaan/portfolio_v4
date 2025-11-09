"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github, Code, Trophy, Star, BookOpen, GitPullRequest, Loader2, Award, BarChart2, TrendingUp, Zap, Target, Crown, Medal } from "lucide-react"
import { getGitHubStats } from "@/lib/github"
import { getLeetCodeStats } from "@/lib/leetcode"

interface ProgressSectionProps {
  githubUsername: string
  leetcodeUsername: string
}

// Achievement type definitions
interface Achievement {
  id: number
  title: string
  description?: string
  year: number
  month: string
  type: 'hackathon' | 'competition' | 'ranking' | 'certification'
  position?: string
  participants?: string
  prize?: string
  details?: string[]
}

export default function ProgressSection({ githubUsername, leetcodeUsername }: ProgressSectionProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [stats, setStats] = useState({
    github: {
      stars: 0,
      publicRepos: 0,
      contributions: 0,
      topPercentage: 0
    },
    leetcode: {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      ranking: 0
    }
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        setError(null)
        
        console.log('Fetching GitHub stats for:', githubUsername)
        const [githubStats, leetcodeStats] = await Promise.all([
          getGitHubStats(githubUsername),
          getLeetCodeStats(leetcodeUsername)
        ])
        
        console.log('GitHub stats response:', githubStats)

        setStats({
          github: {
            stars: githubStats.stars || 0,
            publicRepos: githubStats.publicRepos || 0,
            contributions: githubStats.contributions || 0,
            topPercentage: githubStats.topPercentage || 0
          },
          leetcode: {
            totalSolved: leetcodeStats.totalSolved,
            easySolved: leetcodeStats.easySolved,
            mediumSolved: leetcodeStats.mediumSolved,
            hardSolved: leetcodeStats.hardSolved,
            ranking: leetcodeStats.ranking
          }
        })
      } catch (err) {
        console.error('Error fetching stats:', err)
        if (err instanceof Error && err.message.includes('GitHub token')) {
          setError("GitHub API configuration needed. Please check the console for setup instructions.")
        } else {
          setError("Failed to fetch stats. Please try again later.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [githubUsername, leetcodeUsername])



  // Enhanced achievements data with chronological order and detailed information
  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'MET Rank - 171',
      year: 2020,
      month: 'May',
      type: 'ranking' as const,
      // position: '171',
      participants: 'Amongst 50,000+ applicants',
      details: [
        'Achieved All India Rank 171 in Manipal Entrance Test among 150,000+ applicants',
        'Secured admission to B.Tech Computer Science program at Manipal Institute of Technology',
        'Demonstrated exceptional performance in Mathematics, Physics, and Chemistry',
        'Top 0.1% of all test takers nationwide',
        'Achievement recognized by Manipal Academy of Higher Education'
      ]
    },
    {
      id: 2,
      title: 'Think-a-thon',
      description: 'Innovation Competition',
      year: 2024,
      month: 'March',
      type: 'competition' as const,
      position: 'Participant',
      details: [
        'Participated in university-wide innovation and idea competition',
        'Presented AI-powered solution for educational technology enhancement',
        'Competed against 200+ teams from various engineering disciplines',
        'Demonstrated exceptional problem-solving and innovative thinking',
        'Received recognition from university administration and industry mentors'
      ]
    },
    {
      id: 3,
      title: 'Hacksplosion',
      description: 'Tech Hackathon',
      year: 2024,
      month: 'September',
      type: 'hackathon' as const,
      position: 'Participant',
      details: [
        'Participated in major tech hackathon with 500+ participants',
        'Developed full-stack application in 48 hours using modern web technologies',
        'Implemented AI/ML features for enhanced user experience',
        'Presented solution to panel of industry experts and venture capitalists',
        'Gained valuable experience and networking connections'
      ]
    },
    {
      id: 4,
      title: 'Creathon',
      description: 'Coding Challenge',
      year: 2024,
      month: 'November',
      type: 'competition' as const,
      position: 'Participant',
      details: [
        'Participated in creative tech challenge with 300+ participating teams',
        'Created innovative solution combining creativity with technical excellence',
        'Collaborated with cross-functional team of designers and developers',
        'Received feedback from industry professionals and potential investors',
        'Project showcased technical and creative problem-solving skills'
      ]
    },
    {
      id: 5,
      title: 'HackWithInfy',
      description: 'Infosys Global Hackathon',
      year: 2025,
      month: 'January',
      type: 'hackathon' as const,
      position: 'Qualifier',
      details: [
        'Successfully qualified for Infosys global hackathon competition',
        'Competed among thousands of participants from universities worldwide',
        'Developed enterprise-grade solution addressing real business challenges',
        'Gained exposure to industry-standard development practices and tools',
        'Opportunity to interact with Infosys engineers and technical leaders'
      ]
    },
    {
      id: 6,
      title: 'Adobe Hackathon',
      description: 'Design & Development Challenge',
      year: 2025,
      month: 'February',
      type: 'hackathon' as const,
      position: 'Participant',
      details: [
        'Participated in Adobe-sponsored design and development hackathon',
        'Focused on creating innovative user experiences using Adobe technologies',
        'Worked with Adobe Creative Suite and development frameworks',
        'Gained insights into design thinking and user-centered development',
        'Networked with Adobe engineers and design professionals'
      ]
    }
  ].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year
    const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  })

  const getAchievementIcon = (type: Achievement['type']) => {
    switch (type) {
      case 'hackathon':
        return <Zap className="w-4 h-4" />
      case 'competition':
        return <Target className="w-4 h-4" />
      case 'ranking':
        return <Crown className="w-4 h-4" />
      case 'certification':
        return <Medal className="w-4 h-4" />
      default:
        return <Award className="w-4 h-4" />
    }
  }

  const getAchievementColor = (type: Achievement['type']) => {
    switch (type) {
      case 'hackathon':
        return {
          border: 'border-purple-500/30 hover:border-purple-500/50',
          bg: 'bg-purple-500/10',
          text: 'text-purple-400',
          glow: 'hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
        }
      case 'competition':
        return {
          border: 'border-emerald-500/30 hover:border-emerald-500/50',
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-400',
          glow: 'hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
        }
      case 'ranking':
        return {
          border: 'border-yellow-500/30 hover:border-yellow-500/50',
          bg: 'bg-yellow-500/10',
          text: 'text-yellow-400',
          glow: 'hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]'
        }
      case 'certification':
        return {
          border: 'border-blue-500/30 hover:border-blue-500/50',
          bg: 'bg-blue-500/10',
          text: 'text-blue-400',
          glow: 'hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
        }
      default:
        return {
          border: 'border-gray-500/30 hover:border-gray-500/50',
          bg: 'bg-gray-500/10',
          text: 'text-gray-400',
          glow: 'hover:shadow-[0_0_15px_rgba(107,114,128,0.3)]'
        }
    }
  }

  if (loading) {
    return (
      <section id="achievements" className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex justify-center items-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="achievements" className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center text-red-400">
          {error}
        </div>
      </section>
    )
  }

  return (
    <section id="achievements" className="py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-gray-400">
              <Trophy className="w-6 h-6" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Progress</h2>
          </div>
          <div className="w-16 h-1 bg-white mt-4"></div>
          <p className="text-gray-400 mt-4 text-center max-w-2xl">
            A journey of continuous learning, competitive programming, and innovative development
          </p>
        </motion.div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* GitHub Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <Github className="w-6 h-6 text-white" />
              <h3 className="text-2xl font-semibold">GitHub Stats</h3>
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                View Profile
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-2 text-sm text-gray-400">Stars</div>
                <p className="text-2xl font-bold text-center">{stats.github.stars}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-2 text-sm text-gray-400">Repos</div>
                <p className="text-2xl font-bold text-center">{stats.github.publicRepos}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-2 text-sm text-gray-400">Contributions</div>
                <p className="text-2xl font-bold text-center">{stats.github.contributions}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-2 text-sm text-gray-400">Top %</div>
                <p className="text-2xl font-bold text-center">
                  {Number.isFinite(stats.github.topPercentage)
                    ? stats.github.topPercentage.toFixed(1)
                    : "0.0"}%
                </p>
              </div>
            </div>
          </motion.div>

          {/* LeetCode Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 text-white" />
              <h3 className="text-2xl font-semibold">LeetCode Stats</h3>
              <a
                href={`https://leetcode.com/${leetcodeUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Code className="h-4 w-4" />
                View Profile
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-2 text-sm text-gray-400">Total Solved</div>
                <p className="text-2xl font-bold text-center">{stats.leetcode.totalSolved}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-2 text-sm text-gray-400">Ranking</div>
                <p className="text-2xl font-bold text-center"># {stats.leetcode.ranking.toLocaleString()}</p>
              </div>
              
              <div className="col-span-2 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="text-center flex-1">
                    <div className="text-sm text-green-400 font-medium">Easy</div>
                    <div className="text-xl font-bold">{stats.leetcode.easySolved}</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-sm text-orange-400 font-medium">Medium</div>
                    <div className="text-xl font-bold">{stats.leetcode.mediumSolved}</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-sm text-red-400 font-medium">Hard</div>
                    <div className="text-xl font-bold">{stats.leetcode.hardSolved}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievement Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full"
        >
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <span className="text-gray-400">
                <Trophy className="w-6 h-6" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Achievements</h2>
            </div>
            <div className="w-16 h-1 bg-white mx-auto"></div>
          </div>

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

            
            {/* Timeline entries */}
            {achievements.map((achievement, index) => {
              const colors = getAchievementColor(achievement.type)
              return (
                                 <motion.div
                   key={achievement.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: index * 0.2 }}
                   className={`relative mb-8 flex items-center w-full ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
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
                        className={`w-4 h-4 rounded-full ${colors.bg} backdrop-blur-sm transition-all duration-300 flex items-center justify-center border-2 ${colors.border} ${
                          hoveredIndex === index ? `scale-150 ${colors.glow}` : ""
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')}`} />
                      </motion.div>

                      {/* Date tooltip */}
                      <motion.div
                        className="absolute whitespace-nowrap text-xs font-medium bg-black/70 backdrop-blur-sm px-2 py-1 rounded-sm border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={hoveredIndex === index ? { opacity: 1, y: 24 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                      >
                        {achievement.month} {achievement.year}
                      </motion.div>
                    </motion.div>
                  </div>

                                     {/* Content box */}
                   <motion.div
                     className={`w-full md:w-[calc(50%-4rem)] bg-black/40 backdrop-blur-sm border ${colors.border} ${colors.glow} rounded-lg p-3 md:p-4 transition-all relative ${
                       index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                     }`}
                     whileHover={{ scale: 1.03 }}
                     animate={
                       hoveredIndex === index
                         ? {
                             y: -5,
                           }
                         : {}
                     }
                   >
                    {/* Animated connector line to timeline */}
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

                                         {/* Achievement content */}
                    <div className="flex items-start">
                        <div className="flex-1">
                         <div className="flex items-center justify-between mb-1">
                           <h3 className="text-base md:text-lg font-bold">{achievement.title}</h3>
                           <span className={`text-xs uppercase tracking-wider font-medium ${colors.text}`}>
                             {achievement.type}
                           </span>
                         </div>
                         {achievement.description && (
                           <p className="text-gray-300 text-xs md:text-sm mb-1">{achievement.description}</p>
                         )}
                         <div className="flex flex-wrap gap-1 text-xs">
                           {achievement.position && (
                             <span className="bg-white/10 px-1.5 py-0.5 rounded text-xs">
                               {achievement.position}
                             </span>
                           )}
                           {achievement.participants && (
                             <span className="bg-white/10 px-1.5 py-0.5 rounded text-xs">
                               {achievement.participants}
                             </span>
                           )}
                         </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}

                       </div>
         </motion.div>
      </motion.div>
    </section>
  )
} 