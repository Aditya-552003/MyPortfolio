export interface GitHubProfile {
  readonly login: string;
  readonly name: string | null;
  readonly avatarUrl: string;
  readonly htmlUrl: string;
  readonly publicRepos: number;
  readonly followers: number;
  readonly following: number;
}

export interface GitHubRepo {
  readonly name: string;
  readonly htmlUrl: string;
  readonly description: string | null;
  readonly stars: number;
  readonly language: string | null;
}

export interface GitHubStatsData {
  readonly profile: GitHubProfile;
  readonly topRepos: readonly GitHubRepo[];
  readonly topLanguages: readonly string[];
}

interface RawGitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface RawGitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

const GITHUB_API = "https://api.github.com";
// Revalidate hourly — GitHub stats don't need to be request-fresh, and this keeps us well
// clear of the unauthenticated API's rate limit.
const REVALIDATE_SECONDS = 3600;

function topLanguagesFrom(repos: readonly RawGitHubRepo[]): string[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([language]) => language);
}

/** Fetches live public GitHub stats. Returns `null` on any failure so callers can render a fallback. */
export async function fetchGitHubStats(username: string): Promise<GitHubStatsData | null> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${username}`, {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: "application/vnd.github+json" },
      }),
      fetch(`${GITHUB_API}/users/${username}/repos?per_page=100&type=owner`, {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: "application/vnd.github+json" },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as RawGitHubUser;
    const repos = (await reposRes.json()) as RawGitHubRepo[];
    const ownRepos = repos.filter((repo) => !repo.fork);

    const topRepos: GitHubRepo[] = [...ownRepos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4)
      .map((repo) => ({
        name: repo.name,
        htmlUrl: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count,
        language: repo.language,
      }));

    return {
      profile: {
        login: user.login,
        name: user.name,
        avatarUrl: user.avatar_url,
        htmlUrl: user.html_url,
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
      },
      topRepos,
      topLanguages: topLanguagesFrom(ownRepos),
    };
  } catch {
    return null;
  }
}
