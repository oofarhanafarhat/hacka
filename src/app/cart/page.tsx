"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  title: string;
  imageUrl: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();

      // ✅ Debug and handle structure
      console.log("Cart data:", data);

      // Check if data is an array or wrapped inside { data: [...] }
      if (Array.isArray(data)) {
        setCartItems(data);
      } else if (Array.isArray(data.data)) {
        setCartItems(data.data);
        console.log(" Cart items:", cartItems);

      } else {
        console.warn("Unexpected response format:", data);
        setCartItems([]);
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
      setCartItems([]);
    } finally {
      setLoading(false); // ✅ Always stop loading!
    }
  };

  fetchCart();
}, []);



  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

  if (loading) {
    return <div className="text-center py-10">Loading your cart...</div>;
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4">
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Bag</h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 mb-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.imageUrl || "/fallback-image.jpg"}
                    alt={item.title}
                    width={96}
                    height={96}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold">
                    USD ${Number(item.price) * item.quantity}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border p-6 rounded-lg shadow h-fit">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>USD ${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>USD ${calculateTotal().toFixed(2)}</span>
            </div>
            <Link href="/checkout">
              <button className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600 transition">
                Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
