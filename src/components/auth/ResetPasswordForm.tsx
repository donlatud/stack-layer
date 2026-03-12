import BlackButton from "../common/BlackButton";
import PasswordField from "../common/PasswordField";

export interface ResetPasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordFormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface ResetPasswordFormProps {
  formData: ResetPasswordFormData;
  errors: ResetPasswordFormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  /** "mobile" | "desktop" สำหรับความสูง input และ label; mobile มี pt-[24px] ที่ฟิลด์แรก */
  variant: "mobile" | "desktop";
  /** suffix สำหรับ id (เช่น "" หรือ "-desktop") เพื่อไม่ให้ id ซ้ำเมื่อมีสองฟอร์มในหน้า */
  idSuffix?: string;
}

/**
 * ฟอร์มรีเซ็ตรหัสผ่าน: current, new, confirm password + ปุ่ม Reset
 * ใช้ทั้งใน mobile และ desktop (ส่ง variant และ idSuffix)
 */
const ResetPasswordForm = ({
  formData,
  errors,
  onChange,
  onSubmit,
  isSubmitting,
  variant,
  idSuffix = "",
}: ResetPasswordFormProps) => {
  const formClassName = variant === "mobile" ? "flex flex-col gap-[24px] mb-[32px]" : "flex flex-col gap-[24px] mb-[40px]";
  const firstFieldClassName = variant === "mobile" ? "pt-[24px]" : undefined;
  const buttonHeight = variant === "mobile" ? "h-[48px] min-w-[208px]" : "h-[44px] min-w-[180px]";

  return (
    <>
      <form className={formClassName} onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <PasswordField
          id={`currentPassword${idSuffix}`}
          name="currentPassword"
          label="Current password"
          placeholder="Current password"
          value={formData.currentPassword}
          onChange={onChange}
          error={errors.currentPassword}
          variant={variant}
          className={firstFieldClassName}
        />
        <PasswordField
          id={`newPassword${idSuffix}`}
          name="newPassword"
          label="New password"
          placeholder="New password"
          value={formData.newPassword}
          onChange={onChange}
          error={errors.newPassword}
          variant={variant}
        />
        <PasswordField
          id={`confirmPassword${idSuffix}`}
          name="confirmPassword"
          label="Confirm new password"
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword}
          variant={variant}
        />
      </form>
      <div className="flex justify-start">
        <BlackButton
          onClick={onSubmit}
          className={buttonHeight}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Resetting..." : "Reset password"}
        </BlackButton>
      </div>
    </>
  );
};

export default ResetPasswordForm;
