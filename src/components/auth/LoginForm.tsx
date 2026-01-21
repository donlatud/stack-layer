import { useState } from "react";
import { toast } from "sonner";
import AuthPageLayout from "./AuthPageLayout";
import AuthFormCard from "./AuthFormCard";
import FormInput from "./FormInput";
import BlackButton from "../common/BlackButton";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  onSubmit: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
  title?: string;
  buttonText?: string;
  submittingText?: string;
  footerText?: string;
  footerLinkText?: string;
  onFooterLinkClick?: () => void;
  validateForm?: (formData: FormData) => FormErrors;
  errorMessage?: string;
}

/**
 * LoginForm component - Reusable login form component
 * Can be used for both regular user login and admin login
 * Handles form state, validation, submission, and error display
 */
const LoginForm = ({
  onSubmit,
  title = "Log in",
  buttonText = "Log in",
  submittingText = "Logging in...",
  footerText,
  footerLinkText,
  onFooterLinkClick,
  validateForm: customValidateForm,
  errorMessage,
}: LoginFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValidateForm = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    // Validate email
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        newErrors.email = "Email must be a valid email";
      }
    }

    // Validate password
    if (!data.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const validateForm = (): boolean => {
    const validate = customValidateForm || defaultValidateForm;
    const newErrors = validate(formData);
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
      const result = await onSubmit(formData);
      
      if (result.success) {
        // Success handling is done in parent component (navigation, etc.)
      } else {
        // Show login error
        const errorMsg = result.error || errorMessage || "Your password is incorrect or this email doesn't exist";
        setErrors({
          email: errorMsg,
          password: errorMsg,
        });
        
        // Show toast notification
        toast.error(errorMsg, {
          description: "Please try another password or email",
          duration: 5000,
          className: "toast-error-custom",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg = errorMessage || "An error occurred. Please try again.";
      setErrors({
        email: errorMsg,
        password: errorMsg,
      });
      
      // Show toast notification
      toast.error(errorMsg, {
        description: "Please try again",
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
        title={title}
        footerText={footerText}
        footerLinkText={footerLinkText}
        onFooterLinkClick={onFooterLinkClick}
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
              {isSubmitting ? submittingText : buttonText}
            </BlackButton>
          </div>
        </form>
      </AuthFormCard>
    </AuthPageLayout>
  );
};

export default LoginForm;
