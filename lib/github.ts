import { Octokit } from "@octokit/rest"

// Create Octokit instance with auth token
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export interface GitHubStats {
  stars: number
  forks: number
  contributions: number
  topPercentage: number
  publicRepos: number
  followers: number
  following: number
}

export async function getGitHubStats(username: string): Promise<GitHubStats> {
  try {
    console.log('Fetching GitHub stats for:', username)
    const response = await fetch(`/api/github?username=${encodeURIComponent(username)}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub stats')
    }

    const data = await response.json()
    console.log('GitHub stats response:', data)
    return data
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    return {
      stars: 0,
      forks: 0,
      contributions: 0,
      topPercentage: 0,
      publicRepos: 0,
      followers: 0,
      following: 0,
    }
  }
} 