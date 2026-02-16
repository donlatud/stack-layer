import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNotifications } from "../../hooks";
import hhLogo from "../../assets/hh-logo.svg";
import hamburgerMenu from "../../assets/hamburger-bar.svg";
import { Bell, ChevronDown } from "lucide-react";
import UserDropdownMenu from "./UserDropdownMenu";
import NotificationDropdown from "./NotificationDropdown";
import { cn } from "@/lib/utils";

/**
 * แถบนำทางสำหรับผู้ใช้ที่ล็อกอินแล้ว
 * Logo, ไอคอนแจ้งเตือน, เมนูผู้ใช้ (Profile, Reset password, Log out)
 * มือถือ: แฮมเบอร์เกอร์เปิดเมนูเลื่อนลงจากด้านบน
 */
const MemberNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { notifications, isLoading: notificationsLoading, loadNotifications } = useNotifications({ limit: 20 });
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const bellButtonRef = useRef<HTMLButtonElement>(null);

  const handleMobileBellClick = () => {
    const willOpen = !isNotificationOpen;
    setIsNotificationOpen(willOpen);
    if (willOpen) loadNotifications();
  };

  const handleMenuOpen = (open: boolean) => {
    setIsMenuOpen(open);
    if (!open) setIsNotificationOpen(false);
  };

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
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        profileButtonRef.current &&
        !dropdownRef.current.contains(target) &&
        !profileButtonRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        isNotificationOpen &&
        notificationDropdownRef.current &&
        bellButtonRef.current &&
        !notificationDropdownRef.current.contains(target) &&
        !bellButtonRef.current.contains(target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isMenuOpen) setIsMenuOpen(false);
        if (isDropdownOpen) setIsDropdownOpen(false);
        if (isNotificationOpen) setIsNotificationOpen(false);
      }
    };

    if (isMenuOpen || isDropdownOpen || isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen, isDropdownOpen, isNotificationOpen]);

  const handleLogout = () => {
    navigate("/");
    logout();
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/member/profile");
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleResetPasswordClick = () => {
    navigate("/member/reset-password");
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleAdminPanelClick = () => {
    navigate("/admin/article");
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleNotificationBellClick = () => {
    const willOpen = !isNotificationOpen;
    setIsNotificationOpen(willOpen);
    if (willOpen) loadNotifications();
  };

  const handleViewAllNotifications = () => {
    if (user?.role === "admin") {
      navigate("/admin/notification");
    }
    setIsNotificationOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 w-full h-[48px] border-b border-brown-300 flex justify-between items-center pt-[12px] pr-[24px] pb-[12px] pl-[24px] bg-brown-100 backdrop-blur-sm transition-shadow duration-300 md:h-[56px] md:pt-[13px] md:pr-[40px] md:pb-[13px] md:pl-[40px] lg:h-[80px] lg:pt-[14px] lg:pr-[80px] lg:pb-[14px] lg:pl-[80px] xl:h-[80px] xl:pt-[16px] xl:pr-[120px] xl:pb-[16px] xl:pl-[120px]",
          isScrolled && "shadow-md shadow-brown-300/20"
        )}
      >
        {/* Logo - Mobile and Tablet */}
        <img
          className="w-[24px] h-[24px] md:w-[28px] md:h-[28px] lg:hidden cursor-pointer transition-all duration-300 hover:opacity-80 hover:scale-110 active:scale-95"
          src={hhLogo}
          alt="hh logo"
          onClick={() => navigate("/member")}
        />

        {/* Logo Text - Desktop (lg+) */}
        <span
          className="hidden lg:block text-brown-600 text-headline-3 font-semibold cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => navigate("/member")}
        >
          hh.
        </span>

        {/* Right side - Mobile: Hamburger, Tablet/Mobile: Hamburger, Desktop: Notification + Profile */}
        <div className="flex items-center gap-[16px]">
          {/* Desktop (lg+) - Notification Bell and Profile Dropdown (admin only) */}
          <div className="hidden lg:flex items-center gap-[16px]">
            {/* Notification Bell + Dropdown (Desktop) - admin only */}
            {user?.role === "admin" && (
            <div className="relative">
              <button
                ref={bellButtonRef}
                onClick={handleNotificationBellClick}
                className="relative w-[40px] h-[40px] rounded-full bg-white border border-brown-300 flex items-center justify-center hover:bg-brown-50 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-[20px] h-[20px] text-brown-600" />
                {notifications.length > 0 && (
                  <span className="absolute top-[6px] right-[6px] w-[10px] h-[10px] bg-red-500 rounded-full border-2 border-white" />
                )}
              </button>
              {isNotificationOpen && (
                <div
                  ref={notificationDropdownRef}
                  className="absolute right-0 top-[52px] z-50"
                >
                  <NotificationDropdown
                    notifications={notifications}
                    isLoading={notificationsLoading}
                    variant="desktop"
                    onViewAllClick={user?.role === "admin" ? handleViewAllNotifications : undefined}
                    onNotificationClick={() => setIsNotificationOpen(false)}
                  />
                </div>
              )}
            </div>
            )}

            {/* Profile Dropdown Button */}
            <div className="relative">
              <button
                ref={profileButtonRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-[12px] hover:opacity-80 transition-opacity"
                aria-label="User menu"
              >
                {/* Profile Picture */}
                <div className="w-[40px] h-[40px] rounded-full bg-brown-300 flex items-center justify-center shrink-0 overflow-hidden">
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
                {/* User Name */}
                <span className="text-body-1 text-brown-600 font-medium">
                  {user?.name || "User"}
                </span>
                {/* Dropdown Arrow */}
                <ChevronDown
                  className={cn(
                    "w-[16px] h-[16px] text-brown-600 transition-transform",
                    isDropdownOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-[52px] z-50 min-w-[200px]"
                >
                  <UserDropdownMenu
                    onProfileClick={handleProfileClick}
                    onResetPasswordClick={handleResetPasswordClick}
                    onAdminPanelClick={handleAdminPanelClick}
                    onLogoutClick={handleLogout}
                    isAdmin={user?.role === "admin"}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mobile/Tablet - Hamburger Menu */}
          <img
            className="hamburger-button w-[24px] h-[24px] lg:hidden cursor-pointer transition-opacity hover:opacity-70 active:opacity-50"
            src={hamburgerMenu}
            alt="hamburger bar"
            onClick={() => handleMenuOpen(!isMenuOpen)}
          />
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-brown-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => handleMenuOpen(false)}
        />
      )}

      <div
        className={cn(
          "member-menu fixed top-[48px] md:top-[56px] left-0 right-0 z-40 bg-brown-100 border-b border-brown-300 shadow-lg shadow-brown-300/30 lg:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="flex flex-col">
          {/* User Profile Section - Mobile/Tablet */}
          <div className="member-nav flex items-center gap-[12px] px-[24px] py-[20px] md:px-[40px] md:py-[24px] border-b border-brown-200">
            <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full bg-brown-300 flex items-center justify-center shrink-0 overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-brown-600 text-body-1 md:text-headline-4 font-medium">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body-1 md:text-headline-4 text-brown-600 font-medium truncate">
                {user?.name || "User"}
              </p>
            </div>
            <button
              type="button"
              ref={bellButtonRef}
              onClick={handleMobileBellClick}
              className="relative w-[32px] h-[32px] md:w-[40px] md:h-[40px] rounded-full border border-brown-300 bg-white flex items-center justify-center shrink-0 hover:bg-brown-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-brown-600" />
              {notifications.length > 0 && (
                <span className="absolute top-[4px] right-[4px] md:top-[6px] md:right-[6px] w-[10px] h-[10px] bg-red-500 rounded-full border-2 border-white" />
              )}
            </button>
          </div>

          {/* ส่วนล่าง: แสดง Notification แทน UserDropdownMenu เมื่อกด bell (ทับกัน) */}
          <div className="relative flex flex-col px-[24px] py-[20px] md:px-[40px] md:py-[24px]">
            {isNotificationOpen ? (
              /* Notification overlay - แสดงแทน Profile/Reset/Logout เมื่อกด bell */
              <div
                ref={notificationDropdownRef}
                className="bg-white rounded-[8px] shadow-lg shadow-brown-300/20 border border-brown-200 p-[16px] -mx-[24px] md:-mx-[40px] md:p-[20px]"
              >
                <NotificationDropdown
                  notifications={notifications}
                  isLoading={notificationsLoading}
                  variant="mobile"
                  onViewAllClick={user?.role === "admin" ? handleViewAllNotifications : undefined}
                  onNotificationClick={() => handleMenuOpen(false)}
                />
              </div>
            ) : (
              /* UserDropdownMenu - Profile, Reset password, Logout */
              <UserDropdownMenu
                onProfileClick={handleProfileClick}
                onResetPasswordClick={handleResetPasswordClick}
                onAdminPanelClick={handleAdminPanelClick}
                onLogoutClick={handleLogout}
                isAdmin={user?.role === "admin"}
                className="bg-brown-100 border-brown-300"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberNavBar;
