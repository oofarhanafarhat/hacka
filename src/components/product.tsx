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
    <div className="w-full max-w-[1400px]">
      <div className="w-full max-w-[1400px] justify center items-center px-4 lg:px-0">
        <div className="font-bold px-6 py-4 text-4xl">
          <h1 className="mt-6 text-center lg:text-start">All Products</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 justify-center items-center" >
          {data?.map((item: any, index: number) => (
            <div
              key={index}
              className="w-[312px] flex flex-col items-center lg:items-start bg-gray-100 p-4 rounded-lg shadow-md"
            >
              {item.image && (
                <div className="w-full h-[200px] flex   items-center lg:items-start justify-center overflow-hidden rounded-lg">
                  <Image
                    src={urlFor(item.image)?.url() || "/placeholder.png"}
                    alt="product Image"
                    width={312}
                    height={200}
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="w-full flex items-center lg:items-start justify-between mt-4 px-2">
                <h1 className="text-lg font-bold">{item.title}</h1>
                <Image
                  src="/cart1.png" 
                 alt="cart"
                  width={15}
                  height={15}
                  className="ml-2"
                />
              </div>

              <p className="text-xl font-semibold mt-1 px-2 text-center lg:text-center ">${item.price}</p>

              <Link href={"/cart.png"}>
                <button className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                  {item.button}
                </button>
              </Link>
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
