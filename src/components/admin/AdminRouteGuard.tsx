import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface AdminRouteGuardProps {
  children: ReactNode;
}

/**
 * ห่อหน้า Admin ที่ต้องล็อกอินและมี role = admin
 * ถ้ายังไม่ล็อกอินหรือไม่ใช่ admin → redirect ไป /admin/login
 */
const AdminRouteGuard = ({ children }: AdminRouteGuardProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated || !isAdmin) {
      navigate("/admin/login", { replace: true });
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate]);

  if (isLoading || !isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default AdminRouteGuard;
