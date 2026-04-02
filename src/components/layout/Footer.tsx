import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#e7dfd1] bg-white py-12">
      <div className="container-custom grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="text-2xl font-bold text-[#1f4d2b]">YeşilÇarşı</h3>
          <p className="mt-4 text-gray-600">
            Doğal yaşam ürünleri, güven veren alışveriş ve bilgilendirici blog içerikleri.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-[#1f4d2b]">Kurumsal</h4>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li><Link href="/">Ana Sayfa</Link></li>
            <li><Link href="/iletisim">İletişim</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/giris">Üyelik</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-[#1f4d2b]">Kategoriler</h4>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li><Link href="/kategoriler">Doğal Sabunlar</Link></li>
            <li><Link href="/kategoriler">Organik Yağlar</Link></li>
            <li><Link href="/kategoriler">Doğal Kozmetik</Link></li>
            <li><Link href="/kategoriler">Bakım Ürünleri</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-[#1f4d2b]">İletişim</h4>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>+90 555 111 22 33</li>
            <li>info@yesilcarsi.com</li>
            <li>İstanbul / Türkiye</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}