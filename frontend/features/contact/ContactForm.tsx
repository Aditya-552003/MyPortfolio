"use client";

import { useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormValues {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = { name: "", email: "", message: "" };

export function ContactForm(): ReactNode {
  const { showToast } = useToast();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (!values.name.trim()) nextErrors.name = "Name is required.";
    if (!values.email.trim()) nextErrors.email = "Email is required.";
    else if (!EMAIL_PATTERN.test(values.email)) nextErrors.email = "Enter a valid email address.";
    if (!values.message.trim()) nextErrors.message = "Message is required.";
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (nextErrors.name) {
      nameRef.current?.focus();
      return;
    }
    if (nextErrors.email) {
      emailRef.current?.focus();
      return;
    }
    if (nextErrors.message) {
      messageRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { error?: { message: string } };

      if (!response.ok) {
        showToast("error", data.error?.message ?? "Something went wrong. Please try again.");
        return;
      }

      showToast("success", "Message sent — I'll get back to you soon.");
      setValues(INITIAL_VALUES);
      setErrors({});
    } catch {
      showToast("error", "Network error — please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <FormField
        ref={nameRef}
        id="contact-name"
        label="Name"
        required
        autoComplete="name"
        value={values.name}
        onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
        error={errors.name}
      />
      <FormField
        ref={emailRef}
        id="contact-email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        value={values.email}
        onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
        error={errors.email}
      />
      <FormField
        ref={messageRef}
        id="contact-message"
        label="Message"
        multiline
        required
        value={values.message}
        onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))}
        error={errors.message}
      />
      <Button type="submit" variant="primary" loading={isSubmitting} className="self-start">
        Send message
      </Button>
    </form>
  );
}
