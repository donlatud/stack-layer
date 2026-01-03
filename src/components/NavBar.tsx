import hhLogo from "../assets/hh-logo.svg";
import hamburgerMenu from "../assets/hamburger-bar.svg";
import WhiteButton from "./common/WhiteButton";
import BlackButton from "./common/BlackButton";

const NavBar = () => {
  return (
    <div className="w-full h-[48px] border-b border-brown-300 flex justify-between items-center pt-[12px] pr-[24px] pb-[12px] pl-[24px] bg-brown-100 lg:h-[80px] lg:pt-[16px] lg:pr-[120px] lg:pb-[16px] lg:pl-[120px]">
      <img
        className="w-[24px] h-[24px] lg:w-[44px] lg:h-[44px] cursor-pointer transition-all duration-300 hover:opacity-80 hover:scale-110 active:scale-95"
        src={hhLogo}
        alt="hh logo"
      />
      <img
        className="w-[24px] h-[24px] lg:hidden cursor-pointer transition-opacity hover:opacity-70 active:opacity-50"
        src={hamburgerMenu}
        alt="hamburger bar"
      />
      <div className="hidden lg:flex lg:gap-[8px] lg:w-[276px] lg:h-[48px]">
        <WhiteButton children="Log in" />
        <BlackButton children="Sign up" />
      </div>
    </div>
  );
};

export default NavBar;
