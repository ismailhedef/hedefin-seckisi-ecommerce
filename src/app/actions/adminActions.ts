"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function ensureAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect("/giris");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return session;
}

export async function deleteProduct(formData: FormData) {
  await ensureAdmin();

  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Ürün ID bulunamadı.");
  }

  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/admin/urunler");
  revalidatePath("/urunler");
}

export async function deleteCategory(formData: FormData) {
  await ensureAdmin();

  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Kategori ID bulunamadı.");
  }

  const relatedProducts = await prisma.product.count({
    where: { categoryId: id },
  });

  if (relatedProducts > 0) {
    throw new Error("Bu kategoriye bağlı ürünler var. Önce ürünleri silin veya taşıyın.");
  }

  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/admin/kategoriler");
  revalidatePath("/kategoriler");
}

export async function deleteBlogPost(formData: FormData) {
  await ensureAdmin();

  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Blog ID bulunamadı.");
  }

  await prisma.blogPost.delete({
    where: { id },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}