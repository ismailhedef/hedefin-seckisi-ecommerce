import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import BlogCommentForm from "@/components/user/BlogCommentForm";
import { auth } from "@/auth";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: {
      slug,
    },
  });

  if (!post) {
    return {
      title: "Yazı Bulunamadı",
      description: "Aradığınız blog yazısı bulunamadı.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const session = await auth();

  const post = await prisma.blogPost.findUnique({
    where: {
      slug,
    },
    include: {
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!post) {
    return (
      <main className="py-16">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-red-600">Yazı bulunamadı.</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="py-16">
      <div className="container-custom grid gap-10 lg:grid-cols-[1fr_320px]">
        <article className="max-w-4xl">
          <img
            src={post.image || ""}
            alt={post.title}
            className="h-[420px] w-full rounded-[32px] object-cover"
          />

          <p className="mt-8 text-sm font-medium text-[#2f6b3b]">Blog Yazısı</p>
          <h1 className="mt-2 text-4xl font-bold text-[#1f4d2b]">{post.title}</h1>

          <div className="mt-8 space-y-6 leading-8 text-gray-700">
            <p>{post.content}</p>
          </div>

          <div className="mt-10">
            <Link href="/blog" className="btn-outline">
              Tüm Yazılara Dön
            </Link>
          </div>

          {/* Yorumlar Listesi */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-[#1f4d2b]">Yorumlar</h2>

            {post.comments.length > 0 ? (
              <div className="mt-6 space-y-4">
                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-2xl bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#1f4d2b]">
                        {comment.user?.name ?? "Anonim"}
                      </span>
                      <span className="text-sm text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-gray-600">
                Henüz yorum yapılmamış. İlk yorumu siz yapın!
              </p>
            )}
          </section>

          {/* Yorum Formu */}
          <div className="mt-10">
            {session?.user ? (
              <BlogCommentForm blogPostId={post.id} />
            ) : (
              <p className="mt-8 text-gray-600">
                Yorum yapabilmek için{" "}
                <Link href="/giris" className="font-semibold text-[#2f6b3b]">
                  giriş yapın
                </Link>
                .
              </p>
            )}
          </div>
        </article>

        <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#1f4d2b]">Hızlı Erişim</h2>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/urunler"
              className="rounded-xl bg-[#eef5ec] px-4 py-3 text-[#1f4d2b]"
            >
              Ürünlere Git
            </Link>
            <Link
              href="/kategoriler"
              className="rounded-xl bg-[#eef5ec] px-4 py-3 text-[#1f4d2b]"
            >
              Kategorilere Git
            </Link>
            <Link
              href="/iletisim"
              className="rounded-xl bg-[#eef5ec] px-4 py-3 text-[#1f4d2b]"
            >
              İletişime Geç
            </Link>
          </div>

          <div className="mt-8 rounded-3xl bg-[#1f4d2b] p-5 text-white">
            <h3 className="text-xl font-semibold">WhatsApp Destek</h3>
            <p className="mt-3 text-sm text-white/80">
              Ürünler hakkında hızlı bilgi ve sipariş için bize yazın.
            </p>
            <a
              href="https://wa.me/905551112233?text=Merhaba,%20ürünleriniz%20hakkında%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1f4d2b]"
            >
              WhatsApp ile Yaz
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}