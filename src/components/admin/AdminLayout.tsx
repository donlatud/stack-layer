import type { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
  activeItem?: string;
}

/**
 * AdminLayout component - Layout wrapper for admin pages
 * Includes sidebar navigation and main content area
 * Desktop-only layout
 */
const AdminLayout = ({ children, activeItem }: AdminLayoutProps) => {
  return (
    <div className="w-full min-h-screen font-family-poppins bg-brown-100 flex">
      <AdminSidebar activeItem={activeItem} />
      <main className="flex-1 ml-[280px] min-h-screen">
        <div className="w-full h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
