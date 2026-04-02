// src/app/actions/userActions.ts
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addToCart(productId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/giris");
  }

  const cartClient = (prisma as any).cart; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!cartClient) {
    throw new Error(
      "Prisma model 'cart' bulunamadı. lütfen `npx prisma migrate dev --name add_cart` ve `npx prisma generate` ardından Next.js sunucusunu yeniden başlatın."
    );
  }

  let cart = await cartClient.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: session.user.id,
      },
    });
  }

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      data: {
        quantity: existingItem.quantity + 1,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }

  revalidatePath("/sepet");
  revalidatePath("/urunler");
  revalidatePath("/", "layout");
}

export async function decreaseCartItem(productId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/giris");
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: { items: true },
  });

  if (!cart) return;

  const item = cart.items.find((i) => i.productId === productId);
  if (!item) return;

  if (item.quantity <= 1) {
    await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });
  } else {
    await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      data: {
        quantity: item.quantity - 1,
      },
    });
  }

  revalidatePath("/sepet");
  revalidatePath("/", "layout");
}

export async function removeFromCart(productId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/giris");
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!cart) return;

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (!existingItem) return;

  await prisma.cartItem.delete({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  revalidatePath("/sepet");
  revalidatePath("/", "layout");
}

export async function addToFavorites(productId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/giris");
  }

  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_productId: {
        userId: session.user.id,
        productId,
      },
    },
  });

  if (existingFavorite) {
    await prisma.favorite.delete({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
    });
  } else {
    await prisma.favorite.create({
      data: {
        userId: session.user.id,
        productId,
      },
    });
  }

  revalidatePath("/favoriler");
  revalidatePath("/urunler");
  revalidatePath("/", "layout");
}

export async function createProductReview(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/giris");
  }

  const productId = formData.get("productId") as string;
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment") as string;

  if (!productId || !rating || !comment?.trim()) {
    throw new Error("Tüm alanları doldurun.");
  }

  await prisma.review.create({
    data: {
      productId,
      userId: session.user.id,
      rating,
      comment,
    },
  });

  revalidatePath("/urunler");
  revalidatePath("/", "layout");
}

export async function createBlogComment(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/giris");
  }

  const blogPostId = formData.get("blogPostId") as string;
  const content = formData.get("content") as string;

  if (!blogPostId || !content?.trim()) {
    throw new Error("Yorum alanı boş olamaz.");
  }

  await prisma.comment.create({
    data: {
      blogPostId,
      userId: session.user.id,
      content,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/", "layout");
}