export default function AdminTopbar() {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-[#1f4d2b]">Yönetim Paneli</h2>
        <p className="mt-1 text-sm text-gray-600">
          Ürün, kategori ve blog içeriklerinizi buradan yönetin.
        </p>
      </div>

      <div className="rounded-full bg-[#eef5ec] px-4 py-2 text-sm font-medium text-[#1f4d2b]">
        Admin
      </div>
    </div>
  );
}