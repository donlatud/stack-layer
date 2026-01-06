import heroImage from "../../assets/hero-image.png";

/**
 * HeroImage component - Hero section image
 * Displays hero image with hover scale effect
 */
const HeroImage = () => {
  return (
    <div className="w-full max-w-[343px] lg:max-w-[386px] overflow-hidden rounded-[16px] group cursor-pointer">
      <img
        className="w-full h-[470px] rounded-[16px] object-cover lg:h-[529px] transition-transform duration-500 group-hover:scale-110"
        src={heroImage}
        alt="hero image"
      />
    </div>
  );
};

export default HeroImage;
