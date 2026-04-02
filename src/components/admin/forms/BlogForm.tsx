"use client";

import { useState } from "react";
import { slugify } from "@/lib/slugify";
import SubmitButton from "@/components/ui/SubmitButton";

type BlogFormProps = {
  action: (formData: FormData) => void;
  initialData?: {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    image?: string;
  };
};

export default function BlogForm({ action, initialData }: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");

  return (
    <form action={action} className="rounded-3xl bg-white p-8 shadow-sm max-w-4xl">
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

      <div className="grid gap-6">
        <input
          name="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSlug(slugify(e.target.value));
          }}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
          placeholder="Başlık"
          required
        />

        <input
          name="slug"
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
          placeholder="slug"
          required
        />

        <textarea
          name="excerpt"
          rows={3}
          defaultValue={initialData?.excerpt || ""}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
          placeholder="Özet"
          required
        />

        <textarea
          name="content"
          rows={8}
          defaultValue={initialData?.content || ""}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
          placeholder="İçerik"
          required
        />

        <input
          name="image"
          type="text"
          defaultValue={initialData?.image || ""}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
          placeholder="Kapak görseli URL"
        />

        <SubmitButton
          text={initialData?.id ? "Yazıyı Güncelle" : "Yazıyı Kaydet"}
          loadingText="Kaydediliyor..."
          className="w-fit"
        />
      </div>
    </form>
  );
}