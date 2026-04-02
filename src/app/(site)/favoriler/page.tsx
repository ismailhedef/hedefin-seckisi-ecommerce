import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function FavoritesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/giris");
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main>
      <PageHero
        title="Favorilerim"
        description="Beğendiğiniz ürünleri daha sonra kolayca incelemek için burada saklayın."
      />

      <section className="py-16">
        <div className="container-custom">
          {favorites.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-[#1f4d2b]">Favori ürününüz yok</h2>
              <p className="mt-3 text-gray-600">
                Ürünleri favorilere ekleyerek burada görüntüleyebilirsiniz.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {favorites.map((favorite) => (
                <ProductCard
                  key={favorite.id}
                  title={favorite.product.title}
                  slug={favorite.product.slug}
                  price={`${favorite.product.price} TL`}
                  oldPrice={
                    favorite.product.oldPrice
                      ? `${favorite.product.oldPrice} TL`
                      : ""
                  }
                  image={favorite.product.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}