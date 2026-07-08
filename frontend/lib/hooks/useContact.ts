"use client";

import { useMutation } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";

import { apiPost } from "@/lib/api";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  /** Honeypot field — must stay empty; a non-empty value marks the submission as spam. */
  honeypot?: string;
}

export interface ContactResponse {
  success: boolean;
}

/** Submits the contact form to the FastAPI backend's `/api/contact` endpoint. */
export function useContact(): UseMutationResult<ContactResponse, Error, ContactPayload> {
  return useMutation({
    mutationFn: (payload: ContactPayload) =>
      apiPost<ContactResponse, ContactPayload>("/api/contact", payload),
  });
}
