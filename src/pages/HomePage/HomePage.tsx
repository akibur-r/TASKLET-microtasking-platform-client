import HeroSlider from "@/components/homepage/HeroSlider/HeroSlider";
import HowItWorksSection from "@/components/homepage/HowItWorksSection/HowItWorksSection";
import OurPartners from "@/components/homepage/OurPartnersSection/OurPartners";
import TestimonialSection from "@/components/homepage/TestimonialSection/TestimonialSection";
import TopWorkersSection from "@/components/homepage/TopWorkersSection/TopWorkersSection";

const HomePage = () => {
  return (
    <div className="space-y-8">
      <HeroSlider />
      <TopWorkersSection />
      <TestimonialSection />
      <HowItWorksSection />
      <OurPartners />
    </div>
  );
};

export default HomePage;
