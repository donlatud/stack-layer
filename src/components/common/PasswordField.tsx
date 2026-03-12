import { cn } from "@/lib/utils";
import PasswordInput from "./PasswordInput";

interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  /** mobile: h-[48px], desktop: h-[44px] */
  variant?: "mobile" | "desktop";
  className?: string;
}

const INPUT_BASE =
  "w-full px-[16px] py-[12px] bg-white border rounded-[8px] text-body-1 text-brown-500 placeholder:text-brown-500 focus:outline-none focus:ring-2";
const INPUT_ERROR =
  "border-brand-red text-brand-red focus:ring-brand-red focus:border-brand-red";
const INPUT_NORMAL = "border-brown-300 focus:ring-brown-400 focus:border-brown-400";

/**
 * ช่องกรอกรหัสผ่านพร้อม label และข้อความ error (ใช้ PasswordInput + label + error)
 * ใช้ใน ResetPasswordForm เพื่อลดการซ้ำของคลาสและ markup
 */
const PasswordField = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  variant = "mobile",
  className,
}: PasswordFieldProps) => {
  const hasError = !!error;
  const heightClass = variant === "mobile" ? "h-[48px]" : "h-[44px]";
  const labelClass = variant === "mobile" ? "text-body-1" : "text-body-2";

  return (
    <div className={cn("flex flex-col gap-[4px]", className)}>
      <label htmlFor={id} className={cn(labelClass, "text-brown-400")}>
        {label}
      </label>
      <PasswordInput
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          INPUT_BASE,
          heightClass,
          hasError ? INPUT_ERROR : INPUT_NORMAL
        )}
      />
      {hasError && (
        <p className="text-body-2 text-brand-red mt-[4px]">{error}</p>
      )}
    </div>
  );
};

export default PasswordField;
