import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/Pricing";
import Services from "@/components/landing/Services";
import Statistics from "@/components/landing/Statistics";
import Testimonial from "@/components/landing/Testimonial";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-24">
      <Header />
      <Hero />
      <Services />
      <Statistics />
      <Testimonial />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
