import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Fleet from "@/components/Fleet";
import LuxurySection from "@/components/LuxurySection";
import Services from "@/components/Services";
import Destinations from "@/components/Destinations";
import BookFlight from "@/components/BookFlight";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Fleet />
      <LuxurySection />
      <Services />
      <Destinations />
      <BookFlight />
      <Footer />
    </main>
  );
}
