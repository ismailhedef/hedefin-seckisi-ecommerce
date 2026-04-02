import { createProductReview } from "@/app/actions/userActions";

export default function ProductReviewForm({ productId }: { productId: string }) {
  return (
    <form action={createProductReview} className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
      <input type="hidden" name="productId" value={productId} />

      <h3 className="text-xl font-semibold text-[#1f4d2b]">Yorum Yap</h3>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
          Puan
        </label>
        <select
          name="rating"
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
        >
          <option value="">Puan seçin</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium text-[#1f4d2b]">
          Yorum
        </label>
        <textarea
          name="comment"
          rows={4}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
          placeholder="Ürün hakkındaki görüşünüzü yazın"
        />
      </div>

      <button type="submit" className="btn-primary mt-5">
        Yorumu Gönder
      </button>
    </form>
  );
}