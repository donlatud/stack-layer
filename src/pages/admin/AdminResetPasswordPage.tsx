import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import BlackButton from "../../components/common/BlackButton";

/**
 * AdminResetPasswordPage component - Reset password page for admin
 * Desktop-only page with password reset form
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // In this UI flow, clicking the header button opens confirmation modal
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
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Current password"
                className="w-[480px] max-w-full h-[44px] px-[16px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-[#2D2D2D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
              />
            </div>

            <div className="flex flex-col gap-[4px]">
              <label htmlFor="newPassword" className="text-body-2 text-gray-600">
                New password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New password"
                className="w-[480px] max-w-full h-[44px] px-[16px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-[#2D2D2D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
              />
            </div>

            <div className="flex flex-col gap-[4px]">
              <label htmlFor="confirmPassword" className="text-body-2 text-gray-600">
                Confirm new password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-[480px] max-w-full h-[44px] px-[16px] bg-white border border-gray-300 rounded-[8px] text-body-1 text-[#2D2D2D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
              />
            </div>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminResetPasswordPage;
