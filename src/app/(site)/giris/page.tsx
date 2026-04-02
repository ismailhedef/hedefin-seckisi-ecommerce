import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description: "Hesabınıza giriş yapın.",
};
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main>
      <PageHero
        title="Giriş Yap"
        description="Hesabınıza giriş yaparak siparişlerinizi ve favorilerinizi yönetin."
      />

      <section className="py-16">
        <div className="container-custom max-w-md">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-[#1f4d2b]">Giriş Yap</h1>
            <p className="mt-2 text-gray-600">Hesabınıza giriş yapın.</p>

            <LoginForm />

            <p className="mt-6 text-sm text-gray-600">
              Hesabınız yok mu?{" "}
              <Link href="/kayit" className="font-semibold text-[#2f6b3b]">
                Kayıt Ol
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}