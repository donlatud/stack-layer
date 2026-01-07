/**
 * HeroContent component - Main hero text content
 * Displays hero title and description
 * Responsive layout: centered on mobile, right-aligned on desktop
 */
export const HeroContent = () => {
  return (
    <div className="w-full max-w-[343px] flex flex-col gap-[16px] items-center md:max-w-[480px] md:gap-[20px] lg:max-w-[340px] lg:h-[270px] lg:gap-[24px] lg:items-start xl:max-w-[347px] xl:h-[276px] xl:gap-[24px] 2xl:max-w-[347px] 2xl:h-[276px]">
      <div className="w-full text-headline-2 md:text-headline-1 text-brown-600 text-center lg:hidden">
        Stay Informed, Stay Inspired
      </div>
      <div className="hidden lg:flex lg:flex-col lg:w-full lg:h-[180px] lg:items-end lg:justify-center xl:h-[180px] 2xl:h-[180px]">
        <div className="text-headline-1 text-brown-600 ">Stay</div>
        <div className="text-headline-1 text-brown-600">Informed,</div>
        <div className="lg:text-[45px] lg:w-[110%] lg:font-semibold lg:leading-[60px] xl:text-[52px] xl:font-semibold xl:leading-[60px] 2xl:text-[52px] 2xl:font-semibold 2xl:leading-[60px] xl:w-[95%] 2xl:w-[95%]">
          Stay Inspired
        </div>
      </div>
      <p className="w-full text-body-1 text-brown-400 text-center md:max-w-[480px] md:mx-auto lg:w-full lg:text-right">
        Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
        Inspiration <br />
        and Information.
      </p>
    </div>
  );
};
