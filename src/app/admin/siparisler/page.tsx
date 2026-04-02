import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { prisma } from "@/lib/prisma";
import { updateOrderStatus } from "@/app/actions/adminUpdateActions";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
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
    <section>
      <AdminPageHeader
        title="Siparişler"
        description="Müşteri siparişlerini buradan görüntüleyin."
      />

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <p className="text-gray-600">Henüz sipariş bulunmuyor.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1f4d2b]">
                    Sipariş No: {order.id.slice(0, 8)}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    Müşteri: {order.user.name} ({order.user.email})
                  </p>

                  <div className="mt-3">
                    <form
                      action={updateOrderStatus}
                      className="flex flex-wrap items-center gap-3"
                    >
                      <input type="hidden" name="id" value={order.id} />

                      <select
                        name="status"
                        defaultValue={order.status}
                        className="rounded-xl border border-gray-300 px-4 py-2 outline-none"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="PREPARING">PREPARING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>

                      <button
                        type="submit"
                        className="rounded-xl border border-[#2f6b3b] px-4 py-2 text-sm text-[#2f6b3b] hover:bg-[#eef5ec]"
                      >
                        Güncelle
                      </button>
                    </form>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Toplam Tutar</p>
                  <p className="text-2xl font-bold text-[#2f6b3b]">
                    {order.total} TL
                  </p>
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
                        Fiyat: {item.price} TL
                      </p>
                    </div>

                    <div className="font-semibold text-[#2f6b3b]">
                      {item.quantity * item.price} TL
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}