import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const productCount = await prisma.product.count();
  const categoryCount = await prisma.category.count();
  const blogCount = await prisma.blogPost.count();
  const userCount = await prisma.user.count();

  return (
    <section>
      <AdminPageHeader
        title="Dashboard"
        description="Sitenizin genel durumunu buradan görebilirsiniz."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Toplam Ürün</p>
          <h2 className="mt-3 text-4xl font-bold text-[#1f4d2b]">{productCount}</h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Toplam Kategori</p>
          <h2 className="mt-3 text-4xl font-bold text-[#1f4d2b]">{categoryCount}</h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Toplam Blog Yazısı</p>
          <h2 className="mt-3 text-4xl font-bold text-[#1f4d2b]">{blogCount}</h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Toplam Kullanıcı</p>
          <h2 className="mt-3 text-4xl font-bold text-[#1f4d2b]">{userCount}</h2>
        </div>
      </div>
    </section>
  );
}