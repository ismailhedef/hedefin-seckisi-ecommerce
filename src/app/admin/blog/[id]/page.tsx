import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { updateBlogPost } from "@/app/actions/adminUpdateActions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return (
    <section>
      <AdminPageHeader
        title="Blog Yazısı Düzenle"
        description="Mevcut blog içeriğini güncelleyin."
      />

      <form
        action={updateBlogPost}
        className="max-w-4xl rounded-3xl bg-white p-8 shadow-sm"
      >
        <input type="hidden" name="id" value={post.id} />

        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              Başlık
            </label>
            <input
              name="title"
              type="text"
              defaultValue={post.title}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              Slug
            </label>
            <input
              name="slug"
              type="text"
              defaultValue={post.slug}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              Özet
            </label>
            <textarea
              name="excerpt"
              rows={3}
              defaultValue={post.excerpt ?? ""}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              İçerik
            </label>
            <textarea
              name="content"
              rows={8}
              defaultValue={post.content}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              Kapak Görseli URL
            </label>
            <input
              name="image"
              type="text"
              defaultValue={post.image ?? ""}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            />
          </div>

          <button type="submit" className="btn-primary w-fit">
            Güncelle
          </button>
        </div>
      </form>
    </section>
  );
}