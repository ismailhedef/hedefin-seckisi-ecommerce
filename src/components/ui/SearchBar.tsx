type SearchBarProps = {
  placeholder?: string;
  defaultValue?: string;
  name?: string;
};

export default function SearchBar({
  placeholder = "Ara...",
  defaultValue = "",
  name = "q",
}: SearchBarProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#d8d1c4] bg-white px-5 py-4 outline-none transition focus:border-[#2f6b3b]"
      />
    </div>
  );
}