import HeroSection from "@/components/home/hero-section";
import DemoSection from "@/components/home/demo-section";
import HowItWorkSection from "@/components/home/how-it-work-section";
import PricingSection from "@/components/home/pricing-section";
import CallToActionSection from "@/components/home/cta-section";
import BgGradient from "@/components/common/bg-gradient";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
      </div>
      <DemoSection />
      <HowItWorkSection />
      <PricingSection />
      <CallToActionSection />
    </div>
  );
}
