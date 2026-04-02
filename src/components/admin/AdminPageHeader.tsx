type AdminPageHeaderProps = {
  title: string;
  description: string;
};

export default function AdminPageHeader({
  title,
  description,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-[#1f4d2b]">{title}</h1>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}