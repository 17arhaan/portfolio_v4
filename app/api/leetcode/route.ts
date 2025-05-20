import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query userProfile($username: String!) {
            matchedUser(username: $username) {
              profile {
                ranking
                reputation
                starRating
              }
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
                totalSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
            }
          }
        `,
        variables: {
          username,
        },
      }),
    })

    const data = await response.json()
    const user = data.data.matchedUser

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const stats = {
      easy: { solved: 0, total: 0 },
      medium: { solved: 0, total: 0 },
      hard: { solved: 0, total: 0 },
    }

    // Process submission stats
    user.submitStats.acSubmissionNum.forEach((stat: any) => {
      if (stat.difficulty === 'Easy') {
        stats.easy.solved = stat.count
      } else if (stat.difficulty === 'Medium') {
        stats.medium.solved = stat.count
      } else if (stat.difficulty === 'Hard') {
        stats.hard.solved = stat.count
      }
    })

    user.submitStats.totalSubmissionNum.forEach((stat: any) => {
      if (stat.difficulty === 'Easy') {
        stats.easy.total = stat.count
      } else if (stat.difficulty === 'Medium') {
        stats.medium.total = stat.count
      } else if (stat.difficulty === 'Hard') {
        stats.hard.total = stat.count
      }
    })

    const totalSolved = stats.easy.solved + stats.medium.solved + stats.hard.solved
    const totalSubmissions = stats.easy.total + stats.medium.total + stats.hard.total

    return NextResponse.json({
      totalSolved,
      easySolved: stats.easy.solved,
      mediumSolved: stats.medium.solved,
      hardSolved: stats.hard.solved,
      ranking: user.profile.ranking,
      acceptanceRate: totalSubmissions > 0 ? (totalSolved / totalSubmissions) * 100 : 0,
      submissionStats: {
        totalSubmissions,
        acSubmissions: totalSolved,
      },
    })
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error)
    return NextResponse.json({ error: 'Failed to fetch LeetCode stats' }, { status: 500 })
  }
} 