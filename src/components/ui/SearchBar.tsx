type SearchBarProps = {
  placeholder?: string;
};

export default function SearchBar({
  placeholder = "Ürün, kategori veya içerik ara...",
}: SearchBarProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#d8d1c4] bg-white px-5 py-4 outline-none transition focus:border-[#2f6b3b]"
      />
    </div>
  );
}