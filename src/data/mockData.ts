export type Category = {
  title: string;
  slug: string;
  description: string;
  image: string;
};

export type Product = {
  title: string;
  slug: string;
  price: string;
  oldPrice: string;
  image: string;
  images: string[];
  description: string;
  advantages: string[];
};

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  content: string;
};

export const categories: Category[] = [
  {
    title: "Doğal Sabunlar",
    slug: "dogal-sabunlar",
    description: "Bitkisel içerikli el yapımı sabun çeşitleri",
    image:
      "https://images.unsplash.com/photo-1607006483225-3c6b2b8e3c51?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Organik Yağlar",
    slug: "organik-yaglar",
    description: "Saf ve doğal bakım yağları",
    image:
      "https://images.unsplash.com/photo-1615485291234-9fbc1c3f4df8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Doğal Kozmetik",
    slug: "dogal-kozmetik",
    description: "Cildinize dost doğal bakım ürünleri",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
  },
];

export const products: Product[] = [
  {
    title: "Zeytinyağlı Doğal Sabun",
    slug: "zeytinyagli-dogal-sabun",
    price: "189 TL",
    oldPrice: "229 TL",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607006483225-3c6b2b8e3c51?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Cildi nazikçe temizleyen, doğal zeytinyağı içeriğiyle besleyici bakım sunan özel sabun.",
    advantages: [
      "Doğal içerik",
      "El yapımı üretim",
      "Cilt dostu formül",
      "Günlük kullanıma uygun",
    ],
  },
  {
    title: "Lavanta Özlü Bakım Yağı",
    slug: "lavanta-ozlu-bakim-yagi",
    price: "249 TL",
    oldPrice: "299 TL",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Rahatlatıcı lavanta özüyle zenginleştirilmiş, saç ve cilt bakımında kullanılabilen doğal yağ.",
    advantages: [
      "Rahatlatıcı etki",
      "Doğal esans",
      "Cilt ve saç için uygun",
      "Yoğun bakım desteği",
    ],
  },
  {
    title: "Doğal Kil Maskesi",
    slug: "dogal-kil-maskesi",
    price: "159 TL",
    oldPrice: "199 TL",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570194065650-d99fb4d8a4a9?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Gözenek temizleyici, ferahlatıcı ve doğal mineraller içeren bakım maskesi.",
    advantages: [
      "Gözenek arındırma",
      "Doğal mineral desteği",
      "Yağ dengesi",
      "Kolay uygulama",
    ],
  },
  {
    title: "Bitkisel Saç Bakım Serumu",
    slug: "bitkisel-sac-bakim-serumu",
    price: "279 TL",
    oldPrice: "329 TL",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Saç tellerine bakım yapan, bitkisel özlerle güçlendirilmiş doğal serum.",
    advantages: [
      "Bitkisel formül",
      "Saçlara parlaklık",
      "Kolay kullanım",
      "Yoğun bakım",
    ],
  },
];
export const blogPosts: BlogPost[] = [
  {
    title: "Doğal Cilt Bakımında Dikkat Edilmesi Gerekenler",
    slug: "dogal-cilt-bakiminda-dikkat-edilmesi-gerekenler",
    excerpt:
      "Cildiniz için doğru doğal ürünleri seçerken bilmeniz gereken temel noktalar.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    content:
      "Doğal cilt bakım ürünleri seçerken içerik listesini dikkatli okumak, cilt tipinize uygun ürünler tercih etmek ve düzenli kullanım alışkanlığı edinmek oldukça önemlidir.",
  },
  {
    title: "Bitkisel Yağların Günlük Hayattaki Kullanımı",
    slug: "bitkisel-yaglarin-gunluk-hayattaki-kullanimi",
    excerpt:
      "Lavanta, argan ve çörek otu gibi doğal yağların faydalarını keşfedin.",
    image:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1200&auto=format&fit=crop",
    content:
      "Bitkisel yağlar; bakım, rahatlama ve günlük yaşam kalitesini artırma amacıyla birçok farklı alanda kullanılabilir.",
  },
  {
    title: "Organik Ürün Tercih Etmenin Avantajları",
    slug: "organik-urun-tercih-etmenin-avantajlari",
    excerpt:
      "Doğal içerikli ürünler neden daha güvenli ve sürdürülebilir bir seçimdir?",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    content:
      "Organik ürünler çevre dostu üretim süreçleri ve daha temiz içerik yapıları nedeniyle kullanıcılar tarafından sıklıkla tercih edilir.",
  },
];