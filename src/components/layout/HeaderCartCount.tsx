import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function HeaderCartCount() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <Link
        href="/sepet"
        className="rounded-full border border-[#2f6b3b] px-4 py-2 text-sm text-[#2f6b3b]"
      >
        Sepetim
      </Link>
    );
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      items: true,
    },
  });

  const cartCount =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <Link
      href="/sepet"
      className="relative rounded-full border border-[#2f6b3b] px-4 py-2 text-sm text-[#2f6b3b]"
    >
      Sepetim
      {cartCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2f6b3b] text-xs font-bold text-white">
          {cartCount}
        </span>
      )}
    </Link>
  );
}