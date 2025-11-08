export const revalidate = 0
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN,
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    console.error('Username is required')
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  if (!process.env.GITHUB_TOKEN && !process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    console.error('GitHub token not found in environment variables')
    console.error('Please set GITHUB_TOKEN in your .env.local file')
    console.error('Visit https://github.com/settings/tokens to create a token')
    return NextResponse.json({ 
      error: 'GitHub token not configured',
      message: 'Please set GITHUB_TOKEN in your .env.local file',
      instructions: 'Visit https://github.com/settings/tokens to create a token'
    }, { status: 500 })
  }

  try {
    console.log('Fetching GitHub stats for:', username)
    
    // Get user data
    const { data: userData } = await octokit.users.getByUsername({ username })
    console.log('User data:', userData)

    // Get user's repositories
    const { data: repos } = await octokit.repos.listForUser({
      username,
      per_page: 100,
      sort: 'updated',
    })
    console.log('Repos data:', repos)

    // Calculate total stars and forks
    const stars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
    const forks = repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0)

    // Get contribution data using GraphQL
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({
        query: `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                totalCommitContributions
                totalPullRequestContributions
                totalIssueContributions
              }
            }
          }
        `,
        variables: {
          username,
        },
      }),
    })

    const { data: contributionData } = await response.json()
    const contributions = contributionData?.user?.contributionsCollection
      ? contributionData.user.contributionsCollection.totalCommitContributions +
        contributionData.user.contributionsCollection.totalPullRequestContributions +
        contributionData.user.contributionsCollection.totalIssueContributions
      : 0

    // Calculate top percentage based on multiple factors
    const totalUsers = 100000000 // Total GitHub users (approximate)
    
    // Calculate a more comprehensive score
    const score = (
      (userData.followers * 2) + // Followers are weighted heavily
      (userData.public_repos * 5) + // Each repo contributes significantly
      (stars * 3) + // Stars show project quality
      (forks * 2) + // Forks show project adoption
      (contributions * 0.5) // Contributions show activity
    )

    // Calculate percentile using a logarithmic scale
    const percentile = Math.log10(score + 1) / Math.log10(totalUsers)
    const topPercentage = Math.max(0.1, Math.min(99.9, (1 - percentile) * 100))

    console.log('Calculated stats:', { 
      stars, 
      forks, 
      contributions, 
      topPercentage,
      score,
      percentile
    })

    const jsonResponse = NextResponse.json({
      stars,
      forks,
      contributions,
      topPercentage,
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
    })

    jsonResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    jsonResponse.headers.set('Pragma', 'no-cache')
    jsonResponse.headers.set('Expires', '0')

    return jsonResponse
  } catch (error) {
    console.error('Error in GitHub API route:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    const errorResponse = NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 500 })
    errorResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    errorResponse.headers.set('Pragma', 'no-cache')
    errorResponse.headers.set('Expires', '0')
    return errorResponse
  }
} 