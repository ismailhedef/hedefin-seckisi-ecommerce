type ReviewCardProps = {
  name: string;
  comment: string;
  rating: number;
};

export default function ReviewCard({
  name,
  comment,
  rating,
}: ReviewCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-[#eee7db]">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#1f4d2b]">{name}</h3>
        <span className="text-sm text-[#a67c52]">{"★".repeat(rating)}</span>
      </div>
      <p className="mt-4 text-gray-600">{comment}</p>
    </div>
  );
}