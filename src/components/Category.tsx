import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const categoryContent = async () => {
  const res = await client.fetch(`*[_type == "category"]`);
  return res;
};

export default async function Category() {
  const categories = await categoryContent();

  return (
    <section className="w-full py-12 bg-white dark:bg-gray-900">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center lg:text-left text-gray-800 dark:text-white">
            Top Categories
          </h2>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.map((item: any, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all p-6"
            >
              {item.image && (
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.heading || "Category Image"}
                  width={400}
                  height={400}
                  className="rounded-lg object-cover w-full h-[300px]"
                />
              )}
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {item.heading}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-md mt-1">
                  {item.subheading}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
