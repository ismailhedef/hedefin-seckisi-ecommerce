import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteProduct } from "@/app/actions/adminActions";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <AdminPageHeader
          title="Ürünler"
          description="Tüm ürünleri buradan görüntüleyin."
        />
        <Link href="/admin/urunler/new" className="btn-primary">
          Yeni Ürün
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#eef5ec]">
            <tr>
              <th className="px-6 py-4">Ürün</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Fiyat</th>
              <th className="px-6 py-4">Stok</th>
              <th className="px-6 py-4">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-[#f1ece3]">
                <td className="px-6 py-4 font-medium text-[#1f4d2b]">
                  {product.title}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {product.category.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {product.price} TL
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {product.stock}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/urunler/${product.id}`}
                      className="rounded-xl border border-[#2f6b3b] px-4 py-2 text-sm text-[#2f6b3b] hover:bg-[#eef5ec]"
                    >
                      Düzenle
                    </Link>

                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={product.id} />
                      <button
                        type="submit"
                        className="rounded-xl border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sil
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}