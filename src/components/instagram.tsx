"use client";
import Image from "next/image";

const images = [
  { src: "/f1.png", alt: "Instagram Post 1" },
  { src: "/t1.png", alt: "Instagram Post 2" },
  { src: "/f2.png", alt: "Instagram Post 3" },
  { src: "/t1.png", alt: "Instagram Post 4" },
  { src: "/f2.png", alt: "Instagram Post 5" },
];

export default function Instagram() {
  return (
    <section className="w-full bg-white dark:bg-gray-900 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Follow us on Instagram
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Check out our latest updates!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {images.map((img, index) => (
            <div key={index} className="overflow-hidden rounded-md shadow hover:shadow-lg transition-all">
              <Image
                src={img.src}
                width={100}
                height={100}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
