import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ChatInterface from "@/components/ChatInterface";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";

export default function Home() {
  return (
    <>
      <ScrollAnimator />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ChatInterface />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
