import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteBlogPost } from "@/app/actions/adminActions";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <AdminPageHeader
          title="Blog Yazıları"
          description="Tüm blog içeriklerini buradan yönetin."
        />
        <Link href="/admin/blog/new" className="btn-primary">
          Yeni Yazı
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#eef5ec]">
            <tr>
              <th className="px-6 py-4">Başlık</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Özet</th>
              <th className="px-6 py-4">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-[#f1ece3]">
                <td className="px-6 py-4 font-medium text-[#1f4d2b]">
                  {post.title}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {post.slug}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {post.excerpt || "-"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="rounded-xl border border-[#2f6b3b] px-4 py-2 text-sm text-[#2f6b3b] hover:bg-[#eef5ec]"
                    >
                      Düzenle
                    </Link>

                    <form action={deleteBlogPost}>
                      <input type="hidden" name="id" value={post.id} />
                      <button
                        type="submit"
                        className="rounded-xl border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sil
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}