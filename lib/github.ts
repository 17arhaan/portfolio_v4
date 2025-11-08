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
    const response = await fetch(`/api/github?username=${encodeURIComponent(username)}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      if (errorData.error === 'GitHub token not configured') {
        console.error('🔧 GitHub API Setup Required:')
        console.error('1. Create a GitHub Personal Access Token at: https://github.com/settings/tokens')
        console.error('2. Add it to your .env.local file as: GITHUB_TOKEN=your_token_here')
        console.error('3. Restart your development server')
        throw new Error('GitHub token not configured - check console for setup instructions')
      }
      throw new Error(`Failed to fetch GitHub stats: ${response.status}`)
    }

    const data = await response.json()
    console.log('GitHub stats response:', data)
    return data as GitHubStats
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