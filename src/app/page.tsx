import FeatureSection from "@/components/Features"
import HeroSection from "@/components/Hero";
import Category from "@/components/Category";
import Product from "@/components/product";
import Chair from "@/components/chair"



export default function Home() {
  return (
   <div className="w-full max-w-[1400px]">
    <HeroSection/>
    <FeatureSection/>
    <Category/>
    <Chair/>
    <Product showExtras={false} />
    
    
   </div>
  );
}
