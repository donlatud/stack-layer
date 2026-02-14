import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthPageLayout from "../components/auth/AuthPageLayout";
import AuthFormCard from "../components/auth/AuthFormCard";
import FormInput from "../components/auth/FormInput";
import BlackButton from "../components/common/BlackButton";
import { signup } from "../services/authService";

interface FormErrors {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

/**
 * หน้าสมัครสมาชิก: ชื่อ, username, อีเมล, รหัสผ่าน
 * ถ้าล็อกอินแล้ว → redirect ไป /member
 * มี validation; ส่งต่อไป signup service แล้วไป /registration-success
 */
const SignupPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/member", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const validateForm = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.username.trim()) e.username = "Username is required";
    if (!formData.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Email must be a valid email";
    }
    if (!formData.password) {
      e.password = "Password is required";
    } else if (formData.password.length < 6) {
      e.password = "Password must be at least 6 characters";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name as keyof FormErrors] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const result = await signup(formData);
      if (result.success && result.user) {
        navigate("/registration-success");
        return;
      }
      if (result.message) {
        setErrors((prev) => ({ ...prev, email: result.message }));
      }
    } catch (err) {
      console.error("Signup error:", err);
      setErrors((prev) => ({ ...prev, email: "An error occurred. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <AuthPageLayout>
      <AuthFormCard
        title="Sign up"
        footerText="Already have an account?"
        footerLinkText="Log in"
        onFooterLinkClick={() => navigate("/login")}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          <FormInput
            type="text"
            id="name"
            name="name"
            label="Name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <FormInput
            type="text"
            id="username"
            name="username"
            label="Username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
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
              {isSubmitting ? "Signing up..." : "Sign up"}
            </BlackButton>
          </div>
        </form>
      </AuthFormCard>
    </AuthPageLayout>
  );
};

export default SignupPage;
