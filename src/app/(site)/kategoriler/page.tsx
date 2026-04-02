import CategoryCard from "@/components/ui/CategoryCard";
import PageHero from "@/components/ui/PageHero";
import { prisma } from "@/lib/prisma";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main>
      <PageHero
        title="Kategoriler"
        description="Doğal yaşam ürünlerimizi kategorilere ayrılmış şekilde kolayca inceleyin."
      />

      <section className="py-16">
        <div className="container-custom grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.name}
              description={category.description || ""}
              image={category.image || ""}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
