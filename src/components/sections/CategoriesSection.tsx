import CategoryCard from "../ui/CategoryCard";
import { prisma } from "@/lib/prisma";

export default async function CategoriesSection() {
  const categories = await prisma.category.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className="section-title">Öne Çıkan Kategoriler</h2>
        <p className="section-subtitle">Doğal yaşam ürünlerine kolayca ulaşın.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.name}
              description={category.description || ""}
              image={category.image || ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}