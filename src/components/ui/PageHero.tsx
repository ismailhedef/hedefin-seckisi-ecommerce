type PageHeroProps = {
  title: string;
  description: string;
};

export default function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="border-b border-[#e7dfd1] bg-[#eef5ec] py-14">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-[#1f4d2b] md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-gray-700">{description}</p>
      </div>
    </section>
  );
}