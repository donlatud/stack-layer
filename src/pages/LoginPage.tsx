import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import AuthPageLayout from "../components/auth/AuthPageLayout";
import AuthFormCard from "../components/auth/AuthFormCard";
import FormInput from "../components/auth/FormInput";
import BlackButton from "../components/common/BlackButton";
import { login } from "../services/authService";

interface FormErrors {
  email?: string;
  password?: string;
}

/**
 * LoginPage component - User login page
 * Mobile-first design with form for email and password
 * Includes validation and error handling
 */
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email must be a valid email";
      }
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(formData);
      
      if (result.success && result.user) {
        // Set user in auth context
        authLogin(result.user);
        // Navigate to member home page
        navigate("/member");
      } else {
        // Show login error
        const errorMessage = "Your password is incorrect or this email doesn't exist";
        setErrors({
          email: errorMessage,
          password: errorMessage,
        });
        
        // Show toast notification
        toast.error(errorMessage, {
          description: "Please try another password or email",
          duration: 5000,
          className: "toast-error-custom",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = "An error occurred. Please try again.";
      setErrors({
        email: errorMessage,
        password: errorMessage,
      });
      
      // Show toast notification
      toast.error("Your password is incorrect or this email doesn't exist", {
        description: "Please try another password or email",
        duration: 5000,
        className: "toast-error-custom",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageLayout>
      <AuthFormCard
        title="Log in"
        footerText="Don't have any account?"
        footerLinkText="Sign up"
        onFooterLinkClick={() => navigate("/signup")}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] md:gap-[24px] lg:gap-[24px]">
          <FormInput
            type="email"
            id="email"
            name="email"
            label="Email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormInput
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <div className="mt-[8px] flex justify-center">
            <BlackButton
              type="submit"
              className="w-[141px] h-[48px] md:w-[160px] lg:w-[180px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </BlackButton>
          </div>
        </form>
      </AuthFormCard>
    </AuthPageLayout>
  );
};

export default LoginPage;
