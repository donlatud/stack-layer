import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import BlackButton from "../../components/common/BlackButton";
import PasswordInput from "../../components/common/PasswordInput";

/** คลาส input รหัสผ่าน ใช้ร่วมกันในฟอร์ม Reset password */
const PASSWORD_INPUT_CLASS =
  "w-[480px] max-w-full h-[44px] px-[16px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-[#2D2D2D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red";

/**
 * หน้ารีเซ็ตรหัสผ่าน (Admin)
 * ฟอร์ม: รหัสเก่า, รหัสใหม่, ยืนยันรหัสใหม่
 * ปุ่ม "Reset password" → ไปหน้าโมดัลยืนยัน /admin/reset-password/check
 */
const AdminResetPasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // ไปหน้าโมดัลยืนยันก่อนรีเซ็ต
    navigate("/admin/reset-password/check");
  };

  return (
    <AdminLayout activeItem="reset-password">
      <div className="w-full h-full bg-brown-100 p-[40px]">
        {/* Header */}
        <div className="-mx-[40px] border-b border-gray-200">
          <header className="flex items-center justify-between px-[40px] h-[96px]">
            <h1 className="text-headline-3 text-brown-600">Reset password</h1>
            <BlackButton onClick={handleSubmit} className="h-[44px] px-[24px]">
              Reset password
            </BlackButton>
          </header>
        </div>

        {/* Password Form */}
        <section className="max-w-[1160px] pl-[32px] pt-[32px]">
          <form className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[4px]">
              <label htmlFor="currentPassword" className="text-body-2 text-gray-600">
                Current password
              </label>
              <PasswordInput
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Current password"
                className={PASSWORD_INPUT_CLASS}
                fullWidth={false}
              />
            </div>

            <div className="flex flex-col gap-[4px]">
              <label htmlFor="newPassword" className="text-body-2 text-gray-600">
                New password
              </label>
              <PasswordInput
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New password"
                className={PASSWORD_INPUT_CLASS}
                fullWidth={false}
              />
            </div>

            <div className="flex flex-col gap-[4px]">
              <label htmlFor="confirmPassword" className="text-body-2 text-gray-600">
                Confirm new password
              </label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className={PASSWORD_INPUT_CLASS}
                fullWidth={false}
              />
            </div>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminResetPasswordPage;
