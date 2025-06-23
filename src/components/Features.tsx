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
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Optional Top Banner */}
        <div className="flex justify-center mb-10">
          <Image
            src="/c1.png"
            width={1300}
            height={139}
            alt="Featured Products Banner"
            className="rounded-md shadow-md w-full max-w-5xl h-auto"
          />
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Featured Products
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features?.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {item.image && (
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.heading || `Product ${index + 1}`}
                  width={300}
                  height={300}
                  className="rounded-lg object-cover w-full h-auto"
                />
              )}
              <div className="text-center mt-4 space-y-1">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  {item.heading}
                </h3>
                <p className="text-xl font-bold text-gray-200">
                  Rs. {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
