"use client";

import { useState } from "react";
import { slugify } from "@/lib/slugify";
import SubmitButton from "@/components/ui/SubmitButton";

type Category = {
  id: string;
  name: string;
};

type ProductFormProps = {
  action: (formData: FormData) => void;
  categories: Category[];
  initialData?: {
    id?: string;
    title?: string;
    slug?: string;
    description?: string;
    price?: number;
    oldPrice?: number | null;
    stock?: number;
    image?: string;
    categoryId?: string;
  };
};

export default function ProductForm({
  action,
  categories,
  initialData,
}: ProductFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");

  return (
    <form action={action} className="rounded-3xl bg-white p-8 shadow-sm max-w-4xl">
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

      <div className="grid gap-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">Ürün Adı</label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(slugify(e.target.value));
            }}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">Slug</label>
          <input
            name="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">Açıklama</label>
          <textarea
            name="description"
            rows={5}
            defaultValue={initialData?.description || ""}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            required
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={initialData?.price || ""}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            placeholder="Fiyat"
            required
          />
          <input
            name="oldPrice"
            type="number"
            step="0.01"
            defaultValue={initialData?.oldPrice || ""}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            placeholder="Eski fiyat"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <input
            name="stock"
            type="number"
            defaultValue={initialData?.stock || ""}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            placeholder="Stok"
            required
          />

          <select
            name="categoryId"
            defaultValue={initialData?.categoryId || ""}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            required
          >
            <option value="">Kategori seçin</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <input
          name="image"
          type="text"
          defaultValue={initialData?.image || ""}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
          placeholder="Kapak görseli URL"
          required
        />

        <SubmitButton
          text={initialData?.id ? "Ürünü Güncelle" : "Ürünü Kaydet"}
          loadingText="Kaydediliyor..."
          className="w-fit"
        />
      </div>
    </form>
  );
}