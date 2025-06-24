"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { useCart } from "@/components/context/cartContext";

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
  const { refreshCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res: ProductItem[] = await client.fetch(
          `*[_type == "product"] | order(_createdAt desc)`
        );
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
        refreshCart();
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
      <h1 className="text-4xl font-bold text-center lg:text-start mb-10">
        All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="rounded-xl bg-white shadow-md hover:shadow-lg transition-transform duration-300 p-4 flex flex-col"
          >
            {/* Image */}
            <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden">
              {item.image && (
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.title || "Product Image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              )}
            </div>

            {/* Title and Icon */}
            <div className="mt-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h2>
              <FiShoppingCart className="text-xl text-gray-600" />
            </div>

            {/* Price */}
            <p className="text-xl font-bold text-gray-900 mt-1">
              ${item.price}
            </p>

            {/* Button */}
            <Link href="/cart" className="mt-auto">
              <button
                onClick={() => handleAddToCart(item)}
                disabled={loadingId === item._id}
                className={`w-full mt-4 py-2 rounded-lg border-2 text-sm font-semibold transition duration-200 ease-in-out transform 
                ${
                  loadingId === item._id
                    ? "bg-blue-300 border-blue-300 cursor-not-allowed"
                    : "bg-gray-900 text-white border-gray-900 hover:bg-white hover:text-gray-900"
                } hover:scale-105 active:scale-95`}
              >
                {loadingId === item._id ? "Adding..." : item.button || "Add to Cart"}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
