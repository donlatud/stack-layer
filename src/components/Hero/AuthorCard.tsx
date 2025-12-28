const AuthorCard = () => {
  return (
    <div className="w-[343px] h-[284px] flex flex-col gap-[12px] lg:w-[347px] lg:h-[284px] lg:gap-[12px] lg:items-start lg:justify-center">
      <div className="w-[343px] h-[56px] flex flex-col gap-[4px] lg:w-full lg:h-auto">
        <div className="w-[48px] h-[20px] text-body-3 font-medium text-brown-400 text-center lg:text-left">
          -Author
        </div>
        <div className="w-[343px] h-[32px] text-headline-3 text-brown-500 lg:w-full lg:h-[32px] lg:text-left">
          Thompson P.
        </div>
      </div>
      <div className="w-[343px] h-[216px] text-body-1 text-brown-400 flex flex-col gap-[12px] lg:w-full lg:h-[216px] lg:gap-[24px]">
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
