import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/config/site";

import { ContributionGraph } from "./ContributionGraph";
import { PinnedRepoCard } from "./PinnedRepoCard";
import { StatBadge } from "./StatBadge";
import { fetchGitHubStats } from "./githubApi";

export async function GitHubStats(): Promise<ReactNode> {
  const username = siteConfig.githubUsername;
  const stats = await fetchGitHubStats(username);
  const profileUrl = `https://github.com/${username}`;

  if (!stats) {
    return (
      <Card variant="standard" className="p-6">
        <p className="text-muted text-sm">
          GitHub stats are temporarily unavailable —{" "}
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            view the profile directly on GitHub
          </a>
          .
        </p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {username === "octocat" ? (
        <Badge variant="warning" className="w-fit">
          Sample data (octocat) — set a real GitHub username in config/site.ts
        </Badge>
      ) : null}

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <StatBadge label="Public repos" value={stats.profile.publicRepos} />
        <StatBadge label="Followers" value={stats.profile.followers} />
        <StatBadge label="Following" value={stats.profile.following} />
      </div>

      <Card variant="standard" className="overflow-x-auto p-4">
        <ContributionGraph username={username} profileUrl={profileUrl} />
      </Card>

      {stats.topLanguages.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {stats.topLanguages.map((language) => (
            <Badge key={language} variant="neutral">
              {language}
            </Badge>
          ))}
        </div>
      ) : null}

      {stats.topRepos.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.topRepos.map((repo) => (
            <PinnedRepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
