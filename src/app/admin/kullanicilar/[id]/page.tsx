import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      orders: true,
      favorites: true,
      reviews: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section>
      <AdminPageHeader
        title="Kullanıcılar"
        description="Sisteme kayıtlı kullanıcıları buradan görüntüleyin."
      />

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#eef5ec]">
            <tr>
              <th className="px-6 py-4">Ad Soyad</th>
              <th className="px-6 py-4">E-posta</th>
              <th className="px-6 py-4">Rol</th>
              <th className="px-6 py-4">Sipariş</th>
              <th className="px-6 py-4">Favori</th>
              <th className="px-6 py-4">Yorum</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-[#f1ece3]">
                <td className="px-6 py-4 font-medium text-[#1f4d2b]">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-gray-600">{user.role}</td>
                <td className="px-6 py-4 text-gray-600">{user.orders.length}</td>
                <td className="px-6 py-4 text-gray-600">{user.favorites.length}</td>
                <td className="px-6 py-4 text-gray-600">
                  {user.reviews.length + user.comments.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}