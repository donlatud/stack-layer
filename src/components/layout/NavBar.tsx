import { useState, useEffect } from "react";
import hhLogo from "../../assets/hh-logo.svg";
import hamburgerMenu from "../../assets/hamburger-bar.svg";
import WhiteButton from "../common/WhiteButton";
import BlackButton from "../common/BlackButton";

/**
 * NavBar component - Sticky navigation bar
 * Adds shadow effect when page is scrolled
 * Shows logo, hamburger menu (mobile), and login/signup buttons (desktop)
 * Mobile menu slides down when hamburger is clicked
 */
const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Listens to scroll events to determine if page is scrolled
   * Updates isScrolled state to add shadow effect
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Closes mobile menu when clicking outside or pressing ESC
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div
        className={`sticky top-0 z-50 w-full h-[48px] border-b border-brown-300 flex justify-between items-center pt-[12px] pr-[24px] pb-[12px] pl-[24px] bg-brown-100 backdrop-blur-sm transition-shadow duration-300 md:h-[56px] md:pt-[13px] md:pr-[40px] md:pb-[13px] md:pl-[40px] lg:h-[64px] lg:pt-[14px] lg:pr-[80px] lg:pb-[14px] lg:pl-[80px] xl:h-[80px] xl:pt-[16px] xl:pr-[120px] xl:pb-[16px] xl:pl-[120px] ${
          isScrolled ? "shadow-md shadow-brown-300/20" : ""
        }`}
      >
        <img
          className="w-[24px] h-[24px] lg:w-[36px] lg:h-[36px] xl:w-[44px] xl:h-[44px] cursor-pointer transition-all duration-300 hover:opacity-80 hover:scale-110 active:scale-95"
          src={hhLogo}
          alt="hh logo"
        />
        <img
          className="hamburger-button w-[24px] h-[24px] lg:hidden cursor-pointer transition-opacity hover:opacity-70 active:opacity-50"
          src={hamburgerMenu}
          alt="hamburger bar"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-[8px] lg:w-[276px] lg:h-[48px]">
          <WhiteButton children="Log in" />
          <BlackButton children="Sign up" />
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-brown-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`mobile-menu fixed top-[48px] left-0 right-0 z-40 bg-brown-100 border-b border-brown-300 shadow-lg shadow-brown-300/30 lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-[16px] px-[24px] py-[24px]">
          <div className="flex flex-col gap-[12px]">
            <WhiteButton
              children="Log in"
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            />
            <BlackButton
              children="Sign up"
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

