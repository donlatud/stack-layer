import type { ReactNode } from "react";
import { useRequireAdmin } from "../../hooks";

interface AdminRouteGuardProps {
  children: ReactNode;
}

/**
 * ห่อหน้า Admin ที่ต้องล็อกอินและมี role = admin
 * ถ้ายังไม่ล็อกอินหรือไม่ใช่ admin → redirect ไป /admin/login
 */
const AdminRouteGuard = ({ children }: AdminRouteGuardProps) => {
  const { isReady } = useRequireAdmin();

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
};

export default AdminRouteGuard;
