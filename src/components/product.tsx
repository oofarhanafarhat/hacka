"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Newsletter from "@/components/Newsletter";
import Instagram from "@/components/instagram";

const Product = ({ showExtras }: { showExtras?: boolean }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await client.fetch(`*[_type == "product"]`);
        setData(res);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-0">
      <div className="py-6">
        <h1 className="text-4xl font-bold text-center lg:text-start">
          All Products
        </h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 py-10">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {data?.map((item, index) => (
            <div
              key={index}
              className=" hover:translate-y-5 w-full flex flex-col items-center lg:items-start bg-gray-100 p-4 rounded-lg shadow-md"
            >
              {item.image && (
                <div className="w-full h-[200px] flex justify-center overflow-hidden rounded-lg">
                  <Image
                    src={urlFor(item.image)?.url() || "/placeholder.png"}
                    alt={item.title || "Product Image"}
                    width={312}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              <div className="w-full flex justify-between items-center mt-4 px-1">
                <h2 className="text-md font-bold text-gray-800">{item.title}</h2>
                <Image
                  src="/cart1.png"
                  alt="Add to cart icon"
                  width={16}
                  height={16}
                />
              </div>

              <p className="text-xl font-semibold mt-1 px-1 text-gray-800">${item.price}</p>

              <Link href="/cart" className="w-full">
                <button className="w-full mt-4 py-2 px-4 bg-gray-500  text-white rounded-md shadow hover:bg-gray-800 transition">
                  {item.button || "Add to Cart"}
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {showExtras && (
        <>
          <Newsletter />
          <Instagram />
        </>
      )}
    </div>
  );
};

export default Product;
