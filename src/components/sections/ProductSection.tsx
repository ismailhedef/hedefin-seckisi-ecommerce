import ProductCard from "../ui/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function ProductSection() {
  const products = await prisma.product.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="py-16 bg-[#eef5ec]">
      <div className="container-custom">
        <h2 className="section-title">Popüler Ürünler</h2>
        <p className="section-subtitle">En çok tercih edilen doğal ürünleri keşfedin.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    </section>
  );
}