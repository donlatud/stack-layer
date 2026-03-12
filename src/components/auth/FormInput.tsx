import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

/** คลาส input ตอนปกติ (ไม่มี error) */
const INPUT_BASE =
  "w-full h-[48px] px-[16px] py-[12px] bg-white border rounded-[8px] text-body-1 placeholder:text-brown-400 focus:outline-none focus:ring-2";

/**
 * ช่องกรอกฟอร์ม (label + input + ข้อความ error)
 * ใช้ในหน้า Login, Signup; รองรับสภาวะ error (ขอบแดง + ข้อความ)
 * ถ้า type="password" จะมีปุ่มลูกตาแสดง/ซ่อนรหัส
 */
const FormInput = ({ label, id, className, error, type, ...props }: FormInputProps) => {
  const hasError = !!error;
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const inputClass = cn(
    INPUT_BASE,
    hasError
      ? "border-brand-red text-brand-red focus:ring-brand-red focus:border-brand-red"
      : "border-brown-300 text-brown-600 focus:ring-brown-400 focus:border-brown-400",
    className,
    isPassword && "pr-12"
  );

  return (
    <div className="flex flex-col gap-[4px] w-full">
      <label htmlFor={id} className="text-body-1 text-brown-400 w-full">
        {label}
      </label>
      {isPassword ? (
        <div className="relative w-full">
          <input
            id={id}
            type={showPassword ? "text" : "password"}
            className={inputClass}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brown-400 hover:text-brown-600 transition-colors rounded"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" aria-hidden />
            ) : (
              <Eye className="w-5 h-5" aria-hidden />
            )}
          </button>
        </div>
      ) : (
        <input id={id} type={type} className={inputClass} {...props} />
      )}
      {hasError && <p className="text-body-2 text-brand-red mt-[4px]">{error}</p>}
    </div>
  );
};

export default FormInput;
