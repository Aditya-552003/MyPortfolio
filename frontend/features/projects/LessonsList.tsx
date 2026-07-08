import { Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

import { IconList } from "./IconList";

export interface LessonsListProps {
  lessons: readonly string[];
}

export function LessonsList({ lessons }: LessonsListProps): ReactNode {
  return <IconList items={lessons} icon={Lightbulb} iconClassName="text-accent" />;
}
