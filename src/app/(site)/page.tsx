import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ana Sayfa",
  description:
    "Doğal ürünler, blog yazıları, WhatsApp sipariş ve modern e-ticaret deneyimi.",
};
import BlogCard from "@/components/ui/BlogCard";
import PageHero from "@/components/ui/PageHero";
import SearchBar from "@/components/ui/SearchBar";
import { prisma } from "@/lib/prisma";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
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
          <div className="mb-8 max-w-xl">
            <SearchBar placeholder="Blog içinde ara..." />
          </div>

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