import linkedinLogo from "../../assets/linkedin-logo.png";
import githubLogo from "../../assets/github-logo.png";
import googleIcon from "../../assets/google-logo.svg";

/**
 * Footer component - Site footer with social links and navigation
 * Displays "Get in touch" text, social media icons (LinkedIn, GitHub, Google)
 * Includes "Home page" button
 */
const Footer = () => {
  return (
    <div className="w-full pt-[40px] pr-[16px] pb-[40px] pl-[16px] bg-brown-200 flex flex-col items-center justify-center gap-[24px] lg:pt-[50px] lg:pr-[80px] lg:pb-[50px] lg:pl-[80px] lg:flex-row lg:items-center lg:justify-between xl:pt-[60px] xl:pr-[120px] xl:pb-[60px] xl:pl-[120px]">
      <div className="w-[226px] h-[24px] flex items-center justify-center gap-[24px] lg:w-[226px] lg:h-[24px]">
        <div className="w-[98px] h-[24px] text-body-1 text-brown-500 lg:w-[98px] lg:h-[24px] transition-all duration-300 hover:text-brown-600 cursor-default">
          Get in touch
        </div>
        <div className="w-[104px] h-[24px] flex items-center justify-center gap-[16px] lg:w-[104px] lg:h-[24px] ">
          <img
            src={linkedinLogo}
            alt="linkedin icon"
            className="w-[24px] h-[24px] cursor-pointer transition-all duration-300 hover:scale-125 active:scale-100 hover:opacity-90"
          />
          <img
            src={githubLogo}
            alt="github icon"
            className="w-[24px] h-[24px] cursor-pointer transition-all duration-300 hover:scale-125 active:scale-100 hover:opacity-90"
          />
          <img
            src={googleIcon}
            alt="google icon"
            className="w-[24px] h-[24px] cursor-pointer transition-all duration-300 hover:scale-125 active:scale-100 hover:opacity-90"
          />
        </div>
      </div>
      <button className="w-[95px] h-[24px] rounded-[5px] text-body-1 text-brown-600 underline lg:w-[95px] lg:h-[24px] cursor-pointer transition-all duration-300 hover:text-brown-700 hover:scale-110 hover:font-semibold hover:underline-offset-4 active:scale-100">
        Home page
      </button>
    </div>
  );
};

export default Footer;
