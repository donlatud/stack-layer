import {HeroContent} from "./Hero/HeroContent";
import HeroImage from "./Hero/HeroImage";
import AuthorCard from "./Hero/AuthorCard";

/**
 * HeroSection component - Hero section of the landing page
 * Displays hero content, image, and author card
 * Responsive layout: stacked on mobile, row on desktop
 */
const HeroSection = () => {
  return (
    <section className="w-full pt-[40px] pr-[16px] pb-[40px] pl-[16px] md:pt-[50px] md:pr-[40px] md:pb-[50px] md:pl-[40px] lg:pt-[50px] lg:pr-[80px] lg:pb-[50px] lg:pl-[80px] xl:pt-[60px] xl:pr-[100px] xl:pb-[60px] xl:pl-[100px] 2xl:pr-[120px] 2xl:pl-[120px]">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-[40px] items-center md:items-center md:gap-[48px] lg:gap-[54px] lg:flex-row lg:items-center xl:gap-[60px] 2xl:gap-[60px]">
        <HeroContent />
        <HeroImage />
        <AuthorCard />
      </div>
    </section>
  );
};

export default HeroSection;
