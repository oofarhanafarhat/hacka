"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  title: string;
  imageUrl?: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  fetchCart(); // Initial fetch

  // Listen for cart update event
  const handleCartUpdate = () => {
    fetchCart(); // Refetch when event is triggered
  };

  window.addEventListener("cart-updated", handleCartUpdate);

  return () => {
    window.removeEventListener("cart-updated", handleCartUpdate);
  };
}, []);


  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();

      if (Array.isArray(data)) {
        setCartItems(data);
      } else if (Array.isArray(data.data)) {
        setCartItems(data.data);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        console.error("Failed to remove item");
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

 const handleCheckout = async () => {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartItems),
  });

  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  } else {
    alert("Failed to create checkout session.");
  }
};


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
        {/* Cart Items */}
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
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
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

        {/* Summary Box */}
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

        
             <Link href={`/checkout?total=${calculateTotal().toFixed(2)}`}>
<button
          onClick={() => {
            // TODO: Add Stripe checkout integration here
            // Example: fetch('/api/checkout-session') OR redirect to /checkout page
            alert("Stripe Checkout will be connected here.");
          }}
          className="bg-green-400 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-medium"
        >
          Proceed to Checkout
        </button></Link>  
          </div>
        )}
      </div>
    </div>
  );
}
