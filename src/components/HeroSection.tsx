import {HeroContent} from "./Hero/HeroContent";
import HeroImage from "./Hero/HeroImage";
import AuthorCard from "./Hero/AuthorCard";

const HeroSection = () => {
  return (
    <section className="w-full pt-[40px] pr-[16px] pb-[40px] pl-[16px] lg:pt-[60px] lg:pr-[120px] lg:pb-[60px] lg:pl-[120px]">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-[40px] lg:gap-[60px] lg:flex-row lg:items-center lg:justify-between">
        <HeroContent />
        <HeroImage />
        <AuthorCard />
      </div>
    </section>
  );
};

export default HeroSection;
