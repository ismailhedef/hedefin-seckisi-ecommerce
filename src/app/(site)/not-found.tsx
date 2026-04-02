import Link from "next/link";

export default function SiteNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <div className="container-custom text-center">
        <h1 className="text-6xl font-bold text-[#1f4d2b]">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-[#1f4d2b]">
          Aradığınız sayfa bulunamadı
        </h2>
        <p className="mt-4 text-gray-600">
          Sayfa kaldırılmış, taşınmış veya yanlış yazılmış olabilir.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/" className="btn-primary">
            Ana Sayfaya Dön
          </Link>
          <Link href="/urunler" className="btn-outline">
            Ürünlere Git
          </Link>
        </div>
      </div>
    </main>
  );
}