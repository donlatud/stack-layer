import type { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  /** เนื้อหาหน้า (ตัว page ที่ใส่เข้าไป) */
  children: ReactNode;
  /** id ของเมนูที่ active (article, category, profile, notification, reset-password) ส่งมาจากแต่ละหน้า */
  activeItem?: string;
}

/**
 * Layout หลักของทุกหน้า Admin
 * - ซ้าย: Sidebar (เมนู + โลโก้ + ลิงก์ล่าง)
 * - ขวา: เนื้อหาที่ส่งมาใน children
 * ใช้ห่อทุกหน้า /admin/* ยกเว้น /admin/login
 */
const AdminLayout = ({ children, activeItem }: AdminLayoutProps) => {
  return (
    <div className="w-full min-h-screen font-family-poppins bg-brown-100 flex">
      <AdminSidebar activeItem={activeItem} />
      <main className="flex-1 ml-[280px] min-h-screen">
        <div className="w-full h-full">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
