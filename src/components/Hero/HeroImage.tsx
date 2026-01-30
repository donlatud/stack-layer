import heroImage from "../../assets/hero-image.png";

/**
 * รูปภาพใน Hero; โฮเวอร์จะซูมเล็กน้อย
 */
const HeroImage = () => {
  return (
    <div className="w-full max-w-[343px] md:max-w-[480px] lg:max-w-[380px] xl:max-w-[386px] 2xl:max-w-[386px] overflow-hidden rounded-[16px] group cursor-pointer">
      <img
        className="w-full h-[470px] rounded-[16px] object-cover md:h-[500px] lg:h-[520px] xl:h-[529px] 2xl:h-[529px] transition-transform duration-500 group-hover:scale-110"
        src={heroImage}
        alt="Hero section illustration"
      />
    </div>
  );
};

export default HeroImage;
