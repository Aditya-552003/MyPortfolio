const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });

function formatYearMonth(value: string): string {
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return value;
  return MONTH_FORMATTER.format(new Date(year, month - 1));
}

/** Formats a `YYYY-MM` start/end pair as e.g. "May 2025 – Aug 2025" or "Sep 2024 – Present". */
export function formatDateRange(startDate: string, endDate: string | null): string {
  const start = formatYearMonth(startDate);
  const end = endDate ? formatYearMonth(endDate) : "Present";
  return `${start} – ${end}`;
}
