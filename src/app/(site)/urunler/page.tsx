import ProductCard from "@/components/ui/ProductCard";
import PageHero from "@/components/ui/PageHero";
import SearchBar from "@/components/ui/SearchBar";
import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: {
    q?: string;
    category?: string;
  };
};

export default async function ProductsPage({ searchParams }: Props) {
  const q = searchParams.q || "";
  const category = searchParams.category || "";

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const products = await prisma.product.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        category
          ? {
              category: {
                slug: category,
              },
            }
          : {},
      ],
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
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

              <form method="GET" className="mt-4">
                <SearchBar placeholder="Ürün ara..." defaultValue={q} name="q" />
              </form>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-[#1f4d2b]">Kategoriler</h3>
                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href="/urunler"
                    className={`rounded-xl px-4 py-3 text-left ${
                      !category ? "bg-[#eef5ec] text-[#1f4d2b]" : "text-gray-700 hover:bg-[#eef5ec]"
                    }`}
                  >
                    Tüm Ürünler
                  </a>

                  {categories.map((cat) => (
                    <a
                      key={cat.id}
                      href={`/urunler?category=${cat.slug}${q ? `&q=${q}` : ""}`}
                      className={`rounded-xl px-4 py-3 text-left ${
                        category === cat.slug
                          ? "bg-[#eef5ec] text-[#1f4d2b]"
                          : "text-gray-700 hover:bg-[#eef5ec]"
                      }`}
                    >
                      {cat.name}
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">{products.length} ürün listeleniyor</p>
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