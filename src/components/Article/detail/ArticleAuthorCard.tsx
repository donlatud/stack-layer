import heroImage from "../../../assets/hero-image.png";

/**
 * การ์ดผู้เขียนในหน้ารายละเอียดบทความ: รูป, ชื่อ, บทย่อ
 */
const ArticleAuthorCard = () => {
  return (
    <div className="w-full flex flex-col gap-[16px]">
      <div className="flex items-start gap-[16px]">
        <img
          src={heroImage}
          alt="Thompson P. (author)"
          className="w-[44px] h-[44px] rounded-full object-cover shrink-0"
        />

        {/* Author Info */}
        <div className="flex flex-col gap-[4px]">
          <span className="text-body-3 text-brown-400">Author</span>
          <h3 className="text-headline-4 text-brown-500 font-semibold">
            Thompson P.
          </h3>
        </div>
      </div>

      {/* Separator Line */}
      <div className="h-px bg-brown-300" />

      {/* Author Biography Section */}
      <div className="flex flex-col gap-[24px]">
        <p className="text-body-1 text-brown-400">
          I am a pet enthusiast and freelance writer who specializes in animal
          behavior and care. With a deep love for cats, I enjoy sharing
          insights on feline companionship and wellness.
        </p>
        <p className="text-body-1 text-brown-400">
          When I'm not writing, I spend time volunteering at my local animal
          shelter, helping cats find loving homes.
        </p>
      </div>
    </div>
  );
};

export default ArticleAuthorCard;
