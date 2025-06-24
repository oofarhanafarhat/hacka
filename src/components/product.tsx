"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Newsletter from "@/components/Newsletter";
import Instagram from "@/components/instagram";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/components/context/cartContext";

interface ProductItem {
  _id: string;
  title: string;
  price: number;
  image: any;
  button?: string;
}

const Product = ({ showExtras }: { showExtras?: boolean }) => {
  const [data, setData] = useState<ProductItem[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { refreshCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res: ProductItem[] = await client.fetch(`*[_type == "product"] | order(_createdAt desc)`);
        setData(res);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
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
        refreshCart(); // ✅ updates Navbar cart count
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
    <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-0">
      <div className="py-6">
        <h1 className="text-4xl font-bold text-center lg:text-start">All Products</h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 py-10">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          {data.map((item) => (
            <div
              key={item._id}
              className="rounded-lg shadow hover:shadow-md transition p-4 flex flex-col bg-gray-100 hover:translate-y-5"
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
                <h2 className="text-md font-semibold text-gray-800">{item.title}</h2>
                <FiShoppingCart className="text-gray-800 text-lg" />
              </div>

              <p className="text-xl font-bold mt-1 text-gray-800">${item.price}</p>

              <button
                onClick={() => handleAddToCart(item)}
                disabled={loadingId === item._id}
                className={`w-full mt-4 py-2 ${
                  loadingId === item._id
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-gray-400 hover:bg-gray-800"
                }"inline-block bg-gray-100 px-6 py-3 border-2 border-gray-500 text-gray-950 font-semibold rounded-lg transition duration-200 ease-in-out transform hover:bg-gray-800 hover:text-gray-50 hover:scale-105 active:scale-95ne-block ">
`}
              >
                {loadingId === item._id ? "Adding..." : item.button || "Add to Cart"}
              </button>
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
