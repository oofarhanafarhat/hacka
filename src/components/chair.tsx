"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Chair {
  _id: string;
  image: {
    asset: {
      url: string;
    };
  };
}

export default function Chair() {
  const [chairs, setChairs] = useState<Chair[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(`*[_type == "chair"]{
        _id,
        image{
          asset->{
            url
          }
        }
      }`);
      setChairs(data);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-[1400px] ">
    <section className="flex mt-8  w-full lg:w-[1300px] justify-center items-center" >
    
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-4">
        {chairs.map((chair, index) => (
          <div
            key={chair._id}
            className={`rounded-lg shadow-md ${
              index === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <Image
              src={chair.image.asset.url}
              alt="Chair"
              width={index === 0 ? 500 : 300}
              height={index === 0 ? 500 : 300} 
              className="rounded-md object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}