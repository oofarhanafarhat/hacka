import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

// ✅ Fetch hero content from Sanity
const getHeroContent = async () => {
  const res = await client.fetch(`*[_type=="hero"]`);
  return res;
};

export default async function HeroSection() {
  const hero = await getHeroContent();

  if (!hero || hero.length === 0) return null;

  const item = hero[0]; // ✅ Show first item only

  return (
    <section
      aria-labelledby="hero-heading"
      className="w-full bg-[#F0F2F3] py-12 md:py-20"
    >
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* ✅ Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 id="hero-heading" className="text-lg font-light text-gray-700">
            {item.heading}
          </h1>
          <p className="text-4xl md:text-5xl font-bold text-gray-900">
            {item.subheading}
          </p>
          <Link
            href="#"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-all duration-300"
          >
            {item.buttonText}
          </Link>
        </div>

        {/* ✅ Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          {item.backgroundImage && (
            <Image
              src={urlFor(item.backgroundImage).url()}
              alt={item.heading || "Hero Image"}
              width={500}
              height={400}
              className="rounded-lg shadow-lg object-cover max-w-full h-auto"
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
}
