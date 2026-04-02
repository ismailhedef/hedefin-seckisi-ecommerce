import PageHero from "@/components/ui/PageHero";

export default function NewCategoryPage() {
  return (
    <main>
      <PageHero
        title="Yeni Kategori"
        description="Yeni kategori eklemek için lütfen yetkili bir yönetici hesabıyla giriş yapın."
      />
      <section className="py-16">
        <div className="container-custom rounded-3xl bg-white p-10 shadow-sm">
          <p className="text-gray-600">
            Bu sayfa henüz geliştirme aşamasındadır.
          </p>
        </div>
      </section>
    </main>
  );
}
