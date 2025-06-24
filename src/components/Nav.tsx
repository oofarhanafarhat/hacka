"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/components/context/cartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart(); // ✅ use CartContext

  return (
    <nav className="w-full bg-white shadow-sm dark:bg-gray-900">
      {/* Top bar */}
      <div className="bg-[#272343] text-white text-sm py-2 px-4">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <span>Free shipping on all orders over $50</span>
          <div className="space-x-4">
            <span className="hover:underline cursor-pointer">FAQs</span>
            <span className="hover:underline cursor-pointer">Need Help</span>
          </div>
        </div>
      </div>

      {/* Middle Logo + Cart */}
      <div className="bg-[#F0F2F3]">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center py-4 px-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" width={27} height={24} alt="Logo" />
            <span className="text-xl font-semibold text-black">Comforty</span>
          </div>

          {/* Desktop cart icon */}
          <Link href="/cart" className="relative hidden md:block">
            <FiShoppingCart className="text-black text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Main nav links */}
      <div className="bg-white border-t dark:bg-gray-800">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center py-4 px-4">
          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-white focus:outline-none"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation Links */}
<div className={`${isOpen ? "flex flex-col space-y-4" : "hidden"} md:flex md:flex-row md:items-center md:space-x-8`}>

            <Link href="/" className="nav-link">Home</Link>
            <Link href="/pro" className="nav-link">Shop</Link>
            <Link href="/shop" className="nav-link">Product</Link>
            <Link href="/faq" className="nav-link">Pages</Link>
            <Link href="/about" className="nav-link">About</Link>

            {/* Mobile Cart Icon */}
            <Link href="/cart" className="relative md:hidden">
              <FiShoppingCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
