import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";
import type { ConfusionMatrixData, ProjectMetric } from "@/content/types";

export interface MetricsPanelProps {
  metrics?: readonly ProjectMetric[];
  confusionMatrix?: ConfusionMatrixData;
}

export function MetricsPanel({ metrics, confusionMatrix }: MetricsPanelProps): ReactNode {
  if (!metrics && !confusionMatrix) return null;

  return (
    <div className="flex flex-col gap-6">
      {metrics ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {metrics.map((metric) => (
            <Card
              key={metric.label}
              variant="standard"
              className="flex flex-col gap-1 p-4 text-center"
            >
              <span className="text-foreground text-xl font-bold">{metric.value}</span>
              <span className="text-muted text-xs">{metric.label}</span>
            </Card>
          ))}
        </div>
      ) : null}

      {confusionMatrix ? (
        <Card variant="standard" className="overflow-x-auto p-4">
          <p className="text-foreground mb-3 text-sm font-semibold">
            Confusion matrix{" "}
            <span className="text-muted font-normal">(% of actual class, ensemble)</span>
          </p>
          <table className="min-w-full border-collapse text-center text-xs">
            <thead>
              <tr>
                <th className="text-muted p-1.5 text-left">Actual \ Predicted</th>
                {confusionMatrix.labels.map((label) => (
                  <th key={label} className="text-muted p-1.5 font-medium capitalize">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {confusionMatrix.matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <th className="text-muted p-1.5 text-left font-medium capitalize">
                    {confusionMatrix.labels[rowIndex]}
                  </th>
                  {row.map((value, colIndex) => {
                    // Cap the tint well below 100% — at full primary-color intensity, neither
                    // light nor dark foreground text keeps WCAG AA contrast (verified with axe).
                    const tint = Math.min(Math.max(value, 0), 100) * 0.65;
                    return (
                      <td
                        key={colIndex}
                        className="text-foreground rounded-[var(--radius-sm)] p-1.5 font-medium"
                        style={{
                          backgroundColor: `color-mix(in srgb, var(--primary) ${tint}%, transparent)`,
                        }}
                      >
                        {value.toFixed(1)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : null}
    </div>
  );
}
