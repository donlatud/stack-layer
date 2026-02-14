import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import { login } from "../services/authService";

/**
 * หน้าเข้าสู่ระบบ (member)
 * ถ้าล็อกอินแล้ว → redirect ไป /member
 * ใช้ LoginForm; ส่งต่อ auth service แล้วอัปเดต AuthContext และ redirect ไป /member
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, login: authLogin } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/member", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || isAuthenticated) {
    return null;
  }

  const handleSubmit = async (formData: { email: string; password: string }) => {
    const result = await login(formData);
    if (result.success && result.user) {
      authLogin(result.user, result.access_token);
      navigate("/member");
      return { success: true };
    }
    return { success: false, error: result.message ?? "Your password is incorrect or this email doesn't exist" };
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      title="Log in"
      footerText="Don't have any account?"
      footerLinkText="Sign up"
      onFooterLinkClick={() => navigate("/signup")}
    />
  );
};

export default LoginPage;
