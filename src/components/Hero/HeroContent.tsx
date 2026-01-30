/**
 * ข้อความหลักใน Hero: หัวข้อ "Stay Informed, Stay Inspired" และคำอธิบาย
 * มือถือกึ่งกลาง; เดสก์ท็อปจัดขวา
 */
export const HeroContent = () => {
  return (
    <div className="w-full max-w-[343px] flex flex-col gap-[16px] items-center md:max-w-[480px] md:gap-[20px] lg:max-w-[340px] lg:gap-[24px] lg:items-end xl:max-w-[347px] 2xl:max-w-[347px]">
      {/* Mobile/MD: Single line title */}
      <div className="w-full text-headline-2 md:text-headline-1 text-brown-600 text-center lg:hidden">
        Stay Informed, Stay Inspired
      </div>

      {/* LG+: Stacked title with italic "Stay Inspired" */}
      <div className="hidden lg:flex lg:flex-col lg:w-[140%] lg:items-end">
        <span className="text-headline-1 text-brown-600">Stay</span>
        <span className="text-headline-1 text-brown-600">Informed,</span>
        <span className="text-headline-1 text-brown-600 italic">Stay Inspired</span>
      </div>
      {/* <div className="hidden lg:flex lg:flex-col lg:w-full lg:items-end">
        <div className="text-headline-1 text-brown-600 text-right">
          Stay Informed, Stay Inspired
        </div>
      </div> */}

      {/* Description */}
      <p className="w-full text-body-1 text-brown-400 text-center md:max-w-[480px] md:mx-auto lg:w-full lg:text-right">
        Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
        Inspiration and Information.
      </p>
    </div>
  );
};
