import fs from "fs/promises";
import path from "path";

// On Vercel the app directory is read-only; /tmp is writable per-invocation.
// Locally we write next to the source so it gets committed and seeded on deploy.
const CACHE_PATH = process.env.VERCEL
  ? "/tmp/github-cache.json"
  : path.join(process.cwd(), "data", "github-cache.json");

// Build-time seed (committed to git, always readable)
const SEED_PATH = path.join(process.cwd(), "data", "github-cache.json");
const GITHUB_HEADERS = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "fiqlab-portfolio",
} as const;

interface GitHubUserResponse {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubRepoResponse {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  fork: boolean;
  archived: boolean;
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  htmlUrl: string;
}

export interface GitHubCache {
  lastUpdated: string;
  profile: GitHubProfile;
  repos: GitHubRepo[];
}

export async function fetchGitHubData(username: string): Promise<GitHubCache> {
  const profileRes = await fetch(`https://api.github.com/users/${username}`, {
    headers: GITHUB_HEADERS,
  });

  if (!profileRes.ok) {
    throw new Error(`GitHub API error: ${profileRes.status}`);
  }

  const profileData = (await profileRes.json()) as GitHubUserResponse;

  const profile: GitHubProfile = {
    login: profileData.login,
    name: profileData.name,
    avatarUrl: profileData.avatar_url,
    bio: profileData.bio,
    publicRepos: profileData.public_repos,
    followers: profileData.followers,
    following: profileData.following,
    htmlUrl: profileData.html_url,
  };

  const allRepos: GitHubRepo[] = [];
  let page = 1;

  while (true) {
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}&sort=updated&type=owner`,
      { headers: GITHUB_HEADERS },
    );

    if (!reposRes.ok) {
      throw new Error(`GitHub API error: ${reposRes.status}`);
    }

    const reposData = (await reposRes.json()) as GitHubRepoResponse[];

    if (reposData.length === 0) {
      break;
    }

    const repos = reposData
      .filter((repo) => !repo.fork && !repo.archived)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics ?? [],
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        fork: repo.fork,
        archived: repo.archived,
      }));

    allRepos.push(...repos);

    if (reposData.length < 100) {
      break;
    }

    page += 1;
  }

  allRepos.sort(
    (a, b) =>
      b.stars - a.stars ||
      new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime(),
  );

  return {
    lastUpdated: new Date().toISOString(),
    profile,
    repos: allRepos,
  };
}

export async function saveGitHubCache(data: GitHubCache): Promise<void> {
  await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
  await fs.writeFile(CACHE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function readGitHubCache(): Promise<GitHubCache | null> {
  // On Vercel: try /tmp first (written by a refresh call this invocation),
  // then fall back to the build-time seed committed in data/.
  const paths = process.env.VERCEL ? [CACHE_PATH, SEED_PATH] : [CACHE_PATH];
  for (const p of paths) {
    try {
      const raw = await fs.readFile(p, "utf-8");
      return JSON.parse(raw) as GitHubCache;
    } catch {
      // try next
    }
  }
  return null;
}
