interface GitHubRepo {
  name: string;
  updated_at: string;
  pushed_at: string;
  html_url: string;
}

interface GitHubCommit {
  commit: {
    committer: {
      date: string;
    };
  };
}

export async function getRepoLastUpdate(owner: string, repo: string): Promise<string> {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    };

    // Add GitHub token if available (for higher rate limits)
    if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
    });

    if (!response.ok) {
      if (response.status === 403) {
        const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
        const rateLimitReset = response.headers.get('X-RateLimit-Reset');
        
        if (rateLimitRemaining === '0') {
          const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000) : null;
          console.warn(`GitHub API rate limit exceeded. Resets at: ${resetTime?.toLocaleTimeString()}`);
          return 'Rate limited';
        }
      }
      
      if (response.status === 404) {
        console.warn(`Repository not found: ${owner}/${repo}`);
        return 'Not found';
      }
      
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repo_data: GitHubRepo = await response.json();
    
    // Get the most recent of updated_at or pushed_at
    const updatedDate = new Date(repo_data.updated_at);
    const pushedDate = new Date(repo_data.pushed_at);
    const lastUpdate = pushedDate > updatedDate ? pushedDate : updatedDate;
    
    return formatRelativeTime(lastUpdate);
  } catch (error) {
    console.error(`Error fetching repo ${owner}/${repo}:`, error);
    return 'Unknown';
  }
}

export async function getRepoLastCommit(owner: string, repo: string): Promise<string> {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    };

    // Add GitHub token if available (for higher rate limits)
    if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
      headers,
    });

    if (!response.ok) {
      if (response.status === 403) {
        const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
        const rateLimitReset = response.headers.get('X-RateLimit-Reset');
        
        if (rateLimitRemaining === '0') {
          const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000) : null;
          console.warn(`GitHub API rate limit exceeded. Resets at: ${resetTime?.toLocaleTimeString()}`);
          return 'Rate limited';
        }
      }
      
      if (response.status === 404) {
        console.warn(`Repository not found: ${owner}/${repo}`);
        return 'Not found';
      }
      
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const commits: GitHubCommit[] = await response.json();
    
    if (commits.length === 0) {
      return 'No commits';
    }

    const lastCommitDate = new Date(commits[0].commit.committer.date);
    return formatRelativeTime(lastCommitDate);
  } catch (error) {
    console.error(`Error fetching commits for ${owner}/${repo}:`, error);
    return 'Unknown';
  }
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
} 