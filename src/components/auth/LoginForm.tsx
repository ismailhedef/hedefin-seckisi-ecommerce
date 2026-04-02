"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Lütfen tüm alanları doldurun.");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      toast.error("E-posta veya şifre hatalı.");
      return;
    }

    toast.success("Giriş başarılı.");
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