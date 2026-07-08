import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

import { IconList } from "./IconList";

export interface ChallengesListProps {
  challenges: readonly string[];
}

export function ChallengesList({ challenges }: ChallengesListProps): ReactNode {
  return <IconList items={challenges} icon={AlertTriangle} iconClassName="text-warning" />;
}
