import Link from "next/link";

export default function AdminNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f3ea]">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-[#1f4d2b]">404</h1>
        <p className="mt-4 text-gray-600">Admin sayfası bulunamadı.</p>
        <Link href="/admin" className="btn-primary mt-6">
          Dashboard'a Dön
        </Link>
      </div>
    </main>
  );
}