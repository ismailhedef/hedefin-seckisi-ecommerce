import { addToCart } from "@/app/actions/userActions";

export default function AddToCartButton({ productId }: { productId: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await addToCart(productId);
      }}
    >
      <button type="submit" className="btn-outline">
        Sepete Ekle
      </button>
    </form>
  );
}