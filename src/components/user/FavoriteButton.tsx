import { addToFavorites } from "@/app/actions/userActions";

export default function FavoriteButton({ productId }: { productId: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await addToFavorites(productId);
      }}
    >
      <button
        type="submit"
        className="rounded-full border border-[#a67c52] px-4 py-3 text-sm text-[#a67c52] hover:bg-[#f6efe7]"
      >
        Favorilere Ekle
      </button>
    </form>
  );
}