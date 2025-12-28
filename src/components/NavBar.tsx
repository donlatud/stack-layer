import hhLogo from "../assets/hh-logo.svg";
import hamburgerMenu from "../assets/hamburger-bar.svg";

const NavBar = () => {
  return (
    <div className="w-full h-[48px] border-b border-brown-300 flex justify-between items-center pt-[12px] pr-[24px] pb-[12px] pl-[24px] bg-brown-100 lg:w-[1440px] lg:h-[80px] lg:pt-[16px] lg:pr-[120px] lg:pb-[16px] lg:pl-[120px]">
      <img
        className="w-[24px] h-[24px] lg:w-[44px] lg:h-[44px]"
        src={hhLogo}
        alt="hh logo"
      />
      <img
        className="w-[24px] h-[24px] lg:hidden"
        src={hamburgerMenu}
        alt="hamburger bar"
      />
      <div className="hidden lg:flex lg:gap-[8px] lg:w-[276px] lg:h-[48px]">
        <button className="w-[127px] h-[48px] rounded-[999px] border border-brown-400 bg-white text-brown-600 text-body-1 font-medium pt-[12px] pr-[40px] pb-[12px] pl-[40px]">
          Log in
        </button>
        <button className="w-[141px] h-[48px] rounded-[999px] bg-brown-600 text-white text-body-1 font-medium pt-[12px] pr-[40px] pb-[12px] pl-[40px]">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default NavBar;