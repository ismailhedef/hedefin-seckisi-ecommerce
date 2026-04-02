import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthSessionProvider from "@/components/providers/SessionProvider";
import ToastProvider from "@/components/providers/ToastProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthSessionProvider>
      <ToastProvider />
      <Header />
      {children}
      <Footer />
      <a
        href="https://wa.me/905551112233?text=Merhaba,%20sipariş%20vermek%20istiyorum."
        target="_blank"
        className="fixed bottom-5 right-5 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg hover:scale-105 transition"
      >
        WhatsApp Sipariş
      </a>
    </AuthSessionProvider>
  );
}