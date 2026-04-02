export default function SiteLoading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-[#ddebdd] border-t-[#2f6b3b]" />
        <p className="mt-4 text-lg font-medium text-[#1f4d2b]">Yükleniyor...</p>
      </div>
    </main>
  );
}