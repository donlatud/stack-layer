import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import hhLogo from "../../assets/hh-logo.svg";
import hamburgerMenu from "../../assets/hamburger-bar.svg";
import { User, Lock, LogOut, Bell } from "lucide-react";

/**
 * MemberNavBar component - Navigation bar for logged-in users
 * Shows user profile menu with Profile, Reset password, and Log out options
 * Mobile menu dropdowns from top when hamburger is clicked
 */
const MemberNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest(".member-menu") &&
        !target.closest(".hamburger-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <>
      <div
        className={`sticky top-0 z-50 w-full h-[48px] border-b border-brown-300 flex justify-between items-center pt-[12px] pr-[24px] pb-[12px] pl-[24px] bg-brown-100 backdrop-blur-sm transition-shadow duration-300 md:h-[56px] md:pt-[13px] md:pr-[40px] md:pb-[13px] md:pl-[40px] lg:h-[80px] lg:pt-[14px] lg:pr-[80px] lg:pb-[14px] lg:pl-[80px] xl:h-[80px] xl:pt-[16px] xl:pr-[120px] xl:pb-[16px] xl:pl-[120px] ${isScrolled ? "shadow-md shadow-brown-300/20" : ""
          }`}
      >
        <img
          className="w-[24px] h-[24px] lg:w-[36px] lg:h-[36px] xl:w-[44px] xl:h-[44px] cursor-pointer transition-all duration-300 hover:opacity-80 hover:scale-110 active:scale-95"
          src={hhLogo}
          alt="hh logo"
          onClick={() => navigate("/member")}
        />
        <img
          className="hamburger-button w-[24px] h-[24px] lg:hidden cursor-pointer transition-opacity hover:opacity-70 active:opacity-50"
          src={hamburgerMenu}
          alt="hamburger bar"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-brown-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile menu - dropdown from top */}
      <div
        className={`member-menu fixed top-[48px] left-0 right-0 z-40 bg-brown-100 border-b border-brown-300 shadow-lg shadow-brown-300/30 lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
          }`}
      >
        <div className="flex flex-col">
          {/* User Profile Section */}
          <div className="flex items-center gap-[12px] px-[24px] py-[20px]">
            <div className="w-[48px] h-[48px] rounded-full bg-brown-300 flex items-center justify-center shrink-0">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-brown-600 text-body-1 font-medium">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body-1 text-brown-600 font-medium truncate">
                {user?.name || "User"}
              </p>
            </div>
            <div className="w-[32px] h-[32px] rounded-full border border-brown-300 bg-white flex items-center justify-center shrink-0">
              <Bell className="w-[18px] h-[18px] text-brown-600" />
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col px-[24px] py-[20px] gap-[8px]">
            <button
              onClick={() => {
                // TODO: Navigate to profile page
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-[12px] px-[12px] py-[12px] rounded-[8px] hover:bg-brown-200 transition-colors text-left"
            >
              <User className="w-[20px] h-[20px] text-brown-600 shrink-0" />
              <span className="text-body-1 text-brown-600">Profile</span>
            </button>
            <button
              onClick={() => {
                // TODO: Navigate to reset password page
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-[12px] px-[12px] py-[12px] rounded-[8px] hover:bg-brown-200 transition-colors text-left"
            >
              <Lock className="w-[20px] h-[20px] text-brown-600 shrink-0" />
              <span className="text-body-1 text-brown-600">Reset password</span>
            </button>
            <div className="border-t border-brown-300 my-[8px]"></div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-[12px] px-[12px] py-[12px] rounded-[8px] hover:bg-brown-200 transition-colors text-left"
            >
              <LogOut className="w-[20px] h-[20px] text-brown-600 shrink-0" />
              <span className="text-body-1 text-brown-600">Log out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberNavBar;
