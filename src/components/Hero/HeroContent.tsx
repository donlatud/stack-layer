const Herocontent = () => {
  return (
    <div className="w-[343px] h-[184px] flex flex-col gap-[16px] items-center lg:w-[347px] lg:h-[276px] lg:gap-[24px]">
      <div className="w-[343px] h-[96px] text-headline-2 text-brown-600 text-center lg:hidden">
        Stay Informed, Stay Inspired
      </div>
      <div className="hidden lg:flex lg:flex-col lg:w-[347px] lg:h-[180px] lg:items-end lg:justify-center">
        <div className="text-headline-1 text-brown-600">Stay</div>
        <div className="text-headline-1 text-brown-600">Informed,</div>
        <div className="text-headline-1 text-brown-600">Stay Inspired</div>
      </div>
      <p className="w-[343px] h-[72px] text-body-1 text-brown-400 text-center lg:w-[347px] lg:h-[72px] lg:text-right">
        Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
        Inspiration <br />and Information.
      </p>
    </div>
  );
};

export default Herocontent;
