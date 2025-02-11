"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

interface CartItem {
  product: {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
  price: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const query = `
          *[_type == "cartItem"]{
            product->{
              title,
              description,
              price,
              "imageUrl": image.asset->url
            },
            quantity,
            price
          }
        `;
        const data: CartItem[] = await client.fetch(query);
        setCartItems(data || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="w-full max-w-[1400px] justify-center items-center">
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-6">Bag</h1>
        {cartItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center gap-4">
              <Image
                src={item.product?.imageUrl ?? "/fallback-image.jpg"}
                alt={item.product?.title ?? "No Image"}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.product.title}</h2>
                <p className="text-gray-600">{item.product.description}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold">USD ${item.product.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>USD ${calculateTotal()}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Total</span>
          <span>USD ${calculateTotal()}</span>
        </div>
        <Link href="/contact">
          <button className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600">
            Checkout
          </button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Cart;
