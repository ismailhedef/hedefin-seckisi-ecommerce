import { createBlogComment } from "@/app/actions/userActions";

export default function BlogCommentForm({ blogPostId }: { blogPostId: string }) {
  return (
    <form action={createBlogComment} className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
      <input type="hidden" name="blogPostId" value={blogPostId} />

      <h3 className="text-xl font-semibold text-[#1f4d2b]">Yorum Yap</h3>

      <textarea
        name="content"
        rows={4}
        className="mt-4 w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
        placeholder="Bu yazı hakkındaki düşüncenizi yazın"
      />

      <button type="submit" className="btn-primary mt-5">
        Yorumu Gönder
      </button>
    </form>
  );
}