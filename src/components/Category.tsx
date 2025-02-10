import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const categoryContent = async () => {
  const res = await client.fetch(`*[_type == "category"]`);
  return res;
};

export default async function Category() {
  const features = await categoryContent();

  return (
    <div className="w-full max-w-[1400px]">
    <div className="w-full max-w-[1300px] mx-auto px-4 lg:px-0">
     

      <div className="font-bold px-6 py-4  text-4xl ">
        <h1 className="mt-6 text-center lg:text-start">Top categories</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 ">
        {features?.map((item: any, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center justify-around bg-gray-100 p-6 rounded-lg shadow-md w-full"
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
              <h1 className="text-lg font-bold">{item.heading}</h1>
              <p className="text-2xl font-light">{item.subheading}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
