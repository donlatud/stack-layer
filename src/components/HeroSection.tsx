import Herocontent from "./Hero/Herocontent";
import HeroImage from "./Hero/HeroImage";
import AuthorCard from "./Hero/AuthorCard";

const HeroSection = () => {
  return (
    <section className="w-[375px] h-[1098px] pt-[40px] pr-[16px] pb-[40px] pl-[16px] lg:w-[1440px] lg:h-[2927px] lg:pt-[60px] lg:pr-[120px] lg:pb-[60px] lg:pl-[120px]">
      <div className="w-full h-full flex flex-col gap-[40px] lg:w-[1200px] lg:h-[529px] lg:gap-[60px] lg:flex-row lg:items-center lg:justify-between">
        <Herocontent />
        <HeroImage />
        <AuthorCard />
      </div>
    </section>
  );
};

export default HeroSection;
