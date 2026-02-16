import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRequireGuest } from "../hooks";
import LoginForm from "../components/auth/LoginForm";
import { login } from "../data/authApi";

/**
 * หน้าเข้าสู่ระบบ (member)
 * ถ้าล็อกอินแล้ว → redirect ไป /member
 * ใช้ LoginForm; ส่งต่อ auth service แล้วอัปเดต AuthContext และ redirect ไป /member
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const { isReady } = useRequireGuest({ redirectTo: "/member" });

  if (!isReady) {
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
