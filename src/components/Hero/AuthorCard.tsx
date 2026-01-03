const AuthorCard = () => {
  return (
    <div className="w-full max-w-[343px] flex flex-col gap-[12px] lg:max-w-[347px] lg:h-[284px] lg:gap-[12px] lg:items-start lg:justify-center">
      <div className="w-full flex flex-col gap-[4px] lg:h-auto">
        <div className="w-[48px] text-body-3 font-medium text-brown-400 text-center lg:text-left">
          -Author
        </div>
        <div className="w-full text-headline-3 text-brown-500 lg:h-[32px] lg:text-left">
          Thompson P.
        </div>
      </div>
      <div className="w-full text-body-1 text-brown-400 flex flex-col gap-[12px] lg:h-[216px] lg:gap-[24px]">
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
