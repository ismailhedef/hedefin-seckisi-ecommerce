import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { createCategory } from "@/app/actions/categoryActions";
import ImageUpload from "@/components/ui/ImageUpload";

export default function NewCategoryPage() {
  return (
    <section>
      <AdminPageHeader
        title="Yeni Kategori"
        description="Yeni ürün kategorisi ekleyin."
      />

      <form action={createCategory} className="rounded-3xl bg-white p-8 shadow-sm max-w-3xl">
        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              Kategori Adı
            </label>
            <input
              name="name"
              type="text"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              placeholder="Örn: Doğal Sabunlar"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              Slug
            </label>
            <input
              name="slug"
              type="text"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              placeholder="orn: dogal-sabunlar"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              Açıklama
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              placeholder="Kategori açıklaması"
            />
          </div>

          <ImageUpload
            name="image"
            label="Görsel URL"
          />

          <button type="submit" className="btn-primary w-fit">
            Kategoriyi Kaydet
          </button>
        </div>
      </form>
    </section>
  );
}