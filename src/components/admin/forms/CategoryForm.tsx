"use client";

import { useState } from "react";
import { slugify } from "@/lib/slugify";
import SubmitButton from "@/components/ui/SubmitButton";

type CategoryFormProps = {
  action: (formData: FormData) => void;
  initialData?: {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
  };
};

export default function CategoryForm({
  action,
  initialData,
}: CategoryFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");

  return (
    <form action={action} className="rounded-3xl bg-white p-8 shadow-sm max-w-3xl">
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

      <div className="grid gap-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
            Kategori Adı
          </label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSlug(slugify(e.target.value));
            }}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            placeholder="Örn: Doğal Sabunlar"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
            Slug
          </label>
          <input
            name="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            placeholder="dogal-sabunlar"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
            Açıklama
          </label>
          <textarea
            name="description"
            rows={4}
            defaultValue={initialData?.description || ""}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            placeholder="Kategori açıklaması"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
            Görsel URL
          </label>
          <input
            name="image"
            type="text"
            defaultValue={initialData?.image || ""}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
            placeholder="https://..."
          />
        </div>

        <SubmitButton
          text={initialData?.id ? "Kategoriyi Güncelle" : "Kategoriyi Kaydet"}
          loadingText="Kaydediliyor..."
          className="w-fit"
        />
      </div>
    </form>
  );
}