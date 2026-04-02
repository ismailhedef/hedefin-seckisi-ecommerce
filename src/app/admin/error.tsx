"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f3ea]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Admin panelinde hata oluştu</h1>
        <p className="mt-4 text-gray-600">{error.message}</p>

        <button onClick={() => reset()} className="btn-primary mt-8">
          Tekrar Dene
        </button>
      </div>
    </main>
  );
}