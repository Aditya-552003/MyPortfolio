"use client";

import { useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";
import { ApiError } from "@/lib/api";
import { useContact } from "@/lib/hooks/useContact";

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
  const contact = useContact();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [honeypot, setHoneypot] = useState("");

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

    try {
      await contact.mutateAsync({ ...values, honeypot });
      showToast("success", "Message sent — I'll get back to you soon.");
      setValues(INITIAL_VALUES);
      setErrors({});
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Network error — please check your connection and try again.";
      showToast("error", message);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot: real users never see or fill this in; bots that auto-fill every field do. */}
      <input
        type="text"
        name="company"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
      />
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
      <Button type="submit" variant="primary" loading={contact.isPending} className="self-start">
        Send message
      </Button>
    </form>
  );
}
