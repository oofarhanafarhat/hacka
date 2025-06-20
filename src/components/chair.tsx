"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Chair {
  _id: string;
  image: {
    asset: {
      url: string;
    };
  };
}

export default function Chair() {
  const [chairs, setChairs] = useState<Chair[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(`*[_type == "chair"]{
        _id,
        image{
          asset->{
            url
          }
        }
      }`);
      setChairs(data);
    };

    fetchData();
  }, []);

  return (
    <section className="py-12 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Featured Chairs
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chairs.map((chair, index) => (
            <div
              key={chair._id}
              className={`overflow-hidden rounded-lg shadow-md ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <Image
                src={chair.image.asset.url}
                alt={`Chair ${index + 1}`}
                width={500}
                height={500}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
