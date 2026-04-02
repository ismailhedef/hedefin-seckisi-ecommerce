import Link from "next/link";

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "Ürünler", href: "/admin/urunler" },
  { label: "Yeni Ürün", href: "/admin/urunler/new" },
  { label: "Kategoriler", href: "/admin/kategoriler" },
  { label: "Yeni Kategori", href: "/admin/kategoriler/new" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Yeni Blog Yazısı", href: "/admin/blog/new" },
  { label: "Siparişler", href: "/admin/siparisler" },
  { label: "Yorumlar", href: "/admin/yorumlar" },
  { label: "Kullanıcılar", href: "/admin/kullanicilar" },
];

export default function AdminSidebar() {
  return (
    <aside className="min-h-screen w-full border-r border-[#e7dfd1] bg-white p-6 lg:w-72">
      <Link href="/admin" className="text-2xl font-bold text-[#1f4d2b]">
        YeşilÇarşı Admin
      </Link>

      <nav className="mt-10 flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-2xl px-4 py-3 text-sm text-gray-700 transition hover:bg-[#eef5ec] hover:text-[#1f4d2b]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}