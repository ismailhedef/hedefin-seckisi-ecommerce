"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";

type MobileMenuProps = {
  session: {
    user?: {
      id?: string;
      name?: string | null;
      role?: string | null;
    } | null;
  } | null;
  cartCount: number;
};

export default function MobileMenu({
  session,
  cartCount,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Kategoriler", href: "/kategoriler" },
    { label: "Ürünler", href: "/urunler" },
    { label: "Blog", href: "/blog" },
    { label: "İletişim", href: "/iletisim" },
  ];

  return (
    <div className="relative md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-xl border border-[#2f6b3b] px-4 py-2 text-sm text-[#2f6b3b]"
      >
        Menü
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-[#e7dfd1] bg-white p-4 shadow-lg">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-[#eef5ec] hover:text-[#1f4d2b]"
              >
                {link.label}
              </Link>
            ))}

            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-semibold text-[#2f6b3b] hover:bg-[#eef5ec]"
              >
                Admin Panel
              </Link>
            )}

            {session?.user ? (
              <>
                <Link
                  href="/favoriler"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-[#eef5ec]"
                >
                  Favorilerim
                </Link>

                <Link
                  href="/sepet"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-[#eef5ec]"
                >
                  Sepetim {cartCount > 0 ? `(${cartCount})` : ""}
                </Link>

                <Link
                  href="/profil"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-[#eef5ec]"
                >
                  Profilim
                </Link>

                <Link
                  href="/siparisler"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-[#eef5ec]"
                >
                  Siparişlerim
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-xl px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/giris"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-[#eef5ec]"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/kayit"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-[#eef5ec]"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}