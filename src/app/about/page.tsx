import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <Image
          src="/text.png"
          width={672}
          height={470}
          alt="About Comforty brand text"
          priority
          className="w-full max-w-xl"
        />
        <Image
          src="/f1.png"
          width={600}
          height={420}
          alt="Comfortable Chair"
          className="rounded-lg w-full max-w-md"
          priority
        />
      </section>

      {/* Brand Highlight */}
      <section className="text-center my-16">
        <h3 className="text-4xl font-bold mb-6">What Makes Our Brand Different</h3>
        <Image
          src="/g1.png"
          width={1300}
          height={244}
          alt="Core values and uniqueness"
          priority
          className="mx-auto w-full"
        />
      </section>

      {/* Featured Products */}
      <section className="my-16">
        <h3 className="text-3xl font-bold mb-8 text-center lg:text-start">
          Our Popular Products
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "The Popular Seaside Sofa", image: "/f3.png" },
            { name: "The Brandy Chair", image: "/f4.png" },
            { name: "The Candy Chair", image: "/f2.png" },
          ].map((product, index) => (
            <div key={index} className="rounded-lg shadow-lg overflow-hidden bg-white">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={300}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-center">{product.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
