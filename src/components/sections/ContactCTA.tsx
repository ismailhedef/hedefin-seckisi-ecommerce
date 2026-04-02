export default function ContactCTA() {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="rounded-[32px] bg-[#1f4d2b] px-8 py-12 text-white md:px-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                Sipariş ve bilgi için bize hemen ulaşın
              </h2>
              <p className="mt-4 max-w-xl text-white/80">
                Ürünler hakkında bilgi almak veya hızlı sipariş vermek için WhatsApp’tan yazın.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 md:justify-end">
              <a
                href="https://wa.me/905551112233?text=Merhaba,%20ürünleriniz%20hakkında%20bilgi%20almak%20istiyorum."
                target="_blank"
                className="rounded-full bg-white px-6 py-3 font-semibold text-[#1f4d2b]"
              >
                WhatsApp ile Yaz
              </a>
              <a
                href="/iletisim"
                className="rounded-full border border-white px-6 py-3 font-semibold text-white"
              >
                İletişim Sayfası
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}