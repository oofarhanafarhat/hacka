"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { useCart } from "@/components/context/cartContext"; // ✅ Import this

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
  const { refreshCart } = useCart(); // ✅ Hook here


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
          title: item.title,
          imageUrl: urlFor(item.image).url(),
        }),
      });

      if (res.ok) {
        refreshCart(); // ✅ Update the Navbar cart count
        // router.push("/cart"); ← Optional — if you want to stay on page, REMOVE this
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {data.map((item) => (
          <div
            key={item._id}
            className=" rounded-lg shadow hover:shadow-md transition p-4 flex flex-col bg-gray-100 hover:translate-y-5"
          >
            <div className="relative w-full h-48 sm:h-65 md:h-75 lg:h-80 rounded-lg overflow-hidden bg-gray-100">
              {item.image ? (
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>


            <div className="mt-4 flex justify-between items-center">
              <h2 className="text-md font-semibold text-gray-800 ">{item.title}</h2>


              <FiShoppingCart className="w[20px] text-gray-800" />
            </div>

            <p className="text-xl font-bold mt-1 text-gray-800">${item.price}</p>

            <Link href={"/cart"}> <button
              onClick={() => handleAddToCart(item)}
              disabled={loadingId === item._id}
              className={`w-full mt-4 py-2 ${loadingId === item._id
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-gray-400 hover:bg-gray-800"
                }"inline-block bg-gray-100 px-6 py-3 border-2 border-gray-500 text-gray-950 font-semibold rounded-lg transition duration-200 ease-in-out transform hover:bg-gray-800 hover:text-gray-50 hover:scale-105 active:scale-95ne-block "
`}
            >
              {loadingId === item._id ? "Adding..." : item.button || "Add to Cart"}
            </button></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
