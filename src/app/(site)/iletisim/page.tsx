import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Bizimle iletişime geçin, sipariş ve destek alın.",
};
import PageHero from "@/components/ui/PageHero";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="İletişim"
        description="Sorularınız, siparişleriniz ve iş birlikleri için bize ulaşabilirsiniz."
      />

      <section className="py-16">
        <div className="container-custom max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#1f4d2b]">İletişim Bilgileri</h2>
              <ul className="mt-6 space-y-4 text-gray-700">
                <li>Telefon: +90 555 111 22 33</li>
                <li>E-posta: info@yesilcarsi.com</li>
                <li>Adres: İstanbul / Türkiye</li>
                <li>WhatsApp: Hızlı sipariş ve destek hattı</li>
              </ul>

              <a
                href="https://wa.me/905551112233?text=Merhaba,%20sizinle%20iletişime%20geçmek%20istiyorum."
                target="_blank"
                className="mt-6 inline-block rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white"
              >
                WhatsApp ile İletişim
              </a>
            </div>

            <form className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#1f4d2b]">Bize Yazın</h2>

              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Ad Soyad"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
                />
                <input
                  type="email"
                  placeholder="E-posta"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
                />
                <input
                  type="text"
                  placeholder="Konu"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
                />
                <textarea
                  placeholder="Mesajınız"
                  rows={5}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
                />
                <button className="btn-primary">Mesaj Gönder</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}