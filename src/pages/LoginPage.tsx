import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import { login } from "../services/authService";

/**
 * LoginPage component - User login page
 * Uses reusable LoginForm component
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (formData: { email: string; password: string }) => {
    const result = await login(formData);
    
    if (result.success && result.user) {
      // Set user in auth context
      authLogin(result.user);
      // Navigate to member home page
      navigate("/member");
      return { success: true };
    } else {
      return { 
        success: false, 
        error: "Your password is incorrect or this email doesn't exist" 
      };
    }
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
