// File: app/page.tsx

import FeatureSection from "@/components/Features";
import HeroSection from "@/components/Hero";
import Category from "@/components/Category";
import Chair from "@/components/chair";
import Pro from "@/app/pro/page";

export default function Home() {
  return (
    <main className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
      {/* ✅ Hero Section */}
      <section aria-labelledby="hero">
        <HeroSection />
      </section>

      {/* ✅ Features */}
      <section aria-labelledby="features" className="mt-12">
        <FeatureSection />
      </section>

      {/* ✅ Categories */}
      <section aria-labelledby="category" className="mt-12">
        <Category />
      </section>

      {/* ✅ Chair Showcase */}
      <section aria-labelledby="chair" className="mt-12">
        <Chair />
      </section>

      {/* ✅ Products (no extras) */}
      <section aria-labelledby="products" className="mt-12 mb-16">
        <Pro />
      </section>
    </main>
  );
}
