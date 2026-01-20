import { User, Lock, LogOut } from "lucide-react";

interface UserDropdownMenuProps {
  onProfileClick?: () => void;
  onResetPasswordClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

/**
 * UserDropdownMenu component - Reusable dropdown menu for user actions
 * Displays Profile, Reset password, and Log out options with icons
 * Can be used in both desktop (lg+) and mobile (md) contexts
 */
const UserDropdownMenu = ({
  onProfileClick,
  onResetPasswordClick,
  onLogoutClick,
  className = "",
}: UserDropdownMenuProps) => {
  // Check if this is mobile context (has brown-100 background)
  const isMobileContext = className.includes("bg-brown-100");

  return (
    <div
      className={`${isMobileContext
          ? "bg-transparent shadow-none border-0"
          : "bg-white rounded-[8px] shadow-lg shadow-brown-300/20 border border-brown-200"
        } ${className}`}
    >
      <div className={`flex flex-col ${isMobileContext ? "gap-[8px]" : "py-[8px]"}`}>
        <button
          onClick={onProfileClick}
          className={`flex items-center gap-[12px] ${isMobileContext
              ? "px-[12px] py-[12px] rounded-[8px] hover:bg-brown-200"
              : "px-[16px] py-[12px] hover:bg-brown-50"
            } transition-colors text-left`}
        >
          <User className="w-[20px] h-[20px] text-brown-600 shrink-0" />
          <span className="text-body-1 text-brown-600">Profile</span>
        </button>
        <button
          onClick={onResetPasswordClick}
          className={`flex items-center gap-[12px] ${isMobileContext
              ? "px-[12px] py-[12px] rounded-[8px] hover:bg-brown-200"
              : "px-[16px] py-[12px] hover:bg-brown-50"
            } transition-colors text-left`}
        >
          <Lock className="w-[20px] h-[20px] text-brown-600 shrink-0" />
          <span className="text-body-1 text-brown-600">Reset password</span>
        </button>
        <button
          onClick={onLogoutClick}
          className={`flex items-center gap-[12px] ${isMobileContext
              ? "px-[12px] py-[12px] rounded-[8px] hover:bg-brown-200"
              : "px-[16px] py-[12px] hover:bg-brown-50"
            } transition-colors text-left`}
        >
          <LogOut className="w-[20px] h-[20px] text-brown-600 shrink-0" />
          <span className="text-body-1 text-brown-600">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default UserDropdownMenu;
