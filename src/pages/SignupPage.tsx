import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
 * SignupPage component - User registration page
 * Mobile-first design with form for name, username, email, and password
 * Includes validation and error handling
 */
const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      const result = await signup(formData);
      
      if (result.success && result.user) {
        // Navigate to success page with user data
        navigate("/registration-success", { state: { user: result.user } });
      } else {
        // Show email already taken error
        if (result.message?.includes("already taken")) {
          setErrors({
            ...errors,
            email: result.message,
          });
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({
        ...errors,
        email: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
