import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Logos from "@/components/landing/Logos";
import Services from "@/components/landing/Services";
import Statistics from "@/components/landing/Statistics";
import Pricing from "@/components/landing/Pricing";
import Testimonial from "@/components/landing/Testimonial";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#070a13] text-slate-100 overflow-x-hidden antialiased">
      <Header />
      <main className="grow">
        <Hero />
        <Logos />
        <Services />
        <Statistics />
        <Pricing />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
