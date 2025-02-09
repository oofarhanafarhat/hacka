import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <section className="lg:flex justify-center items-center gap-4">
        <Image src="/text.png" width={672} height={470} alt="text" priority />
       
        <div className="flex justify-center items-center">
          <Image
            src="/f1.png"
            width={600}
            height={420}
            alt="Chair"
            className="rounded-lg w-full lg:w-[476px]"
            priority
          />
        </div>
      </section>

      <section className="text-center my-10">
        <h3 className="text-4xl font-bold mb-6">What Makes Our Brand Different</h3>
        <Image src="/g1.png" width={1300} height={244} alt="group" priority />
      </section>

      <section className="my-10">
        <h3 className="text-2xl font-bold mb-6 text-center lg:text-start">Our Popular Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: "The Popular Seaside Sofa", image: "/f3.png" },
            { name: "The Brandy Chair", image: "/f4.png" },
            { name: "The Candy Chair", image: "/f2.png" },
          ].map((product, index) => (
            <div key={index} className="rounded-lg shadow-lg overflow-hidden">
            
              <Image
                src={product.image}
                alt={product.name}
                width={500} 
                height={300} 
                className="w-full h-auto"
              />
              <div className="p-4 bg-gray-50">
                <h4 className="text-lg font-bold text-center">{product.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
