"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  const priceValue = String(formData.get("price") ?? "").trim();
  const price = Number(priceValue);

  const oldPriceValue = String(formData.get("oldPrice") ?? "").trim();
  const stockValue = String(formData.get("stock") ?? "").trim();
  const stock = Number(stockValue);

  const image = String(formData.get("image") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "").trim();

  if (
    !title ||
    !slug ||
    !description ||
    !priceValue ||
    Number.isNaN(price) ||
    !stockValue ||
    Number.isNaN(stock) ||
    !image ||
    !categoryId
  ) {
    throw new Error("Lütfen zorunlu alanları doldurun.");
  }

  await prisma.product.create({
    data: {
      title,
      slug,
      description,
      price,
      oldPrice: oldPriceValue ? Number(oldPriceValue) : null,
      stock,
      image,
      categoryId,
    },
  });

  revalidatePath("/admin/urunler");
  revalidatePath("/urunler");
}