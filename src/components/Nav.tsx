"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full max-w-[1400px] ">
      <div className="w-full lg:w-[1400px] bg-[#272343] text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-sm">Free shipping on all orders over $50</h1>
          <div className="space-x-4 text-sm">
            <span>Faqs</span>
            <span>Need Help</span>
          </div>
        </div>
      </div>

    
      <div className="w-full bg-[#F0F2F3]">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
          
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" width={27} height={24} alt="Logo" />
            <span className="font-semibold text-xl text-[#000000]">Comforty</span>
          </div>

    
          <div className="hidden md:block">
           <Link href={"/cart"}> <Image src="/cot.png" width={120} height={44} alt="Cart" /></Link>
          </div>
        </div>
      </div>

      
      <div className="bg-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
        
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

        
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:flex items-center space-x-8`}
          >
            <Link
              href="/"
              className="text-gray-800 hover:text-blue-900 transition duration-300 hover:shadow-lg hover:border-b border-gray-900"
            >
              Home
            </Link>
            <Link
              href="/pro"
              className="text-gray-800 hover:text-blue-900 transition duration-300 hover:shadow-lg hover:border-b border-gray-900"
            >
              Shop
            </Link>
            <Link
              href="/shop"
              className="text-gray-800 hover:text-blue-900 transition duration-300 hover:shadow-lg hover:border-b border-gray-900"
            >
              Product
            </Link>
            <Link
              href="/faq"
              className="text-gray-800 hover:text-blue-900 transition duration-300 hover:shadow-lg hover:border-b border-gray-900"
            >
              Pages
            </Link>
            <Link
              href="/about"
              className="text-gray-800 hover:text-blue-900 transition duration-300 hover:shadow-lg hover:border-b border-gray-900"
            >
              About
            </Link>
          </div>

        
        </div>
      </div>
    </nav>
  );
}
