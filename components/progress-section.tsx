"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github, Code, Trophy, Star, GitFork, GitPullRequest, Loader2, Award, BarChart2, TrendingUp } from "lucide-react"
import { getGitHubStats } from "@/lib/github"
import { getLeetCodeStats } from "@/lib/leetcode"

interface ProgressSectionProps {
  githubUsername: string
  leetcodeUsername: string
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
        setError("Failed to fetch stats. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [githubUsername, leetcodeUsername])

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-gray-400">
              <Trophy className="w-6 h-6" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Progress & Achievements</h2>
          </div>
          <div className="w-16 h-1 bg-white mt-4"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* GitHub Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
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
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-400">Stars</span>
                </div>
                <p className="text-2xl font-bold text-center">{stats.github.stars}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <GitFork className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-400">Forks</span>
                </div>
                <p className="text-2xl font-bold text-center">{stats.github.forks}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <GitPullRequest className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-400">Contributions</span>
                </div>
                <p className="text-2xl font-bold text-center">{stats.github.contributions}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
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
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
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
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-400">Total Solved</span>
                </div>
                <p className="text-2xl font-bold text-center">{stats.leetcode.totalSolved}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-gray-400">Ranking</span>
                </div>
                <p className="text-2xl font-bold text-center"># {stats.leetcode.ranking.toLocaleString()}</p>
              </div>
              
              <div className="col-span-2 bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <BarChart2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-400">Problem Distribution</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <p className="text-green-400 font-semibold">{stats.leetcode.easySolved}</p>
                    <p className="text-xs text-gray-400">Easy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-yellow-400 font-semibold">{stats.leetcode.mediumSolved}</p>
                    <p className="text-xs text-gray-400">Medium</p>
                  </div>
                  <div className="text-center">
                    <p className="text-red-400 font-semibold">{stats.leetcode.hardSolved}</p>
                    <p className="text-xs text-gray-400">Hard</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modern Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full mt-20"
        >
          <div className="relative flex flex-col items-center w-full">
            {/* Year labels */}
            <div className="grid w-full grid-cols-5 gap-0 items-end mb-2">
              <span className="text-xs text-gray-300 bg-black/40 px-3 py-1 rounded-full z-10 justify-self-center" style={{ fontWeight: 400 }}>2022</span>
              <span className="col-span-3 text-xs text-gray-300 bg-black/40 px-3 py-1 rounded-full z-10 w-full text-center justify-self-center" style={{ fontWeight: 400 }}>2024</span>
              <span className="text-xs text-gray-300 bg-black/40 px-3 py-1 rounded-full z-10 justify-self-center" style={{ fontWeight: 400 }}>2025</span>
            </div>
            {/* Timeline line and dots */}
            <div className="relative w-full flex items-center" style={{ height: '56px' }}>
              {/* Timeline line with shimmer */}
              <motion.div
                className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-y-1/2 z-0 overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', opacity: 0.7 }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
              {/* Timeline dots */}
              {[
                { title: 'Met Rank - 171', year: 2020, delay: '0s' },
                { title: 'Hacksplostion', description: 'Hackathon', year: 2024, delay: '0.7s' },
                { title: 'Think-a-thon', description: 'Competition', year: 2024, delay: '1.3s' },
                { title: 'Creathon', description: 'Hackathon', year: 2024, delay: '0.4s' },
                { title: 'HackWithInfy', description: 'Hackathon', year: 2025, delay: '1.1s' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col items-center flex-1 z-10"
                >
                  <motion.div
                    className="w-6 h-6 rounded-full border-4 border-white bg-black flex items-center justify-center shadow-lg animate-glow"
                    style={{ animationDelay: item.delay }}
                    whileHover={{ scale: 1.2, boxShadow: '0 0 24px 8px #fff' }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', delay: idx * 0.2 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
            {/* Timeline content */}
            <div className="flex w-full justify-between mt-6 flex-wrap">
              {[
                { title: 'MET Rank - 171', year: 2020 },
                { title: 'Hacksplostion', description: 'Hackathon', year: 2024 },
                { title: 'Think-a-thon', description: 'Competition', year: 2024 },
                { title: 'Creathon', description: 'Hackathon', year: 2024 },
                { title: 'HackWithInfy', description: 'Hackathon', year: 2025 },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.18 + 0.2 }}
                  className="flex flex-col items-center flex-1 min-w-[120px] max-w-[180px] mx-2"
                >
                  <h4 className="text-base font-bold text-center whitespace-nowrap">{item.title}</h4>
                  <p className="text-sm text-gray-300 mt-1 text-center whitespace-nowrap">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
} 