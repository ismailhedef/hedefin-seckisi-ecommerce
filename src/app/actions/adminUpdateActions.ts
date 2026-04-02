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

  if ((session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  return session;
}

export async function updateCategory(formData: FormData) {
  await ensureAdmin();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;

  if (!id || !name || !slug) {
    throw new Error("Zorunlu alanları doldurunuz.");
  }

  await prisma.category.update({
    where: { id },
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

export async function updateProduct(formData: FormData) {
  await ensureAdmin();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const oldPriceValue = formData.get("oldPrice") as string;
  const stock = Number(formData.get("stock"));
  const image = formData.get("image") as string;
  const categoryId = formData.get("categoryId") as string;

  if (!id || !title || !slug || !description || !price || !stock || !image || !categoryId) {
    throw new Error("Zorunlu alanları doldurunuz.");
  }

  await prisma.product.update({
    where: { id },
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

export async function updateBlogPost(formData: FormData) {
  await ensureAdmin();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string;

  if (!id || !title || !slug || !excerpt || !content) {
    throw new Error("Zorunlu alanları doldurunuz.");
  }

  await prisma.blogPost.update({
    where: { id },
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

export async function updateOrderStatus(formData: FormData) {
  await ensureAdmin();

  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  if (!id || !status) {
    throw new Error("Sipariş bilgileri eksik.");
  }

  await prisma.order.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/siparisler");
  revalidatePath("/siparisler");
}

export async function deleteReview(formData: FormData) {
  await ensureAdmin();

  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Review ID eksik.");
  }

  await prisma.review.delete({
    where: { id },
  });

  revalidatePath("/admin/yorumlar");
}

export async function deleteComment(formData: FormData) {
  await ensureAdmin();

  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Comment ID eksik.");
  }

  await prisma.comment.delete({
    where: { id },
  });

  revalidatePath("/admin/yorumlar");
}