import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { updateCategory } from "@/app/actions/adminUpdateActions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    notFound();
  }

  return (
    <section>
      <AdminPageHeader
        title="Kategori Düzenle"
        description="Mevcut kategori bilgilerini güncelleyin."
      />

      <form
        action={updateCategory}
        className="max-w-3xl rounded-3xl bg-white p-8 shadow-sm"
      >
        <input type="hidden" name="id" value={category.id} />

        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              Kategori Adı
            </label>
            <input
              name="name"
              type="text"
              defaultValue={category.name}
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
              defaultValue={category.slug}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              Açıklama
            </label>
            <textarea
              name="description"
              rows={4}
              defaultValue={category.description ?? ""}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
              Görsel URL
            </label>
            <input
              name="image"
              type="text"
              defaultValue={category.image ?? ""}
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