import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, "dev.db");
const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const soapCategory = await prisma.category.create({
    data: {
      name: "Doğal Sabunlar",
      slug: "dogal-sabunlar",
      description: "Bitkisel içerikli el yapımı sabun çeşitleri",
      image:
        "https://images.unsplash.com/photo-1607006483225-3c6b2b8e3c51?q=80&w=1200&auto=format&fit=crop",
    },
  });

  const oilCategory = await prisma.category.create({
    data: {
      name: "Organik Yağlar",
      slug: "organik-yaglar",
      description: "Saf ve doğal bakım yağları",
      image:
        "https://images.unsplash.com/photo-1615485291234-9fbc1c3f4df8?q=80&w=1200&auto=format&fit=crop",
    },
  });

  const cosmeticCategory = await prisma.category.create({
    data: {
      name: "Doğal Kozmetik",
      slug: "dogal-kozmetik",
      description: "Cildinize dost doğal bakım ürünleri",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    },
  });

  await prisma.product.create({
    data: {
      title: "Zeytinyağlı Doğal Sabun",
      slug: "zeytinyagli-dogal-sabun",
      description:
        "Cildi nazikçe temizleyen, doğal zeytinyağı içeriğiyle besleyici bakım sunan özel sabun.",
      price: 189,
      oldPrice: 229,
      stock: 50,
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop",
      categoryId: soapCategory.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop",
          },
          {
            url: "https://images.unsplash.com/photo-1607006483225-3c6b2b8e3c51?q=80&w=1200&auto=format&fit=crop",
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      title: "Lavanta Özlü Bakım Yağı",
      slug: "lavanta-ozlu-bakim-yagi",
      description:
        "Rahatlatıcı lavanta özüyle zenginleştirilmiş doğal bakım yağı.",
      price: 249,
      oldPrice: 299,
      stock: 30,
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop",
      categoryId: oilCategory.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop",
          },
          {
            url: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1200&auto=format&fit=crop",
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      title: "Doğal Kil Maskesi",
      slug: "dogal-kil-maskesi",
      description:
        "Gözenek temizleyici, doğal mineraller içeren bakım maskesi.",
      price: 159,
      oldPrice: 199,
      stock: 40,
      image:
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1200&auto=format&fit=crop",
      categoryId: cosmeticCategory.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1200&auto=format&fit=crop",
          },
          {
            url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
          },
        ],
      },
    },
  });

  await prisma.blogPost.createMany({
    data: [
      {
        title: "Doğal Cilt Bakımında Dikkat Edilmesi Gerekenler",
        slug: "dogal-cilt-bakiminda-dikkat-edilmesi-gerekenler",
        excerpt:
          "Cildiniz için doğru doğal ürünleri seçerken bilmeniz gereken temel noktalar.",
        content:
          "Doğal cilt bakım ürünleri seçerken içerik listesini dikkatli okumak, cilt tipinize uygun ürünler tercih etmek ve düzenli kullanım alışkanlığı edinmek oldukça önemlidir.",
        image:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Bitkisel Yağların Günlük Hayattaki Kullanımı",
        slug: "bitkisel-yaglarin-gunluk-hayattaki-kullanimi",
        excerpt:
          "Lavanta, argan ve çörek otu gibi doğal yağların faydalarını keşfedin.",
        content:
          "Bitkisel yağlar; bakım, rahatlama ve günlük yaşam kalitesini artırma amacıyla birçok farklı alanda kullanılabilir.",
        image:
          "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Organik Ürün Tercih Etmenin Avantajları",
        slug: "organik-urun-tercih-etmenin-avantajlari",
        excerpt:
          "Doğal içerikli ürünler neden daha güvenli ve sürdürülebilir bir seçimdir?",
        content:
          "Organik ürünler çevre dostu üretim süreçleri ve daha temiz içerik yapıları nedeniyle kullanıcılar tarafından sıklıkla tercih edilir.",
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  });

  const hashedPassword = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      name: "Admin Kullanıcı",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      name: "Test Kullanıcı",
      email: "test@example.com",
      password: hashedPassword,
      role: "USER",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed verileri başarıyla eklendi.");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });