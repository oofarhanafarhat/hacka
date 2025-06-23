"use client";
import { useEffect } from "react";
import { useCart } from "@/components/context/cartContext";

export default function SuccessPage() {
  const { refreshCart } = useCart();

  useEffect(() => {
    const clearAndRefresh = async () => {
      // Clear all cart items from DB
      await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clearAll: true }), // custom logic
      });

      refreshCart(); // ✅ This updates cartCount in Nav
    };

    clearAndRefresh();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600">Payment Successful ✅</h1>
        <p className="mt-2 text-gray-600">Thank you for your purchase!</p>
      </div>
    </div>
  );
}
