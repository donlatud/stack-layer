import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { login } from "../../services/authService";
import LoginForm from "../../components/auth/LoginForm";

/**
 * หน้าเข้าสู่ระบบแอดมิน (ไม่มี NavBar)
 * เรียก login API เหมือน member; ถ้า role !== admin แจ้ง "Admin access only"
 * success → redirect ไป /admin/article
 * ถ้าล็อกอินเป็น admin อยู่แล้ว → redirect ไป /admin/article
 */
const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, login: authLogin } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.role === "admin") {
      navigate("/admin/article", { replace: true });
    }
  }, [isAuthenticated, isLoading, user?.role, navigate]);

  if (isLoading || (isAuthenticated && user?.role === "admin")) {
    return null;
  }

  const handleSubmit = async (formData: { email: string; password: string }) => {
    const result = await login(formData);
    if (!result.success || !result.user) {
      return {
        success: false,
        error: result.message ?? "Your password is incorrect or this email doesn't exist",
      };
    }
    if (result.user.role !== "admin") {
      return { success: false, error: "Admin access only. This account is not an administrator." };
    }
    authLogin(result.user, result.access_token);
    navigate("/admin/article");
    return { success: true };
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      subtitle="Admin panel"
      title="Log in"
      showNav={false}
    />
  );
};

export default AdminLoginPage;
