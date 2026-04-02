import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "YeşilÇarşı",
    template: "%s | YeşilÇarşı",
  },
  description: "Doğal ürünler, blog içerikleri ve modern e-ticaret deneyimi",
  openGraph: {
    title: "YeşilÇarşı",
    description: "Doğal ürünler ve blog platformu",
    url: "https://siteadresiniz.com",
    siteName: "YeşilÇarşı",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}