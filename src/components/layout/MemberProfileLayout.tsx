import type { ReactNode } from "react";
import { User as UserIcon, Lock } from "lucide-react";
import MemberNavBar from "./MemberNavBar";
import { cn } from "@/lib/utils";

export type MemberProfileTab = "profile" | "reset-password";

interface MemberProfileLayoutProps {
  activeTab: MemberProfileTab;
  displayName: string;
  displayAvatar: string | null;
  pageTitle: string;
  onProfileClick: () => void;
  onResetPasswordClick: () => void;
  /** เนื้อหาสำหรับ mobile (ใน section สี brown-200) */
  mobileChildren: ReactNode;
  /** เนื้อหาสำหรับ desktop (ใน card ด้านขวา) */
  desktopChildren: ReactNode;
}

/**
 * Layout ร่วมสำหรับหน้า Profile และ Reset password: NavBar + แท็บ Profile/Reset password + บล็อก user + เนื้อหาตรงกลาง
 */
const MemberProfileLayout = ({
  activeTab,
  displayName,
  displayAvatar,
  pageTitle,
  onProfileClick,
  onResetPasswordClick,
  mobileChildren,
  desktopChildren,
}: MemberProfileLayoutProps) => {
  const isProfile = activeTab === "profile";
  const showDividerInHeader = isProfile;

  const avatarBlock = (
    <div className="w-[44px] h-[44px] rounded-full bg-brown-300 flex items-center justify-center shrink-0 overflow-hidden">
      {displayAvatar ? (
        <img
          src={displayAvatar}
          alt={displayName}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-body-1 text-brown-600 font-medium">
          {displayName.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen font-family-poppins flex flex-col bg-brown-100">
      <MemberNavBar />

      <main className="flex-1 w-full px-[16px] py-[24px] flex flex-col lg:px-[80px] lg:py-[40px]">
        {/* Mobile Layout */}
        <div className="flex flex-col lg:hidden">
          <section className="bg-white -mx-[16px] px-[16px] -mt-[24px] pt-[24px]">
            <div className="flex items-center gap-[32px] mb-[12px]">
              <button
                onClick={onProfileClick}
                className={cn(
                  "flex items-center gap-[8px]",
                  isProfile ? "text-brown-600 font-semibold" : "text-brown-400 font-normal"
                )}
                type="button"
              >
                <UserIcon className="w-[20px] h-[20px]" />
                <span className="text-body-1">Profile</span>
              </button>
              <button
                onClick={onResetPasswordClick}
                className={cn(
                  "flex items-center gap-[8px]",
                  !isProfile ? "text-brown-600 font-semibold" : "text-brown-400 font-normal"
                )}
                type="button"
                aria-current={!isProfile ? "page" : undefined}
              >
                <Lock className="w-[20px] h-[20px]" />
                <span className="text-body-1">Reset password</span>
              </button>
            </div>

            <div className="flex items-center gap-[12px] pt-[8px] pb-[12px] flex-nowrap">
              {avatarBlock}
              <span
                className={cn(
                  "text-headline-4 text-brown-400",
                  !isProfile && "truncate min-w-0"
                )}
              >
                {displayName}
              </span>
              <span className="w-px h-[20px] bg-brown-300 shrink-0" aria-hidden="true" />
              <span
                className={cn(
                  "text-headline-4 text-brown-600",
                  isProfile ? "font-semibold" : "shrink-0 whitespace-nowrap"
                )}
              >
                {pageTitle}
              </span>
            </div>
          </section>

          <section
            className={cn(
              "bg-brown-200 -mx-[16px] px-[16px] pb-[24px]",
              isProfile && "flex-1 -mb-[24px]"
            )}
          >
            {mobileChildren}
          </section>
        </div>

        {/* Desktop Layout (lg and above) */}
        <div className="hidden lg:flex lg:flex-col lg:max-w-[900px] lg:mx-auto lg:w-full">
          <header className="flex items-center gap-[12px] mb-[32px]">
            {avatarBlock}
            <span className="text-body-1 text-brown-500">{displayName}</span>
            {showDividerInHeader && (
              <span className="w-px h-[20px] bg-brown-300" aria-hidden="true" />
            )}
            <span className="text-headline-4 text-brown-600 font-semibold">
              {pageTitle}
            </span>
          </header>

          <div className="flex gap-[40px]">
            <aside className="shrink-0 w-[180px]">
              <nav className="flex flex-col gap-[16px]">
                <button
                  onClick={onProfileClick}
                  className={cn(
                    "flex items-center gap-[8px] text-left",
                    isProfile ? "text-brown-600 font-semibold" : "text-brown-400 font-normal"
                  )}
                  type="button"
                >
                  <div
                    className={cn(
                      "w-[6px] h-[6px] rounded-full shrink-0",
                      isProfile ? "bg-brown-500" : "bg-transparent"
                    )}
                  />
                  <UserIcon className="w-[20px] h-[20px]" />
                  <span className="text-body-1">Profile</span>
                </button>
                <button
                  onClick={onResetPasswordClick}
                  className={cn(
                    "flex items-center gap-[8px] text-brown-400 font-normal text-left",
                    !isProfile && "text-brown-600 font-semibold"
                  )}
                  type="button"
                  aria-current={!isProfile ? "page" : undefined}
                >
                  <div
                    className={cn(
                      "w-[6px] h-[6px] rounded-full shrink-0",
                      !isProfile ? "bg-brown-500" : "bg-transparent"
                    )}
                  />
                  <Lock className="w-[20px] h-[20px]" />
                  <span className="text-body-1">Reset password</span>
                </button>
              </nav>
            </aside>

            <div className="flex-1">
              <div
                className={cn(
                  "bg-brown-200 rounded-[12px] p-[40px] w-[550px] xl:p-[48px] 2xl:p-[56px]",
                  isProfile ? "h-[652px]" : "h-[452px]"
                )}
              >
                <div className="xl:max-w-[600px] 2xl:max-w-[700px]">
                  {desktopChildren}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemberProfileLayout;
