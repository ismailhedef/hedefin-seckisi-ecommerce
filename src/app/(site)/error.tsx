"use client";

export default function SiteError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <div className="container-custom text-center">
        <h1 className="text-4xl font-bold text-red-600">Bir hata oluştu</h1>
        <p className="mt-4 text-gray-600">{error.message}</p>

        <button onClick={() => reset()} className="btn-primary mt-8">
          Tekrar Dene
        </button>
      </div>
    </main>
  );
}