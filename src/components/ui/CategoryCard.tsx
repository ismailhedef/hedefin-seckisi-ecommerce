type CategoryCardProps = {
  title: string;
  description?: string | null;
  image?: string | null;
};

export default function CategoryCard({
  title,
  description,
  image,
}: CategoryCardProps) {
  const safeImage = image?.trim() ? image : null;

  return (
    <div className="card">
      {safeImage ? (
        <img src={safeImage} alt={title} className="h-64 w-full object-cover" />
      ) : (
        <div className="flex h-64 w-full items-center justify-center bg-gray-100 text-gray-400">
          Görsel yok
        </div>
      )}

      <div className="p-6">
        <h3 className="text-2xl font-semibold text-[#1f4d2b]">{title}</h3>
        <p className="mt-3 text-gray-600">
          {description?.trim() ? description : "Açıklama bulunmuyor."}
        </p>
        <button className="mt-5 text-sm font-semibold text-[#2f6b3b]">
          Kategoriyi İncele →
        </button>
      </div>
    </div>
  );
}