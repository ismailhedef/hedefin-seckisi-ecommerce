import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { updateProduct } from "@/app/actions/adminUpdateActions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  if (!product) {
    notFound();
  }

  return (
    <section>
      <AdminPageHeader
        title="Ürün Düzenle"
        description="Mevcut ürün bilgilerini güncelleyin."
      />
       <ProductForm
        action={updateProduct}
        categories={categories}
        initialData={{
          id: product.id,
          title: product.title,
          slug: product.slug,
          description: product.description,
          price: product.price,
          oldPrice: product.oldPrice,
          stock: product.stock,
          image: product.image,
          categoryId: product.categoryId,
        }}
      />

      <form
        action={updateProduct}
        className="max-w-4xl rounded-3xl bg-white p-8 shadow-sm"
      >
        <input type="hidden" name="id" value={product.id} />

        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              Ürün Adı
            </label>
            <input
              name="title"
              type="text"
              defaultValue={product.title}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              Slug
            </label>
            <input
              name="slug"
              type="text"
              defaultValue={product.slug}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              Açıklama
            </label>
            <textarea
              name="description"
              rows={5}
              defaultValue={product.description}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
                Fiyat
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                defaultValue={product.price}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
                Eski Fiyat
              </label>
              <input
                name="oldPrice"
                type="number"
                step="0.01"
                defaultValue={product.oldPrice ?? ""}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
                Stok
              </label>
              <input
                name="stock"
                type="number"
                defaultValue={product.stock}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
                Kategori
              </label>
              <select
                name="categoryId"
                defaultValue={product.categoryId}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              Görsel URL
            </label>
            <input
              name="image"
              type="text"
              defaultValue={product.image}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            />
          </div>

          <button type="submit" className="btn-primary w-fit">
            Güncelle
          </button>
        </div>
      </form>
    </section>
  );
}