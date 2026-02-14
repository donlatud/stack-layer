import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { resetPassword as resetPasswordApi } from "../services/authService";
import MemberNavBar from "../components/layout/MemberNavBar";
import { User, Lock, X } from "lucide-react";
import BlackButton from "../components/common/BlackButton";
import PasswordInput from "../components/common/PasswordInput";

/**
 * หน้ารีเซ็ตรหัสผ่านสมาชิก: รหัสเดิม, รหัสใหม่, ยืนยันรหัส; แท็บสลับไป Profile
 * ต้องล็อกอิน
 */
const ResetPasswordPage = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = () => {
    if (!validateForm()) {
      return;
    }
    // Show confirmation modal on desktop
    if (window.innerWidth >= 1024) {
      setShowConfirmModal(true);
    } else {
      performPasswordReset();
    }
  };

  const performPasswordReset = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setShowConfirmModal(false);

    const result = await resetPasswordApi({
      oldPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });

    setIsSubmitting(false);

    if (result.success) {
      toast.success("Password updated successfully", {
        className: "toast-success-custom",
      });
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      toast.error(result.message ?? "Failed to reset password", {
        className: "toast-error-custom",
      });
      setErrors((prev) => ({
        ...prev,
        currentPassword: result.message ?? "Failed to reset password",
      }));
    }
  };

  const handleCancelReset = () => {
    setShowConfirmModal(false);
  };

  const handleNavigateToProfile = () => {
    navigate("/member/profile");
  };

  const displayName = user?.name || "User";
  const displayAvatar = user?.avatar || null;

  return (
    <div className="w-full min-h-screen font-family-poppins flex flex-col bg-brown-100">
      <MemberNavBar />

      <main className="flex-1 w-full px-[16px] py-[24px] flex flex-col lg:px-[80px] lg:py-[40px]">
        {/* Mobile Layout */}
        <div className="flex flex-col lg:hidden">
          <section className="bg-white -mx-[16px] px-[16px] -mt-[24px] pt-[24px]">
            {/* Segmented Navigation */}
            <div className="flex items-center gap-[32px] mb-[12px]">
              <button
                onClick={handleNavigateToProfile}
                className="flex items-center gap-[8px] text-brown-400 font-normal"
              >
                <User className="w-[20px] h-[20px]" />
                <span className="text-body-1">Profile</span>
              </button>
              <button
                onClick={() => { }}
                className="flex items-center gap-[8px] text-brown-600 font-semibold"
              >
                <Lock className="w-[20px] h-[20px]" />
                <span className="text-body-1">Reset password</span>
              </button>
            </div>

            {/* User Info Section */}
            <div className="flex items-center gap-[12px] pt-[8px] pb-[12px] flex-nowrap">
              <div className="w-[44px] h-[44px] rounded-full bg-brown-300 flex items-center justify-center shrink-0 overflow-hidden">
                {displayAvatar ? (
                  <img
                    src={displayAvatar}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-body-1 text-brown-600 font-medium">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-headline-4 text-brown-400 truncate min-w-0">
                {displayName}
              </span>
              <span className="w-px h-[20px] bg-brown-300 shrink-0" aria-hidden="true" />
              <span className="text-headline-4 text-brown-600 shrink-0 whitespace-nowrap">
                Reset password
              </span>
            </div>
          </section>

          <section className="bg-brown-200 -mx-[16px] px-[16px] pb-[24px]">
            {/* Form Section */}
            <form className="flex flex-col gap-[24px] mb-[32px]">
              {/* Current Password Field */}
              <div className="flex flex-col gap-[4px] pt-[24px]">
                <label htmlFor="currentPassword" className="text-body-1 text-brown-400">
                  Current password
                </label>
                <PasswordInput
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Current password"
                  className={`w-full h-[48px] px-[16px] py-[12px] bg-white border rounded-[8px] text-body-1 text-brown-500 placeholder:text-brown-500 focus:outline-none focus:ring-2 ${errors.currentPassword
                    ? "border-brand-red text-brand-red focus:ring-brand-red focus:border-brand-red"
                    : "border-brown-300 focus:ring-brown-400 focus:border-brown-400"
                  }`}
                />
                {errors.currentPassword && (
                  <p className="text-body-2 text-brand-red mt-[4px]">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password Field */}
              <div className="flex flex-col gap-[4px]">
                <label htmlFor="newPassword" className="text-body-1 text-brown-400">
                  New password
                </label>
                <PasswordInput
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="New password"
                  className={`w-full h-[48px] px-[16px] py-[12px] bg-white border rounded-[8px] text-body-1 text-brown-500 placeholder:text-brown-500 focus:outline-none focus:ring-2 ${errors.newPassword
                    ? "border-brand-red text-brand-red focus:ring-brand-red focus:border-brand-red"
                    : "border-brown-300 focus:ring-brown-400 focus:border-brown-400"
                  }`}
                />
                {errors.newPassword && (
                  <p className="text-body-2 text-brand-red mt-[4px]">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm New Password Field */}
              <div className="flex flex-col gap-[4px]">
                <label htmlFor="confirmPassword" className="text-body-1 text-brown-400">
                  Confirm new password
                </label>
                <PasswordInput
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className={`w-full h-[48px] px-[16px] py-[12px] bg-white border rounded-[8px] text-body-1 text-brown-500 placeholder:text-brown-500 focus:outline-none focus:ring-2 ${errors.confirmPassword
                    ? "border-brand-red text-brand-red focus:ring-brand-red focus:border-brand-red"
                    : "border-brown-300 focus:ring-brown-400 focus:border-brown-400"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-body-2 text-brand-red mt-[4px]">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </form>

            {/* Reset Password Button */}
            <div className="flex justify-start">
              <BlackButton
                onClick={handleResetPassword}
                className="h-[48px] min-w-[208px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset password"}
              </BlackButton>
            </div>
          </section>
        </div>

        {/* Desktop Layout (lg and above) */}
        <div className="hidden lg:flex lg:flex-col lg:max-w-[900px] lg:mx-auto lg:w-full">
          {/* Top Header: User Info + Page Title */}
          <header className="flex items-center gap-[12px] mb-[32px]">
            <div className="w-[44px] h-[44px] rounded-full bg-brown-300 flex items-center justify-center shrink-0 overflow-hidden">
              {displayAvatar ? (
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-body-1 text-brown-600 font-medium">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-body-1 text-brown-500">{displayName}</span>
            <span className="text-headline-4 text-brown-600 font-semibold">Reset password</span>
          </header>

          {/* Main Content: Sidebar + Form Card */}
          <div className="flex gap-[40px]">
            {/* Left Sidebar - Navigation */}
            <aside className="shrink-0 w-[180px]">
              <nav className="flex flex-col gap-[16px]">
                <button
                  onClick={handleNavigateToProfile}
                  className="flex items-center gap-[8px] text-brown-400 font-normal text-left"
                >
                  <div className="w-[6px] h-[6px] rounded-full bg-transparent shrink-0" />
                  <User className="w-[20px] h-[20px]" />
                  <span className="text-body-1">Profile</span>
                </button>
                <button
                  onClick={() => { }}
                  className="flex items-center gap-[8px] text-brown-600 font-semibold text-left"
                >
                  <div className="w-[6px] h-[6px] rounded-full bg-brown-500 shrink-0" />
                  <Lock className="w-[20px] h-[20px]" />
                  <span className="text-body-1">Reset password</span>
                </button>
              </nav>
            </aside>

            {/* Right Content Card */}
            <div className="flex-1">
              <div className="bg-brown-200 rounded-[12px] w-[550px] h-[452px] p-[40px] xl:p-[48px] 2xl:p-[56px]">
                <div className="xl:max-w-[600px] 2xl:max-w-[700px]">
                  {/* Form Section */}
                  <form className="flex flex-col gap-[24px] mb-[40px]">
                    {/* Current Password Field */}
                    <div className="flex flex-col gap-[4px]">
                      <label htmlFor="currentPassword-desktop" className="text-body-2 text-brown-400">
                        Current password
                      </label>
                      <PasswordInput
                        id="currentPassword-desktop"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Current password"
                        className={`w-full h-[44px] px-[16px] py-[12px] bg-white border rounded-[8px] text-body-1 text-brown-500 placeholder:text-brown-500 focus:outline-none focus:ring-2 ${errors.currentPassword
                          ? "border-brand-red text-brand-red focus:ring-brand-red focus:border-brand-red"
                          : "border-brown-300 focus:ring-brown-400 focus:border-brown-400"
                        }`}
                      />
                      {errors.currentPassword && (
                        <p className="text-body-2 text-brand-red mt-[4px]">
                          {errors.currentPassword}
                        </p>
                      )}
                    </div>

                    {/* New Password Field */}
                    <div className="flex flex-col gap-[4px]">
                      <label htmlFor="newPassword-desktop" className="text-body-2 text-brown-400">
                        New password
                      </label>
                      <PasswordInput
                        id="newPassword-desktop"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="New password"
                        className={`w-full h-[44px] px-[16px] py-[12px] bg-white border rounded-[8px] text-body-1 text-brown-500 placeholder:text-brown-500 focus:outline-none focus:ring-2 ${errors.newPassword
                          ? "border-brand-red text-brand-red focus:ring-brand-red focus:border-brand-red"
                          : "border-brown-300 focus:ring-brown-400 focus:border-brown-400"
                        }`}
                      />
                      {errors.newPassword && (
                        <p className="text-body-2 text-brand-red mt-[4px]">
                          {errors.newPassword}
                        </p>
                      )}
                    </div>

                    {/* Confirm New Password Field */}
                    <div className="flex flex-col gap-[4px]">
                      <label htmlFor="confirmPassword-desktop" className="text-body-2 text-brown-400">
                        Confirm new password
                      </label>
                      <PasswordInput
                        id="confirmPassword-desktop"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        className={`w-full h-[44px] px-[16px] py-[12px] bg-white border rounded-[8px] text-body-1 text-brown-500 placeholder:text-brown-500 focus:outline-none focus:ring-2 ${errors.confirmPassword
                          ? "border-brand-red text-brand-red focus:ring-brand-red focus:border-brand-red"
                          : "border-brown-300 focus:ring-brown-400 focus:border-brown-400"
                        }`}
                      />
                      {errors.confirmPassword && (
                        <p className="text-body-2 text-brand-red mt-[4px]">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </form>

                  {/* Reset Password Button */}
                  <div className="flex justify-start">
                    <BlackButton
                      onClick={handleResetPassword}
                      className="h-[44px] min-w-[180px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Resetting..." : "Reset password"}
                    </BlackButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal - Desktop (lg and above) */}
      {showConfirmModal && (
        <div className="hidden lg:block fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleCancelReset}
          />
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-[16px]">
            <div className="bg-white rounded-[12px] p-[32px] max-w-[400px] w-full shadow-xl relative">
              {/* Close Button */}
              <button
                onClick={handleCancelReset}
                className="absolute top-[16px] right-[16px] w-[32px] h-[32px] flex items-center justify-center text-brown-400 hover:text-brown-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-[20px] h-[20px]" />
              </button>

              <div className="flex flex-col items-center justify-center text-center gap-[20px] mt-[24px] mb-[32px]">
                {/* Title */}
                <h2 className="text-headline-3 text-brown-600 font-semibold mb-[8px]">
                  Reset password
                </h2>

                {/* Question */}
                <p className="text-body-1 text-brown-500">
                  Do you want to reset your password?
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-[12px] justify-center">
                <button
                  onClick={handleCancelReset}
                  className="h-[48px] w-[138px] px-[24px] rounded-[999px] bg-white border border-brown-300 text-brown-600 text-body-1 font-medium hover:bg-brown-50 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <BlackButton
                  onClick={performPasswordReset}
                  className="h-[48px] w-[138px] px-[24px] rounded-[999px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Reset"}
                </BlackButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
