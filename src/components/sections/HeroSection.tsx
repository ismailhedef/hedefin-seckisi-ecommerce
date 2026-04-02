import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom grid items-center gap-10 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-[#ddebdd] px-4 py-2 text-sm text-[#1f4d2b]">
            Otantik • Modern • Doğal
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-[#1f4d2b] md:text-6xl">
            Doğal yaşamın en özel ürünleri tek adreste
          </h2>

          <p className="mt-6 max-w-xl text-lg text-gray-700">
            Modern çizgilerle hazırlanmış, güven veren ve blog içerikleriyle desteklenen
            yeni nesil e-ticaret deneyimi.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/urunler" className="btn-primary">Ürünleri Keşfet</Link>
            <Link href="/blog" className="btn-outline">Blog Yazılarını Oku</Link>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop"
            alt="Doğal ürünler"
            className="h-[500px] w-full rounded-[32px] object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}