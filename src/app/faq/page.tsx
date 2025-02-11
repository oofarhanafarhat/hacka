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
    async function fetchFaqs() {
      try {
        const data = await client.fetch(`*[_type == "faq"]`);
        setFaqs(data);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFaqs();
  }, []);

  return (
    <div className=" w-full max-w-[1400px] justify-center items-center">
    <div className=" max-w-6xl mx-auto  p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Questions? Look Here
      </h1>
      <p className="text-gray-500 mb-10 text-center">
        Lorem ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : faqs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="font-semibold text-xl mb-2">{faq.question}</h2>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No FAQs available.</p>
      )}
    </div>
    </div>
  );
}
