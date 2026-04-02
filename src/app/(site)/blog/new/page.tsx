import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { createBlogPost } from "@/app/actions/blogActions";

export default function NewBlogPage() {
  return (
    <section>
      <AdminPageHeader
        title="Yeni Blog Yazısı"
        description="Blog için yeni bir içerik ekleyin."
      />

      <form action={createBlogPost} className="rounded-3xl bg-white p-8 shadow-sm max-w-4xl">
        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">Başlık</label>
            <input
              name="title"
              type="text"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              placeholder="Blog başlığı"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">Slug</label>
            <input
              name="slug"
              type="text"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              placeholder="blog-yazi-slug"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">Özet</label>
            <textarea
              name="excerpt"
              rows={3}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              placeholder="Kısa özet"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">İçerik</label>
            <textarea
              name="content"
              rows={8}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              placeholder="Blog içeriği"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">Kapak Görseli URL</label>
            <input
              name="image"
              type="text"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
              placeholder="https://..."
            />
          </div>

          <button type="submit" className="btn-primary w-fit">
            Yazıyı Kaydet
          </button>
        </div>
      </form>
    </section>
  );
}