import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** คลาสของ input (จะเพิ่ม pr-12 ให้ที่ว่างสำหรับไอคอนลูกตา) */
  className?: string;
  /** true =  wrapper กว้างเต็ม (input w-full); false = wrapper เท่าขนาด input (ลูกตาอยู่ในกรอบขวา) */
  fullWidth?: boolean;
}

/**
 * ช่องกรอกรหัสผ่านพร้อมปุ่มลูกตาแสดง/ซ่อน
 * ใช้แทน <input type="password" /> ในหน้าที่ไม่ใช้ FormInput
 * fullWidth=false ใช้เมื่อ input มีความกว้างคงที่ (เช่น w-[480px]) เพื่อให้ลูกตาอยู่ขวาขอบ input
 */
const PasswordInput = ({ className, fullWidth = true, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("relative", fullWidth ? "w-full" : "w-fit")}>
      <input
        type={showPassword ? "text" : "password"}
        className={cn(className, "pr-12")}
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
  );
};

export default PasswordInput;
