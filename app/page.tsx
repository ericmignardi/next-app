import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ProductShot from "@/components/landing/ProductShot";
import Logos from "@/components/landing/Logos";
import Pricing from "@/components/landing/Pricing";
import Services from "@/components/landing/Services";
import Statistics from "@/components/landing/Statistics";
import Testimonial from "@/components/landing/Testimonial";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="grow">
        <Hero />
        <ProductShot />
        <Logos />
        <Services />
        <Statistics />
        <Testimonial />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
