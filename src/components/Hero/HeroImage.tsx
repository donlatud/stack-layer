import heroImage from "../../assets/hero-image.png";

const HeroImage = () => {
  return (
    <div>
      <img
        className="w-[343px] h-[470px] rounded-[16px] object-cover lg:w-[386px] lg:h-[529px]"
        src={heroImage}
        alt="hero image"
      />
    </div>
  );
};

export default HeroImage;
