"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data: FAQItem[] = await client.fetch(`*[_type == "faq"] | order(_createdAt desc)`);
        setFaqs(data);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-10">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Questions? Look Here</h1>
        <p className="text-gray-500 mb-10">
          Find answers to some of the most frequently asked questions.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-teal-600">Loading...</p>
      ) : faqs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="bg-white p-6 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No FAQs available at the moment.</p>
      )}
    </div>
  );
}
