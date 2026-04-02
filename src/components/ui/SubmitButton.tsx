"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  text,
  loadingText = "İşleniyor...",
  className = "",
}: {
  text: string;
  loadingText?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`btn-primary disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {pending ? loadingText : text}
    </button>
  );
}