export default function AdminLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f3ea]">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-[#ddebdd] border-t-[#2f6b3b]" />
        <p className="mt-4 text-lg font-medium text-[#1f4d2b]">
          Yönetim paneli yükleniyor...
        </p>
      </div>
    </main>
  );
}