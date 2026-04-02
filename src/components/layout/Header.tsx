import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import MobileMenu from "./MobileMenu";
import LogoutButton from "@/components/auth/LogoutButton";

const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Kategoriler", href: "/kategoriler" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export default async function Header() {
  const session = await auth();

  let cartCount = 0;

  if (session?.user?.id) {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: true,
      },
    });

    cartCount =
      cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  }

  return (
    <>
      <div className="bg-[#1f4d2b] text-sm text-white">
        <div className="container-custom flex flex-col gap-2 py-2 md:flex-row md:items-center md:justify-between">
          <p>Doğal yaşam ürünlerinde özel indirimler sizi bekliyor.</p>
          <p>WhatsApp Sipariş: +90 555 111 22 33</p>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#e7dfd1] bg-[#f7f3ea]/95 backdrop-blur">
        <div className="container-custom flex items-center justify-between py-4">
          <div>
            <Link href="/" className="text-2xl font-bold text-[#1f4d2b]">
              YeşilÇarşı
            </Link>
            <p className="text-sm text-gray-600">Doğal ürünler & blog</p>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 transition hover:text-[#2f6b3b]"
              >
                {link.label}
              </Link>
            ))}

            {session?.user?.role === "ADMIN" && (
              <Link href="/admin" className="font-semibold text-[#2f6b3b]">
                Admin
              </Link>
            )}

            {session?.user ? (
              <>
                <Link
                  href="/profil"
                  className="rounded-full border border-[#2f6b3b] px-4 py-2 text-sm text-[#2f6b3b]"
                >
                  Profilim
                </Link>

                <Link
                  href="/favoriler"
                  className="rounded-full border border-[#a67c52] px-4 py-2 text-sm text-[#a67c52]"
                >
                  Favoriler
                </Link>

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

                <span className="font-medium text-[#1f4d2b]">
                  {session.user.name}
                </span>

                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/giris"
                  className="rounded-full border border-[#2f6b3b] px-4 py-2 text-sm text-[#2f6b3b] hover:bg-[#ddebdd]"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/kayit"
                  className="rounded-full bg-[#2f6b3b] px-4 py-2 text-sm text-white hover:bg-[#1f4d2b]"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </nav>

          <MobileMenu session={session} cartCount={cartCount} />
        </div>
      </header>
    </>
  );
}