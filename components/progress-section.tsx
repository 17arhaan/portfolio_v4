"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github, Code, Trophy, Star, GitFork, GitPullRequest, Loader2, Award, BarChart2, TrendingUp, Zap, Target, Crown, Medal } from "lucide-react"
import { getGitHubStats } from "@/lib/github"
import { getLeetCodeStats } from "@/lib/leetcode"

interface ProgressSectionProps {
  githubUsername: string
  leetcodeUsername: string
}

// Achievement type definitions
interface Achievement {
  title: string
  description?: string
  year: number
  type: 'hackathon' | 'competition' | 'ranking' | 'certification'
  position?: string
  participants?: string
  prize?: string
}

export default function ProgressSection({ githubUsername, leetcodeUsername }: ProgressSectionProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    github: {
      stars: 0,
      forks: 0,
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
            forks: githubStats.forks || 0,
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

  // Enhanced achievements data
  const achievements: Achievement[] = [
    {
      title: 'MET Rank - 171',
      year: 2020,
      type: 'ranking',
      position: '171',
      participants: '150,000+'
    },
    {
      title: 'Hacksplostion',
      description: 'Hackathon',
      year: 2024,
      type: 'hackathon',
      position: 'Finalist'
    },
    {
      title: 'Think-a-thon',
      description: 'Competition',
      year: 2024,
      type: 'competition',
      position: 'Winner'
    },
    {
      title: 'Creathon',
      description: 'Hackathon',
      year: 2024,
      type: 'hackathon',
      position: 'Top 10'
    },
    {
      title: 'Adobe Hackathon',
      description: 'Design Challenge',
      year: 2025,
      type: 'hackathon',
      position: 'Participant'
    },
    {
      title: 'HackWithInfy',
      description: 'Hackathon',
      year: 2025,
      type: 'hackathon',
      position: 'Qualifier'
    }
  ]

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
        return 'text-purple-400 bg-purple-400/10 border-purple-400/20'
      case 'competition':
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
      case 'ranking':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'certification':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
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
            <h2 className="text-3xl md:text-4xl font-bold">Progress & Achievements</h2>
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
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-400">Stars</span>
                </div>
                <p className="text-2xl font-bold text-center">{stats.github.stars}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <GitFork className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-400">Forks</span>
                </div>
                <p className="text-2xl font-bold text-center">{stats.github.forks}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <GitPullRequest className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-400">Contributions</span>
                </div>
                <p className="text-2xl font-bold text-center">{stats.github.contributions}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-pink-400" />
                  <span className="text-sm text-gray-400">Top %</span>
                </div>
                <p className="text-2xl font-bold text-center">{Math.ceil(stats.github.topPercentage)}%</p>
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
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-400">Total Solved</span>
                </div>
                <p className="text-2xl font-bold text-center">{stats.leetcode.totalSolved}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-gray-400">Ranking</span>
                </div>
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

        {/* Enhanced Achievement Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full"
        >
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-4">Achievement Timeline</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
          </div>

          {/* Timeline Years */}
          <div className="flex justify-between items-center mb-8 px-4">
            {[2020, 2024, 2025].map((year) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: year * 0.1 }}
                className="text-center"
              >
                <div className="text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-full shadow-lg">
                  {year}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`
                  relative p-6 rounded-xl border backdrop-blur-sm 
                  ${getAchievementColor(achievement.type)}
                  hover:shadow-lg hover:shadow-white/10 transition-all duration-300
                  group cursor-pointer
                `}
              >
                {/* Achievement Type Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-lg ${getAchievementColor(achievement.type).split(' ')[1]}`}>
                    {getAchievementIcon(achievement.type)}
                  </div>
                  <span className="text-xs uppercase tracking-wider font-medium text-gray-400">
                    {achievement.type}
                  </span>
                </div>

                {/* Achievement Content */}
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">
                    {achievement.title}
                  </h4>
                  
                  {achievement.description && (
                    <p className="text-sm text-gray-300">
                      {achievement.description}
                    </p>
                  )}

                  {achievement.position && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">Position:</span>
                      <span className="font-medium text-white">{achievement.position}</span>
                    </div>
                  )}

                  {achievement.participants && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">Among:</span>
                      <span className="font-medium text-white">{achievement.participants}</span>
                    </div>
                  )}
                </div>

                {/* Year Badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-bold px-2 py-1 bg-black/30 rounded-full">
                    {achievement.year}
                  </span>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Achievement Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {achievements.filter(a => a.type === 'hackathon').length}
                </div>
                <div className="text-sm text-gray-400">Hackathons</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400">
                  {achievements.filter(a => a.type === 'competition').length}
                </div>
                <div className="text-sm text-gray-400">Competitions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {achievements.filter(a => a.type === 'ranking').length}
                </div>
                <div className="text-sm text-gray-400">Rankings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {achievements.length}
                </div>
                <div className="text-sm text-gray-400">Total</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
} 