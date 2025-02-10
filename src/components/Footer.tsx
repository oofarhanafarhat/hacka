import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-full max-w-[1400px]">
    <footer className="bg-white border-t border-gray-200 py-10">
      <div className="container mx-auto px-6 md:px-12 w-full lg:w-[1400px] lg:px-20">
        <div className="flex flex-wrap justify-around items-start space-y-10 md:space-y-0 text-center md:text-left">
          <div className="w-full md:w-1/4 lg:w-[250px] space-y-4">
            <div className="flex justify-center md:justify-start items-center space-y-4">
              <Image src={"/logo.png"} width={27} height={24} alt="logo.png" />
              <span className="text-lg font-bold text-gray-800">Comforty</span>
            </div>
            <p className="text-gray-600 text-sm">
              Vivamus tristique odio sit amet velit semper, eu posuere turpis
              interdum. Cras egestas purus.
            </p>
            <div className="flex justify-center md:justify-start">
              <Image
                src={"/links.png"}
                width={206}
                height={40}
                alt="links.png"
              />
            </div>
          </div>

          <div className="w-full md:w-1/4 lg:w-[105px] space-y-4">
            <h4 className="text-lg font-bold text-gray-300">Category</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Sofa</li>
              <li>Armchair</li>
              <li>Wing Chair</li>
              <li>Desk Chair</li>
              <li>Wooden Chair</li>
              <li>Park Bench</li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 lg:w-[156px] space-y-4">
            <h4 className="text-lg font-bold text-gray-300">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Help & Support</li>
              <li>Teams & Conditions</li>
              <li>Privacy Policy</li>
              <li>Help</li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 lg:w-[424px] space-y-4">
            <h4 className="text-lg font-bold text-gray-300">Newsletter</h4>
            <form className="lg:flex  items-center md:items-start space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 pb-2 pt-3 mt-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-[#029FAE] text-white px-4 py-2  rounded-md hover:bg-blue-600 transition "
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim.</p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2021 - iBlogy - Designed & Developed by Zeplin. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
}
