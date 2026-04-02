import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sepetim",
  description: "Sepetinizdeki ürünleri yönetin.",
};
import PageHero from "@/components/ui/PageHero";
import CartActionButtons from "@/components/user/CartActionButtons";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createOrderFromCart } from "@/app/actions/orderActions";

export default async function CartPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/giris");
  }

  const cart = await prisma.cart.findUnique({
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
  });

  const total =
    cart?.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0) || 0;

  return (
    <main>
      <PageHero
        title="Sepetim"
        description="Sepetinizdeki ürünleri görüntüleyin ve siparişinizi tamamlayın."
      />

      <section className="py-16">
        <div className="container-custom">
          {!cart || cart.items.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-[#1f4d2b]">Sepetiniz boş</h2>
              <p className="mt-3 text-gray-600">
                Alışverişe başlamak için ürünler sayfasına gidebilirsiniz.
              </p>
              <Link href="/urunler" className="btn-primary mt-6">
                Ürünlere Git
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
              <div className="space-y-6">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="h-28 w-28 rounded-2xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#1f4d2b]">
                          {item.product.title}
                        </h3>
                        <p className="mt-2 text-gray-600">
                          Birim Fiyat: {item.product.price} TL
                        </p>
                        <p className="mt-1 text-gray-600">
                          Adet: {item.quantity}
                        </p>
                        <p className="mt-2 font-semibold text-[#2f6b3b]">
                          Toplam: {item.product.price * item.quantity} TL
                        </p>
                      </div>

                      <CartActionButtons productId={item.productId} />
                    </div>
                  </div>
                ))}
              </div>

              <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-[#1f4d2b]">Sipariş Özeti</h2>
                <div className="mt-6 flex items-center justify-between text-gray-700">
                  <span>Toplam Tutar</span>
                  <span className="text-xl font-bold text-[#2f6b3b]">
                    {total} TL
                  </span>
                </div>

                <a
                  href={`https://wa.me/905551112233?text=Merhaba,%20sepetimdeki%20ürünler%20için%20sipariş%20vermek%20istiyorum.%20Toplam:%20${total}%20TL`}
                  target="_blank"
                  className="btn-primary mt-6 w-full text-center"
                >
                  WhatsApp ile Sipariş Ver
                </a>

                <form action={createOrderFromCart} className="mt-4">
                  <button type="submit" className="btn-outline w-full text-center">
                    Siparişi Oluştur
                  </button>
                </form>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}