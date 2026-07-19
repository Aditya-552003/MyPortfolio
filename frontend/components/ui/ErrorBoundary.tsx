"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { captureClientError } from "@/lib/monitoring";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/** Catches render errors in AI-dependent trees so the rest of the page stays usable. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    captureClientError(error, { componentStack: info.componentStack ?? "" });
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="border-border bg-surface flex flex-col items-start gap-3 rounded-[var(--radius-lg)] border p-6"
        >
          <h2 className="text-foreground text-lg font-semibold">
            {this.props.fallbackTitle ?? "This section hit an unexpected error"}
          </h2>
          <p className="text-muted text-sm">
            {this.props.fallbackMessage ??
              "The rest of the site still works. Try again, or continue exploring other pages."}
          </p>
          <Button type="button" variant="secondary" size="sm" onClick={this.handleRetry}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
