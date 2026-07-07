import { forwardRef } from "react";
import type { InputHTMLAttributes, Ref, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

type SharedProps = {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
};

type InputFieldProps = SharedProps &
  InputHTMLAttributes<HTMLInputElement> & {
    multiline?: false;
  };

type TextareaFieldProps = SharedProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
  };

export type FormFieldProps = InputFieldProps | TextareaFieldProps;

const FIELD_CLASSES =
  "w-full rounded-[var(--radius-md)] border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors duration-[var(--duration-fast)] placeholder:text-muted";

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  function FormField(props, ref) {
    const { label, id, error, required, className, multiline, ...rest } = props;
    const errorId = `${id}-error`;
    const borderClass = error ? "border-error" : "border-border focus:border-primary";

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-foreground text-sm font-medium">
          {label}
          {required ? (
            <span className="text-error" aria-hidden>
              {" "}
              *
            </span>
          ) : null}
        </label>
        {multiline ? (
          <textarea
            ref={ref as Ref<HTMLTextAreaElement>}
            id={id}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={cn(FIELD_CLASSES, borderClass, "min-h-32 resize-y", className)}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as Ref<HTMLInputElement>}
            id={id}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={cn(FIELD_CLASSES, borderClass, className)}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error ? (
          <p id={errorId} role="alert" className="text-error text-xs">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
