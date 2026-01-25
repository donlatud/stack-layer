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

/** ข้อความ error เวลา login ไม่ผ่าน (รหัส/อีเมลผิด) */
const DEFAULT_ERR_LOGIN = "Your password is incorrect or this email doesn't exist";
/** ข้อความ error เวลาเกิดข้อผิดพลาดจากระบบ */
const DEFAULT_ERR_GENERIC = "An error occurred. Please try again.";

/**
 * ฟอร์มล็อกอิน นำกลับใช้ได้ทั้ง member และ admin
 * รองรับ: title, ข้อความปุ่ม, footer link, validation แบบกำหนดเอง, ข้อความ error กำหนดเอง
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
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** validation เริ่มต้น: อีเมลต้องไม่ว่าง+ฟอร์แมตถูก, รหัสต้องไม่ว่าง */
  const defaultValidateForm = (data: FormData): FormErrors => {
    const e: FormErrors = {};
    if (!data.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = "Email must be a valid email";
    }
    if (!data.password) e.password = "Password is required";
    return e;
  };

  /** รัน validation (ใช้ของ parent หรือ default) แล้วอัปเดต errors คืน true ถ้าไม่มี error */
  const runValidation = (): boolean => {
    const validate = customValidateForm ?? defaultValidateForm;
    const next = validate(formData);
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name as keyof FormErrors] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!runValidation()) return;

    setIsSubmitting(true);
    try {
      const result = await onSubmit(formData);
      if (result.success) {
        // จัดการ redirect ฯลฯ ใน parent
      } else {
        const msg = result.error ?? errorMessage ?? DEFAULT_ERR_LOGIN;
        setErrors({ email: msg, password: msg });
        toast.error(msg, {
          description: "Please try another password or email",
          duration: 5000,
          className: "toast-error-custom",
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      const msg = errorMessage ?? DEFAULT_ERR_GENERIC;
      setErrors({ email: msg, password: msg });
      toast.error(msg, {
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
