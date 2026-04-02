"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;

  if (!name || !slug) {
    throw new Error("Kategori adı ve slug zorunludur.");
  }

  await prisma.category.create({
    data: {
      name,
      slug,
      description,
      image,
    },
  });

  revalidatePath("/admin/kategoriler");
  revalidatePath("/kategoriler");
}