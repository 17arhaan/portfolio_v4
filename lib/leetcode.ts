interface LeetCodeStats {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking: number
  acceptanceRate: number
  submissionStats: {
    totalSubmissions: number
    acSubmissions: number
  }
}

export async function getLeetCodeStats(username: string): Promise<LeetCodeStats> {
  try {
    const response = await fetch(`/api/leetcode?username=${encodeURIComponent(username)}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode stats')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error)
    return {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      ranking: 0,
      acceptanceRate: 0,
      submissionStats: {
        totalSubmissions: 0,
        acSubmissions: 0,
      },
    }
  }
} 