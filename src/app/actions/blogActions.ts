"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBlogPost(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string;

  if (!title || !slug || !excerpt || !content) {
    throw new Error("Lütfen zorunlu alanları doldurun.");
  }

  await prisma.blogPost.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      image,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}