"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Subscribed successfully!");
        setEmail("");
      } else {
        setMessage(data.message || "❌ Subscription failed.");
      }
    } catch (error) {
      setMessage("❌ Network error, please try again.");
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto">
    <div className="max-w-md mx-auto mt-10 bg-gray-100 p-6 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold">Subscribe to Our Newsletter</h2>
      <p className="text-gray-600 text-sm mt-2">Stay updated with our latest products & offers.</p>
      
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Subscribe
        </button>
      </form>

      {message && <p className="mt-2 text-gray-700">{message}</p>}
    </div>
    </div>
  );
}