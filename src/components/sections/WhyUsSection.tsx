export default function WhyUsSection() {
  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className="section-title text-center">Neden Bizi Tercih Etmelisiniz?</h2>
        <p className="section-subtitle text-center">
          Güven veren alışveriş, doğal ürünler ve samimi iletişim.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#1f4d2b]">Doğal İçerik</h3>
            <p className="mt-3 text-gray-600">Özenle seçilmiş kaliteli içerikler.</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#1f4d2b]">Hızlı Destek</h3>
            <p className="mt-3 text-gray-600">WhatsApp üzerinden anlık iletişim imkanı.</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#1f4d2b]">Güvenli Alışveriş</h3>
            <p className="mt-3 text-gray-600">Kullanıcı dostu ve güven veren arayüz.</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#1f4d2b]">Bilgilendirici Blog</h3>
            <p className="mt-3 text-gray-600">Ürünlerle ilgili faydalı içerikler.</p>
          </div>
        </div>
      </div>
    </section>
  );
}