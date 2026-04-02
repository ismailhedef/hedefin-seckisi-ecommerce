"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-full border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
    >
      Çıkış Yap
    </button>
  );
}