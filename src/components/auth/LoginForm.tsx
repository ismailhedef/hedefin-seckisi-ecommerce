"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("E-posta veya şifre hatalı.");
      return;
    }

    window.location.href = "/";
  }

  return (
    <form action={handleSubmit} className="mt-6 space-y-4">
      <input
        name="email"
        type="email"
        placeholder="E-posta"
        className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
      />
      <input
        name="password"
        type="password"
        placeholder="Şifre"
        className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50"
      >
        {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
    </form>
  );
}