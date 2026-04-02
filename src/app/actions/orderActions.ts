"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOrderFromCart() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/giris");
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Sepet boş.");
  }

  const total = cart.items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  await prisma.order.create({
    data: {
      userId: session.user.id,
      total,
      status: "PENDING",
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
  });

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });

  revalidatePath("/sepet");
  revalidatePath("/siparisler");

  redirect("/siparisler");
}