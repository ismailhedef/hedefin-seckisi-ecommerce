import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profilim",
  description: "Kullanıcı profil bilgilerinizi görüntüleyin.",
};
import PageHero from "@/components/ui/PageHero";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/giris");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      reviews: true,
      comments: true,
      favorites: true,
      orders: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      },
    },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <main>
      <PageHero
        title="Profilim"
        description="Hesap bilgileriniz ve kullanıcı aktivitelerinizi buradan görüntüleyin."
      />

      <section className="py-16">
        <div className="container-custom grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-3xl bg-white p-8 shadow-sm h-fit">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eef5ec] text-2xl font-bold text-[#1f4d2b]">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#1f4d2b]">{user.name}</h2>
            <p className="mt-2 text-gray-600">{user.email}</p>

            <div className="mt-6 space-y-3">
              <Link href="/siparisler" className="block rounded-2xl bg-[#eef5ec] px-4 py-3 text-[#1f4d2b]">
                Siparişlerim
              </Link>
              <Link href="/favoriler" className="block rounded-2xl bg-[#eef5ec] px-4 py-3 text-[#1f4d2b]">
                Favorilerim
              </Link>
              <Link href="/sepet" className="block rounded-2xl bg-[#eef5ec] px-4 py-3 text-[#1f4d2b]">
                Sepetim
              </Link>
            </div>
          </aside>

          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Sipariş Sayısı</p>
                <h3 className="mt-3 text-3xl font-bold text-[#1f4d2b]">{user.orders.length}</h3>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Favori Ürün</p>
                <h3 className="mt-3 text-3xl font-bold text-[#1f4d2b]">{user.favorites.length}</h3>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Ürün Yorumu</p>
                <h3 className="mt-3 text-3xl font-bold text-[#1f4d2b]">{user.reviews.length}</h3>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Blog Yorumu</p>
                <h3 className="mt-3 text-3xl font-bold text-[#1f4d2b]">{user.comments.length}</h3>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1f4d2b]">Hesap Bilgileri</h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-[#faf8f3] p-4">
                  <p className="text-sm text-gray-500">Ad Soyad</p>
                  <p className="mt-2 font-medium text-[#1f4d2b]">{user.name}</p>
                </div>

                <div className="rounded-2xl bg-[#faf8f3] p-4">
                  <p className="text-sm text-gray-500">E-posta</p>
                  <p className="mt-2 font-medium text-[#1f4d2b]">{user.email}</p>
                </div>

                <div className="rounded-2xl bg-[#faf8f3] p-4">
                  <p className="text-sm text-gray-500">Rol</p>
                  <p className="mt-2 font-medium text-[#1f4d2b]">{user.role}</p>
                </div>

                <div className="rounded-2xl bg-[#faf8f3] p-4">
                  <p className="text-sm text-gray-500">Kayıt Tarihi</p>
                  <p className="mt-2 font-medium text-[#1f4d2b]">
                    {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>
              </div>
            </div>

            {user.orders.length > 0 && (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-[#1f4d2b]">Son Siparişlerim</h2>
                  <Link href="/siparisler" className="btn-outline text-sm">
                    Tümünü Gör
                  </Link>
                </div>

                <div className="space-y-4">
                  {user.orders.map((order) => (
                    <div key={order.id} className="rounded-2xl border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm text-gray-500">Sipariş No</p>
                          <p className="font-semibold text-[#1f4d2b]">{order.id.slice(0, 8).toUpperCase()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Tutar</p>
                          <p className="font-semibold text-[#2f6b3b] text-lg">{order.total} TL</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "COMPLETED"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status === "PENDING"
                            ? "Beklemede"
                            : order.status === "COMPLETED"
                              ? "Tamamlandı"
                              : "İptal Edildi"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}