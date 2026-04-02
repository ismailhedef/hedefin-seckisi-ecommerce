
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteCategory } from "@/app/actions/adminActions";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <AdminPageHeader
          title="Kategoriler"
          description="Tüm kategorileri buradan görüntüleyin."
        />
        <Link href="/admin/kategoriler/new" className="btn-primary">
          Yeni Kategori
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#eef5ec]">
            <tr>
              <th className="px-6 py-4">Ad</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Açıklama</th>
              <th className="px-6 py-4">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t border-[#f1ece3]">
                <td className="px-6 py-4 font-medium text-[#1f4d2b]">
                  {category.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {category.slug}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {category.description || "-"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/kategoriler/${category.id}`}
                      className="rounded-xl border border-[#2f6b3b] px-4 py-2 text-sm text-[#2f6b3b] hover:bg-[#eef5ec]"
                    >
                      Düzenle
                    </Link>

                    <form action={deleteCategory}>
                      <input type="hidden" name="id" value={category.id} />
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