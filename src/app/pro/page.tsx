"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

interface ProductItem {
  _id: string;
  title: string;
  price: number;
  image: any;
  button?: string;
}

const Product = () => {
  const [data, setData] = useState<ProductItem[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res: ProductItem[] = await client.fetch(`*[_type == "product"] | order(_createdAt desc)`);
        setData(res);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

const handleAddToCart = async (item: ProductItem) => {
  setLoadingId(item._id);
  try {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: item._id,
        price: item.price,
        quantity: 1,
        title: item.title, // ✅ Add title
        imageUrl: urlFor(item.image).url(), // ✅ Add image URL
      }),
    });

    if (res.ok) {
      router.push("/cart");
    } else {
      console.error("Add to cart failed");
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
  } finally {
    setLoadingId(null);
  }
};


  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center lg:text-start mb-10">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col"
          >
            <div className="w-full h-[200px] rounded-lg overflow-hidden flex justify-center items-center bg-gray-100">
              <Image
                src={urlFor(item.image)?.url() || "/placeholder.png"}
                alt={item.title}
                width={312}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="mt-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <Image src="/cart1.png" alt="Cart" width={20} height={20} />
            </div>

            <p className="text-xl font-bold mt-1 text-gray-800">${item.price}</p>

            <button
              onClick={() => handleAddToCart(item)}
              disabled={loadingId === item._id}
              className={`w-full mt-4 py-2 ${
                loadingId === item._id
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded transition`}
            >
              {loadingId === item._id ? "Adding..." : item.button || "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
