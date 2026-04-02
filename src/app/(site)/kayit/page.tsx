import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kayıt Ol",
  description: "Yeni hesap oluşturun.",
};
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main>
      <PageHero
        title="Kayıt Ol"
        description="Yeni hesap oluşturun, siparişlerinizi takip edin ve yorum yapın."
      />

      <section className="py-16">
        <div className="container-custom max-w-md">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-[#1f4d2b]">Kayıt Ol</h1>
            <p className="mt-2 text-gray-600">Yeni hesap oluşturun.</p>

            <RegisterForm />

            <p className="mt-6 text-sm text-gray-600">
              Zaten hesabınız var mı?{" "}
              <Link href="/giris" className="font-semibold text-[#2f6b3b]">
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}