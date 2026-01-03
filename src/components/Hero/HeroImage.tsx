import heroImage from "../../assets/hero-image.png";

const HeroImage = () => {
  return (
    <div className="w-full max-w-[343px] lg:max-w-[386px]">
      <img
        className="w-full h-[470px] rounded-[16px] object-cover lg:h-[529px]"
        src={heroImage}
        alt="hero image"
      />
    </div>
  );
};

export default HeroImage;
