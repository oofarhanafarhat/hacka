import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

const getHeroContent = async () => {
  const res = await client.fetch(`*[_type=="hero"]`);
  return res;
};

export default async function HeroSection() {
  const hero = await getHeroContent();

  return (
    <div className="w-full max-w-[1400px] mx-auto">
    <div className="flex flex-col lg:flex-row items-center justify-around lg:w-[1300px] lg:h-[850px] mx-auto text-[#000000] bg-[#F0F2F3] p-8">
      {hero?.map((item: any, index: any) => (
        <div
          key={index}
          className="flex flex-col gap-4 lg:w-[500px] text-center lg:text-center px-20 "
        >
          <h1 className="text-lg font-light">{item.heading}</h1>
          <p className="text-4xl font-bold">{item.subheading}</p>
          <Link
            href={"#"}
            className="bg-blue-500 px-6 py-3 rounded-md text-white hover:bg-blue-600 self-center lg:self-Center mb-8 sm:mb-6"
          >
            {item.buttonText}
          </Link>
        </div>
      ))}
      {hero?.map((item: any, index: any) => (
        <div key={index} className="lg:w-1/2 flex justify-center">
          {item.backgroundImage && (
            <Image
              src={urlFor(item.backgroundImage).url()}
              alt="Background Image"
              width={500}
              height={300}
              className="object-cover max-w-full"
            />
          )}
        </div>
      ))}

    
    </div>
    </div>
    
  );
}
