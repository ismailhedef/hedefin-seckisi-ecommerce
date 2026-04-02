import {
  addToCart,
  decreaseCartItem,
  removeFromCart,
} from "@/app/actions/userActions";

export default function CartActionButtons({ productId }: { productId: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <form
        action={async () => {
          "use server";
          await decreaseCartItem(productId);
        }}
      >
        <button
          type="submit"
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm"
        >
          -
        </button>
      </form>

      <form
        action={async () => {
          "use server";
          await addToCart(productId);
        }}
      >
        <button
          type="submit"
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm"
        >
          +
        </button>
      </form>

      <form
        action={async () => {
          "use server";
          await removeFromCart(productId);
        }}
      >
        <button
          type="submit"
          className="rounded-xl border border-red-300 px-4 py-2 text-sm text-red-600"
        >
          Kaldır
        </button>
      </form>
    </div>
  );
}