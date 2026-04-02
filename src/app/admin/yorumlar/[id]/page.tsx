import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { deleteComment, deleteReview } from "@/app/actions/adminUpdateActions";
import { prisma } from "@/lib/prisma";

export default async function AdminCommentsPage() {
  const reviews = await prisma.review.findMany({
    include: {
      user: true,
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const comments = await prisma.comment.findMany({
    include: {
      user: true,
      blogPost: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="space-y-12">
      <AdminPageHeader
        title="Yorum Yönetimi"
        description="Ürün yorumları ve blog yorumlarını buradan yönetin."
      />

      <div>
        <h2 className="mb-6 text-2xl font-bold text-[#1f4d2b]">Ürün Yorumları</h2>

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="rounded-3xl bg-white p-6 shadow-sm text-gray-600">
              Ürün yorumu bulunamadı.
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-[#1f4d2b]">{review.user.name}</p>
                    <p className="text-sm text-gray-600">Ürün: {review.product.title}</p>
                    <p className="text-sm text-[#a67c52]">Puan: {review.rating}/5</p>
                  </div>

                  <form action={deleteReview}>
                    <input type="hidden" name="id" value={review.id} />
                    <button
                      type="submit"
                      className="rounded-xl border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sil
                    </button>
                  </form>
                </div>

                <p className="mt-4 text-gray-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold text-[#1f4d2b]">Blog Yorumları</h2>

        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="rounded-3xl bg-white p-6 shadow-sm text-gray-600">
              Blog yorumu bulunamadı.
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-[#1f4d2b]">{comment.user.name}</p>
                    <p className="text-sm text-gray-600">Yazı: {comment.blogPost.title}</p>
                  </div>

                  <form action={deleteComment}>
                    <input type="hidden" name="id" value={comment.id} />
                    <button
                      type="submit"
                      className="rounded-xl border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sil
                    </button>
                  </form>
                </div>

                <p className="mt-4 text-gray-700">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}