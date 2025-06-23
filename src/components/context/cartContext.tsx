"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
  cartCount: number;
  refreshCart: () => void;
  setCartCount: (count: number) => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCart: () => {},
  setCartCount: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();

      if (Array.isArray(data)) {
        setCartCount(data.length);
      } else if (Array.isArray(data.data)) {
        setCartCount(data.data.length);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("Cart count error:", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();

    const handleCartUpdated = () => {
      fetchCartCount();
    };

    window.addEventListener("cart-updated", handleCartUpdated);
    return () => window.removeEventListener("cart-updated", handleCartUpdated);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart: fetchCartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
