import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { createProduct } from "@/app/actions/productActions";
import { prisma } from "@/lib/prisma";
import ImageUpload from "@/components/ui/ImageUpload";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <section>
      <AdminPageHeader
        title="Yeni Ürün"
        description="Yeni ürün ekleyin."
      />
      <ProductForm action={createProduct} categories={categories} />

      <form action={createProduct} className="rounded-3xl bg-white p-8 shadow-sm max-w-4xl">
        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">Ürün Adı</label>
            <input
              name="title"
              type="text"
              required
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              placeholder="Ürün adı"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">Slug</label>
            <input
              name="slug"
              type="text"
              required
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              placeholder="urun-slug"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">Açıklama</label>
            <textarea
              name="description"
              rows={5}
              required
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              placeholder="Ürün açıklaması"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">Fiyat</label>
              <input
                name="price"
                type="number"
                step="0.01"
                required
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
                placeholder="189"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">Eski Fiyat</label>
              <input
                name="oldPrice"
                type="number"
                step="0.01"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
                placeholder="229"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">Stok</label>
              <input
                name="stock"
                type="number"
                required
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
                placeholder="50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">Kategori</label>
              <select
                name="categoryId"
                required
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              >
                <option value="">Kategori seçin</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ImageUpload
            name="image"
            label="Kapak Görseli"
            required
          />

          <button type="submit" className="btn-primary w-fit">
            Ürünü Kaydet
          </button>
        </div>
      </form>
    </section>
  );
}