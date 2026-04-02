import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function updateAdminPassword() {
  // Komut satırından şifre al, yoksa default 123456
  const newPassword = process.argv[2] || "123456";

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const user = await prisma.user.update({
    where: { email: "admin@example.com" },
    data: { password: hashedPassword },
  });

  console.log(`✅ Admin şifresi güncellendi!`);
  console.log(`📧 Email: ${user.email}`);
  console.log(`🔐 Yeni şifre: ${newPassword}`);
}

updateAdminPassword()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Hata:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
