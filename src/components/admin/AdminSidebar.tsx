import { useNavigate, useLocation } from "react-router-dom";
import { FileText, Folder, User, Bell, Lock, Globe, LogOut } from "lucide-react";
import hhLogo from "../../assets/hh-logo.svg";

interface AdminSidebarProps {
  activeItem?: string;
}

/**
 * AdminSidebar component - Reusable sidebar navigation for admin pages
 * Desktop-only component with navigation menu and footer links
 */
const AdminSidebar = ({ activeItem }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "article", label: "Article management", icon: FileText, path: "/admin/article" },
    { id: "category", label: "Category management", icon: Folder, path: "/admin/category" },
    { id: "profile", label: "Profile", icon: User, path: "/admin/profile" },
    { id: "notification", label: "Notification", icon: Bell, path: "/admin/notification" },
    { id: "reset-password", label: "Reset password", icon: Lock, path: "/admin/reset-password" },
  ];

  const currentActiveItem = activeItem || menuItems.find(item => location.pathname.startsWith(item.path))?.id || "";

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-brown-200 flex flex-col pt-[70px] z-50 border-r border-brown-300">
      {/* Header */}
      <div className="px-[24px] py-[24px] ml-[8px]">
        <div className="mb-[4px]">
          <img
            src={hhLogo}
            alt="hh. logo"
            className="h-[32px] w-auto"
          />
        </div>
        <p className="text-body-2 text-brand-orange">Admin panel</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-[16px] py-[24px]">
        <ul className="flex flex-col gap-[4px]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentActiveItem === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-[12px] px-[12px] py-[12px] rounded-[8px] transition-colors ${
                    isActive
                      ? "bg-brown-300 text-brown-600"
                      : "text-brown-400 hover:bg-brown-100"
                  }`}
                >
                  <Icon className={`w-[20px] h-[20px] shrink-0 ${
                    isActive ? "text-brown-600" : "text-brown-400"
                  }`} />
                  <span className="text-body-1">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Links */}
      <div className="px-[16px] py-[16px] border-t border-brown-300">
        <ul className="flex flex-col gap-[4px]">
          <li>
            <button
              onClick={() => window.location.href = "/"}
              className="w-full flex items-center gap-[12px] px-[12px] py-[12px] rounded-[8px] text-brown-400 hover:bg-brown-100 transition-colors"
            >
              <Globe className="w-[20px] h-[20px] shrink-0" />
              <span className="text-body-1">hh. website</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                // TODO: Implement logout logic
                navigate("/admin/login");
              }}
              className="w-full flex items-center gap-[12px] px-[12px] py-[12px] rounded-[8px] text-brown-400 hover:bg-brown-100 transition-colors"
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
