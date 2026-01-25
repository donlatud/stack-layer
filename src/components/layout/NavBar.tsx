import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hhLogo from "../../assets/hh-logo.svg";
import hamburgerMenu from "../../assets/hamburger-bar.svg";
import WhiteButton from "../common/WhiteButton";
import BlackButton from "../common/BlackButton";
import { cn } from "@/lib/utils";

/**
 * แถบนำทางสำหรับผู้ใช้ที่ยังไม่ล็อกอิน
 * Logo, เมนูแฮมเบอร์เกอร์ (มือถือ), ปุ่ม Log in / Sign up (เดสก์ท็อป)
 * เมื่อ scroll ลงจะมี shadow; เมนูมือถือกดนอกหรือกด ESC จะปิด
 */
const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (isMenuOpen && !t.closest(".mobile-menu") && !t.closest(".hamburger-button")) {
        setIsMenuOpen(false);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", onOutside);
      document.addEventListener("keydown", onEscape);
    }
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div
        className={cn(
          "sticky top-0 z-50 w-full h-[48px] border-b border-brown-300 flex justify-between items-center pt-[12px] pr-[24px] pb-[12px] pl-[24px] bg-brown-100 backdrop-blur-sm transition-shadow duration-300 md:h-[56px] md:pt-[13px] md:pr-[40px] md:pb-[13px] md:pl-[40px] lg:h-[80px] lg:pt-[14px] lg:pr-[80px] lg:pb-[14px] lg:pl-[80px] xl:h-[80px] xl:pt-[16px] xl:pr-[120px] xl:pb-[16px] xl:pl-[120px]",
          isScrolled && "shadow-md shadow-brown-300/20"
        )}
      >
        <img
          className="w-[24px] h-[24px] lg:w-[36px] lg:h-[36px] xl:w-[44px] xl:h-[44px] cursor-pointer transition-all duration-300 hover:opacity-80 hover:scale-110 active:scale-95"
          src={hhLogo}
          alt="hh logo"
          onClick={() => navigate("/")}
        />
        <button
          type="button"
          className="hamburger-button w-[24px] h-[24px] lg:hidden cursor-pointer transition-opacity hover:opacity-70 active:opacity-50 p-0 border-0 bg-transparent"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Open menu"
        >
          <img src={hamburgerMenu} alt="" className="block w-full h-full" />
        </button>
        {/* Desktop: Log in, Sign up */}
        <div className="hidden lg:flex lg:gap-[8px] lg:w-[276px] lg:h-[48px]">
          <WhiteButton onClick={() => navigate("/login")}>Log in</WhiteButton>
          <BlackButton onClick={() => navigate("/signup")}>Sign up</BlackButton>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-brown-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "mobile-menu fixed top-[48px] left-0 right-0 z-40 bg-brown-100 border-b border-brown-300 shadow-lg shadow-brown-300/30 lg:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-[16px] px-[24px] py-[24px]">
          <div className="flex flex-col gap-[12px]">
            <WhiteButton
              className="w-full"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/login");
              }}
            >
              Log in
            </WhiteButton>
            <BlackButton
              className="w-full"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/signup");
              }}
            >
              Sign up
            </BlackButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

