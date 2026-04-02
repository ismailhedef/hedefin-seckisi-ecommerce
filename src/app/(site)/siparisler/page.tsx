import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Siparişlerim",
  description: "Geçmiş siparişlerinizi görüntüleyin.",
};
import PageHero from "@/components/ui/PageHero";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/giris");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
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
  });

  return (
    <main>
      <PageHero
        title="Siparişlerim"
        description="Geçmiş siparişlerinizi ve sipariş detaylarınızı buradan inceleyin."
      />

      <section className="py-16">
        <div className="container-custom">
          {orders.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-[#1f4d2b]">Henüz siparişiniz yok</h2>
              <p className="mt-3 text-gray-600">
                Sepetinize ürün ekleyerek sipariş oluşturabilirsiniz.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div key={order.id} className="rounded-3xl bg-white p-8 shadow-sm">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-[#1f4d2b]">
                        Sipariş No: {order.id.slice(0, 8)}
                      </h2>
                      <p className="mt-2 text-gray-600">
                        Durum: <span className="font-semibold text-[#2f6b3b]">{order.status}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500">Toplam</p>
                      <p className="text-2xl font-bold text-[#2f6b3b]">{order.total} TL</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col gap-4 rounded-2xl border border-[#eee7db] p-4 md:flex-row md:items-center"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="h-20 w-20 rounded-2xl object-cover"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold text-[#1f4d2b]">
                            {item.product.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Adet: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-600">
                            Birim fiyat: {item.price} TL
                          </p>
                        </div>

                        <div className="font-semibold text-[#2f6b3b]">
                          {item.quantity * item.price} TL
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}