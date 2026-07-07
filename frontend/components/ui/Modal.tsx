"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;
export const ModalClose = DialogPrimitive.Close;

export interface ModalContentProps extends DialogPrimitive.DialogContentProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ModalContent({
  title,
  description,
  children,
  className,
  ...rest
}: ModalContentProps): ReactNode {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="bg-background/70 fixed inset-0 z-50 backdrop-blur-sm" />
      <DialogPrimitive.Content
        aria-describedby={description ? undefined : ""}
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2",
          "border-border bg-surface rounded-[var(--radius-lg)] border p-6 shadow-[var(--shadow-lg)] backdrop-blur-[var(--glass-blur)]",
          className,
        )}
        {...rest}
      >
        <DialogPrimitive.Title className="text-foreground text-lg font-semibold">
          {title}
        </DialogPrimitive.Title>
        {description ? (
          <DialogPrimitive.Description className="text-muted mt-1 text-sm">
            {description}
          </DialogPrimitive.Description>
        ) : null}
        <div className="mt-4">{children}</div>
        <DialogPrimitive.Close
          className="text-muted hover:bg-border/60 hover:text-foreground absolute top-4 right-4 rounded-full p-1 transition-colors"
          aria-label="Close dialog"
        >
          <X className="size-4" aria-hidden />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
