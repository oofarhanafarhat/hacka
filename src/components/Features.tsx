import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const featureContent = async () => {
  const res = await client.fetch(`*[_type == "featur"]`);
  return res;
};

export default async function FeatureSection() {
  const features = await featureContent();

  return (
    <div className="w-full max-w-[1400px]">
    <div className="w-full max-w-[1300px] mx-auto px-4 lg:px-0">
      <div className="w-full flex justify-center">
        <Image src="/c1.png" width={1300} height={139} alt="Company Logo" />
      </div>

      <div className="font-bold px-6 py-4  text-4xl ">
        <h1 className="mt-6 text-center lg:text-start">Featured Products</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 ">
        {features?.map((item: any, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-full"
          >
            
            {item.image && (
              <Image
                src={urlFor(item.image).url()}
                alt="Feature Image"
                width={300}
                height={300}
                className="object-cover rounded-lg"
              />
            )}

        
            <div className="text-center mt-4">
              <h1 className="text-lg font-light">{item.heading}</h1>
              <p className="text-2xl font-bold">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
