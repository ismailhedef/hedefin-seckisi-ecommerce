import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Doğal yaşam, bakım önerileri ve ürün rehberleri.",
};
import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/ui/BlogCard";
import PageHero from "@/components/ui/PageHero";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
    },
  });

  return (
    <main>
      <PageHero
        title="Blog"
        description="Doğal yaşam ve sağlık hakkında uzman yazılarımızı okuyun"
      />

      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image || ""}
                slug={post.slug}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
