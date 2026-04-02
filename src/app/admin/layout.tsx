"use server";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/giris");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[#f7f3ea]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <AdminSidebar />

        <div className="p-6 lg:p-10">
          <AdminTopbar />
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </main>
  );
}