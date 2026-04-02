import ProductCard from "@/components/ui/ProductCard";
import PageHero from "@/components/ui/PageHero";
import SearchBar from "@/components/ui/SearchBar";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main>
      <PageHero
        title="Tüm Ürünler"
        description="Doğal, güvenilir ve özenle seçilmiş ürünlerimizi keşfedin."
      />

      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="rounded-3xl bg-white p-6 shadow-sm h-fit">
              <h2 className="text-xl font-semibold text-[#1f4d2b]">Ara</h2>
              <div className="mt-4">
                <SearchBar placeholder="Ürün ara..." />
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-[#1f4d2b]">Kategoriler</h3>
                <div className="mt-4 flex flex-col gap-3">
                  <button className="rounded-xl bg-[#eef5ec] px-4 py-3 text-left text-[#1f4d2b]">
                    Tüm Ürünler
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className="rounded-xl px-4 py-3 text-left text-gray-700 hover:bg-[#eef5ec]"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">{products.length} ürün listeleniyor</p>
                <select className="rounded-xl border border-[#d8d1c4] bg-white px-4 py-3 outline-none">
                  <option>Önerilen sıralama</option>
                  <option>Fiyat artan</option>
                  <option>Fiyat azalan</option>
                  <option>En yeniler</option>
                </select>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    slug={product.slug}
                    price={`${product.price} TL`}
                    oldPrice={product.oldPrice ? `${product.oldPrice} TL` : ""}
                    image={product.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}