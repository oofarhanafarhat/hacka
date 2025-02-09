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
        if (!res.ok) {
          throw new Error("Failed to fetch contact data");
        }
        return res.json();
      })
      .then((data) => setContactData(data))
      .catch((error) => console.error("Error fetching contact data:", error));
  }, []);
  

  return (
    <div className=" w-full max-w-[1400px] mx-auto bg-gray-100 flex flex-col justify-center items-center p-6">
      <div>
<h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Get in Touch With Us</h2>
<p className="text-gray-600 mb-8 text-center">For information about our services, feel free to contact us!</p>
</div>
      <div className="flex flex-wrap justify-center items-start  w-full max-w-6xl">
        
        <div className="bg-gray-100  rounded-lg p-8 w-[400px] text-center mt-8">
          <div className="mb-6">
          <div className="flex justify-center items-center gap-4">  <Image src={"/ad.png"} width={23} height={23} alt="Address Icon" />
            <h1 className="text-[#000000] text-lg font-bold font-poppins mt-2">Address</h1></div>
            <p className="text-[#000000] font-light mt-2">
              236 5th SE Avenue, <br /> New York NY10000, <br /> United States
            </p>
          </div>
          <div className="mb-6">
          <div className="flex justify-center items-center gap-4 ">  <Image src={"/ph.png"} width={23} height={23} alt="Phone Icon"/>
            <h1 className="text-[#000000] text-lg font-bold font-poppins mt-2 pr-8">Phone</h1></div>
            <p className="text-[#000000] font-light mt-2">
              Mobile: +(84) 546-6789 <br /> Hotline: +(84) 456-6789
            </p>
          </div>
          <div>
           <div className="flex justify-center items-cente gap-4"> <Image src={"/time.png"} width={23} height={23} alt="Working Time Icon"/>
            <h1 className="text-[#000000] text-md font-bold font-poppins mt-2">Working Time</h1></div>
            <p className="text-[#000000] font-light mt-2">
              Monday-Friday: 9:00 - 22:00 <br /> Saturday-Sunday: 9:00 - 21:00
            </p>
          </div>
        </div>

    
        <div className="bg-gray-100  rounded-lg p-8 w-[620px]">

          <form className="grid grid-cols-1 gap-4">
            <input type="text" placeholder="Your Name" className="border rounded-md p-3 w-full" />
            <input type="email" placeholder="Your Email" className="border rounded-md p-3 w-full" />
            <input type="text" placeholder="Subject" className="border rounded-md p-3 w-full" />
            <textarea placeholder="Message" rows={4} className="border rounded-md p-3 w-full"></textarea>
            <button type="submit" className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700">Submit</button>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center mt-20">
        <Image src={"/fe1.png"} width={1300} height={80} alt="feature.png" />
      </div>
    </div>
  );
}
