/**
 * การ์ดผู้เขียนใน Hero: ชื่อ Thompson P. และบทย่อ
 */
const AuthorCard = () => {
  return (
    <div className="w-full max-w-[343px] flex flex-col gap-[12px] md:max-w-[480px] md:gap-[16px] lg:max-w-[340px] lg:h-[280px] lg:gap-[12px] lg:items-start lg:justify-center xl:max-w-[347px] xl:h-[284px] 2xl:max-w-[347px] 2xl:h-[284px]">
      <div className="w-full flex flex-col gap-[4px] lg:h-auto">
        <div className="w-[48px] text-body-3 font-medium text-brown-400 text-center lg:text-left">
          -Author
        </div>
        <div className="w-full text-headline-3 text-brown-500 lg:h-[32px] lg:text-left">
          Thompson P.
        </div>
      </div>
      <div className="w-full text-body-1 text-brown-400 flex flex-col gap-[12px] lg:h-[216px] lg:gap-[24px] xl:h-[216px] xl:gap-[24px] 2xl:h-[216px] 2xl:gap-[24px]">
        <p>
          I am a pet enthusiast and freelance writer who specializes in animal
          behavior and care. With a deep love for cats, I enjoy sharing insights
          on feline companionship and wellness.
        </p>
        <p>
          When I'm not writing, I spend time volunteering at my local animal
          shelter, helping cats find loving homes.
        </p>
      </div>
    </div>
  );
};

export default AuthorCard;
