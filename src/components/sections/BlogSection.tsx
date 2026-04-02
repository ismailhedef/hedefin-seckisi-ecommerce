import BlogCard from "../ui/BlogCard";
import { prisma } from "@/lib/prisma";

export default async function BlogSection() {
  const posts = await prisma.blogPost.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className="section-title">Son Blog Yazıları</h2>
        <p className="section-subtitle">
          Ürünler, bakım önerileri ve doğal yaşam rehberleri.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
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
  );
}