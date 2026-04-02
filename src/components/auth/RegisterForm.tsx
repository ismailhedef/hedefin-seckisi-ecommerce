import { registerUser } from "@/app/actions/authActions";

export default function RegisterForm() {
  return (
    <form action={registerUser} className="mt-6 space-y-4">
      <input
        name="name"
        type="text"
        placeholder="Ad Soyad"
        className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
      />
      <input
        name="email"
        type="email"
        placeholder="E-posta"
        className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
      />
      <input
        name="password"
        type="password"
        placeholder="Şifre"
        className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2f6b3b]"
      />

      <button className="btn-primary w-full">Kayıt Ol</button>
    </form>
  );
}