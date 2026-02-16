import { User, Lock, LogOut, SquareArrowOutUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserDropdownMenuProps {
  onProfileClick?: () => void;
  onResetPasswordClick?: () => void;
  onAdminPanelClick?: () => void;
  onLogoutClick?: () => void;
  isAdmin?: boolean;
  className?: string;
}

/** คลาสปุ่มเมนูใช้ร่วมกัน: ไอคอน+ข้อความ */
const ITEM_BASE = "flex items-center gap-[12px] transition-colors text-left";
const ITEM_MOBILE = "px-[12px] py-[12px] rounded-[8px] hover:bg-brown-200";
const ITEM_DESKTOP = "px-[16px] py-[12px] hover:bg-brown-50";

/**
 * เมนู dropdown ผู้ใช้: Profile, Reset password, [Admin panel เมื่อ role=admin], Log out
 * ใช้ทั้งใน MemberNavBar เดสก์ท็อป และเมนูมือถือ; ถ้า className มี "bg-brown-100" ถือว่าเป็นโหมดมือถือ (สไตล์ต่างกัน)
 */
const UserDropdownMenu = ({
  onProfileClick,
  onResetPasswordClick,
  onAdminPanelClick,
  onLogoutClick,
  isAdmin = false,
  className = "",
}: UserDropdownMenuProps) => {
  const isMobile = className.includes("bg-brown-100");
  const itemClass = cn(ITEM_BASE, isMobile ? ITEM_MOBILE : ITEM_DESKTOP);

  return (
    <div
      className={cn(
        isMobile ? "bg-transparent shadow-none border-0" : "bg-white rounded-[8px] shadow-lg shadow-brown-300/20 border border-brown-200",
        className
      )}
    >
      <div className={cn("flex flex-col", isMobile ? "gap-[8px]" : "py-[8px]")}>
        <button type="button" onClick={onProfileClick} className={itemClass}>
          <User className="w-[20px] h-[20px] text-brown-600 shrink-0" />
          <span className="text-body-1 text-brown-600">Profile</span>
        </button>
        <button type="button" onClick={onResetPasswordClick} className={itemClass}>
          <Lock className="w-[20px] h-[20px] text-brown-600 shrink-0" />
          <span className="text-body-1 text-brown-600">Reset password</span>
        </button>
        {isAdmin && onAdminPanelClick && (
          <button type="button" onClick={onAdminPanelClick} className={itemClass}>
            <SquareArrowOutUpRight className="w-[20px] h-[20px] text-brown-600 shrink-0" />
            <span className="text-body-1 text-brown-600">Admin panel</span>
          </button>
        )}
        <button type="button" onClick={onLogoutClick} className={itemClass}>
          <LogOut className="w-[20px] h-[20px] text-brown-600 shrink-0" />
          <span className="text-body-1 text-brown-600">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default UserDropdownMenu;
