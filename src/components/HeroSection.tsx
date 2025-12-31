import HeroContent from "./Hero/HeroContent";
import HeroImage from "./Hero/HeroImage";
import AuthorCard from "./Hero/AuthorCard";
import LatestArticles from "./ArticleSection/LatestArticles";

const HeroSection = () => {
  return (
    <section className="w-[375px] h-[1098px] pt-[40px] pr-[16px] pb-[40px] pl-[16px] lg:w-[1440px] lg:h-[2927px] lg:pt-[60px] lg:pr-[120px] lg:pb-[60px] lg:pl-[120px] lg:flex lg:flex-col lg:gap-[80px]">
      <div className="w-full h-full flex flex-col gap-[40px] lg:w-[1200px] lg:h-[529px] lg:gap-[60px] lg:flex-row lg:items-center lg:justify-between">
        <HeroContent />
        <HeroImage />
        <AuthorCard />
      </div>
      <LatestArticles />
    </section>
  );
};

export default HeroSection;
