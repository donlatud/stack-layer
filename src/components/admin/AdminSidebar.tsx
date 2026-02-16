import { useNavigate, useLocation } from "react-router-dom";
import { FileText, Folder, User, Bell, Lock, Globe, LogOut } from "lucide-react";
import hhLogo from "../../assets/hh-logo.svg";
import { cn } from "../../lib/utils";

interface AdminSidebarProps {
  /** id เมนูที่ active (ถ้าไม่ส่ง จะดูจาก path ปัจจุบัน) */
  activeItem?: string;
}

/** รายการเมนูหลัก: Article, Category, Profile, Notification, Reset password */
const MENU_ITEMS = [
  { id: "article", label: "Article management", icon: FileText, path: "/admin/article" },
  { id: "category", label: "Category management", icon: Folder, path: "/admin/category" },
  { id: "profile", label: "Profile", icon: User, path: "/admin/profile" },
  { id: "notification", label: "Notification", icon: Bell, path: "/admin/notification" },
  { id: "reset-password", label: "Reset password", icon: Lock, path: "/admin/reset-password" },
] as const;

const NAV_BUTTON_BASE = "w-full flex items-center gap-[12px] px-[12px] py-[12px] rounded-[8px] transition-colors";

/**
 * Sidebar ฝั่งซ้ายของทุกหน้า Admin
 * - โลโก้ + "Admin panel"
 * - เมนูหลัก (Article, Category, ...)
 * - ลิงก์ล่าง: hh. website, Log out
 */
const AdminSidebar = ({ activeItem }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // ถ้าไม่ส่ง activeItem มา ให้หาจาก path ว่าอยู่เมนูไหน (เช่น /admin/article/create → article)
  const resolvedActive =
    activeItem ??
    MENU_ITEMS.find((item) => pathname.startsWith(item.path))?.id ??
    "";

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-brown-200 flex flex-col pt-[70px] z-50 border-r border-brown-300">
      {/* โลโก้ + ข้อความ Admin panel */}
      <div className="px-[24px] py-[24px] ml-[8px]">
        <div className="mb-[4px]">
          <img src={hhLogo} alt="hh. logo" className="h-[32px] w-auto" />
        </div>
        <p className="text-body-2 text-brand-orange">Admin panel</p>
      </div>

      {/* เมนูหลัก */}
      <nav className="flex-1 px-[16px] py-[24px]">
        <ul className="flex flex-col gap-[4px]">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = resolvedActive === item.id;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={cn(
                    NAV_BUTTON_BASE,
                    isActive ? "bg-brown-300 text-brown-600" : "text-brown-400 hover:bg-brown-100"
                  )}
                >
                  <Icon
                    className={cn("w-[20px] h-[20px] shrink-0", isActive ? "text-brown-600" : "text-brown-400")}
                  />
                  <span className="text-body-1">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ลิงก์ล่าง: ไปเว็บหลัก / ออกจากระบบ */}
      <div className="px-[16px] py-[16px] border-t border-brown-300">
        <ul className="flex flex-col gap-[4px]">
          <li>
            <button
              type="button"
              onClick={() => navigate("/member")}
              className={cn(NAV_BUTTON_BASE, "text-brown-400 hover:bg-brown-100")}
            >
              <Globe className="w-[20px] h-[20px] shrink-0" />
              <span className="text-body-1">hh. website</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => navigate("/")}
              className={cn(NAV_BUTTON_BASE, "text-brown-400 hover:bg-brown-100")}
            >
              <LogOut className="w-[20px] h-[20px] shrink-0" />
              <span className="text-body-1">Log out</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
