import type { Metadata } from "next";
import Link from "next/link";
import ProductGallery from "@/components/ui/ProductGallery";
import ReviewCard from "@/components/ui/ReviewCard";
import ProductReviewForm from "@/components/user/ProductReviewForm";
import { prisma } from "@/lib/prisma";
import { addToCart } from "@/app/actions/userActions";
import { auth } from "@/auth";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  if (!product) {
    return {
      title: "Ürün Bulunamadı",
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const session = await auth();

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      images: true,
      reviews: {
        include: {
          user: true,
        },
      },
      category: true,
    },
  });

  if (!product) {
    return (
      <main className="py-16">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-red-600">Ürün bulunamadı.</h1>
        </div>
      </main>
    );
  }

  const galleryImages =
    product.images.length > 0
      ? product.images.map((img) => img.url)
      : product.image?.trim()
      ? [product.image]
      : [];

  return (
    <main className="py-16">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={galleryImages} title={product.title} />

          <div>
            <p className="text-sm font-medium text-[#2f6b3b]">
              Kategori: {product.category?.name ?? "Kategorisiz"}
            </p>

            <h1 className="mt-2 text-4xl font-bold text-[#1f4d2b]">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-3xl font-bold text-[#2f6b3b]">
                {product.price} TL
              </span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {product.oldPrice} TL
                </span>
              )}
            </div>

            <p className="mt-6 leading-8 text-gray-700">{product.description}</p>

            <div className="mt-8 rounded-3xl bg-[#eef5ec] p-6">
              <h2 className="text-2xl font-semibold text-[#1f4d2b]">
                Ürün Bilgileri
              </h2>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>• Stok Durumu: {product.stock} adet</li>
                <li>• Kategori: {product.category?.name ?? "Kategorisiz"}</li>
                <li>• Doğal içerikli özel ürün</li>
                <li>• Güvenli paketleme</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/905551112233?text=Merhaba,%20${product.title}%20ürününü%20sipariş%20etmek%20istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                WhatsApp ile Sipariş Ver
              </a>

              <form
                action={async () => {
                  "use server";
                  await addToCart(product.id);
                }}
              >
                <button type="submit" className="btn-outline">
                  Sepete Ekle
                </button>
              </form>

              <Link href="/urunler" className="btn-outline">
                Tüm Ürünlere Dön
              </Link>
            </div>
          </div>
        </div>

        {/* Müşteri Yorumları */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-[#1f4d2b]">
            Müşteri Yorumları
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  name={review.user?.name ?? "Anonim"}
                  comment={review.comment}
                  rating={review.rating}
                />
              ))
            ) : (
              <p className="text-gray-600">
                Bu ürün için henüz yorum yapılmamış.
              </p>
            )}
          </div>

          {/* Yorum Formu */}
          <div className="mt-10">
            {session?.user ? (
              <ProductReviewForm productId={product.id} />
            ) : (
              <p className="text-gray-600">
                Yorum yapabilmek için{" "}
                <Link href="/giris" className="font-semibold text-[#2f6b3b]">
                  giriş yapın
                </Link>
                .
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}