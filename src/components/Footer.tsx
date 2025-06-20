import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
          
          {/* Logo + Description */}
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start items-center space-x-2">
              <Image src="/logo.png" width={27} height={24} alt="Comforty Logo" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">Comforty</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Comfortable furniture for modern living. Crafted with care and design in mind.
            </p>
            <div className="flex justify-center md:justify-start">
              <Image
                src="/links.png"
                width={206}
                height={40}
                alt="Social Media Links"
              />
            </div>
          </div>

          {/* Category Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Category</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>Sofa</li>
              <li>Armchair</li>
              <li>Wing Chair</li>
              <li>Desk Chair</li>
              <li>Wooden Chair</li>
              <li>Park Bench</li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Support</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>Help & Support</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>FAQs</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Newsletter</h4>
            <form className="flex flex-col sm:flex-row sm:items-center gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-[#029FAE] hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
              >
                Subscribe
              </button>
                    </form>
                  </div>
                </div>
              </div>
            </footer>
  )
}