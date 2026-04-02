import Link from "next/link";

type BlogCardProps = {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
};

export default function BlogCard({
  title,
  slug,
  excerpt,
  image,
}: BlogCardProps) {
  return (
    <div className="card">
      <img src={image} alt={title} className="h-64 w-full object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-[#1f4d2b]">{title}</h3>
        <p className="mt-3 text-gray-600">{excerpt}</p>
        <Link
          href={`/blog/${slug}`}
          className="mt-5 inline-block text-sm font-semibold text-[#2f6b3b]"
        >
          Yazıyı Oku →
        </Link>
      </div>
    </div>
  );
}