"use client"; 

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Newsletter from "@/components/Newsletter";
import Instagram from "@/components/instagram";

const Product = ({ showExtras }: { showExtras?: boolean }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await client.fetch(`*[_type == "product"]`);
      setData(res);
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full max-w-[1400px] ">
      <div className="w-full max-w-[1300px] mx-auto px-4 lg:px-0">
        <div className="font-bold px-6 py-4 text-4xl">
          <h1 className="mt-6 text-center lg:text-start">All Products</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {data?.map((item: any, index: number) => (
            <div key={index} className="flex flex-col items-center justify-around bg-gray-100 p-6 rounded-lg shadow-md">
              {item.image && (
                <Image
                  src={urlFor(item.image)?.url() || "/placeholder.png"}
                  alt="product Image"
                  width={300}
                  height={300}
                  className="object-cover rounded-lg"
                />
              )}
              <div className="text-center mt-4">
                <h1 className="text-lg font-bold">{item.title}</h1>
                <p className="text-2xl font-light">${item.price}</p>
                <Link href="/cart">
                  <button className="px-4 py-2 text-[#000000] hover:text-blue-500 rounded-3xl shadow-lg">
                    {item.button}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        
        {showExtras && <Newsletter />}
        {showExtras && <Instagram />}
      </div>
    </div>
  );
};

export default Product;
