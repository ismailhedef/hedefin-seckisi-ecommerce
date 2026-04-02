import Link from "next/link";

type ProductCardProps = {
  title: string;
  slug: string;
  price: string;
  oldPrice: string;
  image: string;
};

export default function ProductCard({
  title,
  slug,
  price,
  oldPrice,
  image,
}: ProductCardProps) {
  return (
    <div className="card">
      <img src={image} alt={title} className="h-64 w-full object-cover" />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-[#1f4d2b]">{title}</h3>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xl font-bold text-[#2f6b3b]">{price}</span>
          <span className="text-sm text-gray-400 line-through">{oldPrice}</span>
        </div>

        <div className="mt-5 flex gap-2">
          <Link
            href={`/urunler/${slug}`}
            className="flex-1 rounded-full bg-[#2f6b3b] px-4 py-2 text-center text-sm text-white hover:bg-[#1f4d2b]"
          >
            İncele
          </Link>
          <a
            href={`https://wa.me/905551112233?text=Merhaba,%20${title}%20ürünü%20hakkında%20bilgi%20almak%20istiyorum.`}
            target="_blank"
            className="flex-1 rounded-full border border-[#2f6b3b] px-4 py-2 text-center text-sm text-[#2f6b3b] hover:bg-[#ddebdd]"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}