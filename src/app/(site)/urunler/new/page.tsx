import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Yeni Ürün",
  description: "Yeni ürün eklemek için lütfen yetkili bir yönetici hesabıyla giriş yapın.",
};
export default function NewProductPage() {
  return (
    <main>
      <PageHero
        title="Yeni Ürün"
        description="Yeni ürün eklemek için lütfen yetkili bir yönetici hesabıyla giriş yapın."
      />
      <section className="py-16">
        <div className="container-custom rounded-3xl bg-white p-10 shadow-sm">
          <p className="text-gray-600">Bu sayfa henüz geliştirme aşamasındadır.</p>
        </div>
      </section>
    </main>
  );
}
