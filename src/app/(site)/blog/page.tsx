import BlogCard from "@/components/ui/BlogCard";
import PageHero from "@/components/ui/PageHero";
import SearchBar from "@/components/ui/SearchBar";
import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: {
    q?: string;
  };
};

export default async function BlogPage({ searchParams }: Props) {
  const q = searchParams.q || "";

  const posts = await prisma.blogPost.findMany({
    where: q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { excerpt: { contains: q, mode: "insensitive" } },
            { content: { contains: q, mode: "insensitive" } },
          ],
        }
      : {},
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main>
      <PageHero
        title="Blog Yazıları"
        description="Doğal yaşam, ürün kullanımı ve bakım önerileri hakkında içerikler."
      />

      <section className="py-16">
        <div className="container-custom">
          <form method="GET" className="mb-8 max-w-xl">
            <SearchBar placeholder="Blog içinde ara..." defaultValue={q} name="q" />
          </form>

          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                image={post.image || ""}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}