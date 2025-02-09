"use client";
import Image from "next/image";
export default function Instagram() {
  return (
    <div className="w-full max-w-[1400px] mx-auto">
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold">Follow us on Instagram</h2>
      <p className="text-gray-600 text-sm mt-2">Check out our latest updates!</p>
      <div className="flex items-center justify-center gap-4 mt-4">
        <Image src="/f1.png" width={100} height={100} alt="Instagram Post 1" className="w-24 h-24 rounded-md object-cover" />
        <Image src="/t1.png" width={100} height={100} alt="Instagram Post 2" className="w-24 h-24 rounded-md object-cover" />
        <Image  src="/f2.png"  width={100} height={100}alt="Instagram Post 3" className="w-24 h-24 rounded-md object-cover" />
        <Image src="/t1.png" width={100} height={100} alt="Instagram Post 2" className="w-24 h-24 rounded-md object-cover" />
        <Image  src="/f2.png"  width={100} height={100}alt="Instagram Post 3" className="w-24 h-24 rounded-md object-cover" />
      </div>
    </div>
    </div>
  );
}