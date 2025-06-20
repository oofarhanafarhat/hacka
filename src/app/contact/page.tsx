"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ContactData {
  address: string;
  phone: string;
  workingTime: string;
}

export default function Contact() {
  const [contactData, setContactData] = useState<ContactData | null>(null);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contact data");
        return res.json();
      })
      .then((data) => setContactData(data))
      .catch((error) => console.error("Error fetching contact data:", error));
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto bg-gray-100 flex flex-col items-center p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Get in Touch With Us
        </h2>
        <p className="text-gray-600 mb-8">
          For information about our services, feel free to contact us!
        </p>
      </div>

      <div className="flex flex-wrap justify-center w-full max-w-6xl gap-8">
        {/* Contact Info Card */}
        <div className="bg-white rounded-lg p-8 w-[400px] shadow">
          {/* Address */}
          <div className="mb-6">
            <div className="flex items-center gap-3 justify-center">
              <Image src="/ad.png" width={24} height={24} alt="Address Icon" />
              <h3 className="text-lg font-semibold">Address</h3>
            </div>
            <p className="text-gray-700 mt-2 text-center">
              {contactData?.address || `236 5th SE Avenue, New York NY10000, United States`}
            </p>
          </div>

          {/* Phone */}
          <div className="mb-6">
            <div className="flex items-center gap-3 justify-center">
              <Image src="/ph.png" width={24} height={24} alt="Phone Icon" />
              <h3 className="text-lg font-semibold">Phone</h3>
            </div>
            <p className="text-gray-700 mt-2 text-center">
              {contactData?.phone || `Mobile: +(84) 546-6789 • Hotline: +(84) 456-6789`}
            </p>
          </div>

          {/* Working Time */}
          <div>
            <div className="flex items-center gap-3 justify-center">
              <Image src="/time.png" width={24} height={24} alt="Working Time Icon" />
              <h3 className="text-lg font-semibold">Working Hours</h3>
            </div>
            <p className="text-gray-700 mt-2 text-center">
              {contactData?.workingTime || `Mon-Fri: 9:00 - 22:00 • Sat-Sun: 9:00 - 21:00`}
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg p-8 w-[620px] shadow">
          <form className="grid gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-teal-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-teal-500"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-teal-500"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-teal-500"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Feature image */}
      <div className="mt-20">
        <Image src="/fe1.png" width={1300} height={80} alt="Feature Image" />
      </div>
    </div>
  );
}
