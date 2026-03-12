import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { useRequireAuth } from "../hooks";
import { resetPassword as resetPasswordApi } from "../data/authApi";
import MemberProfileLayout from "../components/layout/MemberProfileLayout";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";
import ResetPasswordConfirmModal from "../components/auth/ResetPasswordConfirmModal";
import {
  MESSAGE_PASSWORD_UPDATED,
  MESSAGE_FAILED_RESET_PASSWORD,
} from "../constants/messages";

/** no-op เมื่ออยู่ที่แท็บ Reset password อยู่แล้ว */
const noop = () => {};

/**
 * หน้ารีเซ็ตรหัสผ่านสมาชิก: รหัสเดิม, รหัสใหม่, ยืนยันรหัส; แท็บสลับไป Profile
 * ต้องล็อกอิน
 */
const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isReady } = useRequireAuth({ redirectTo: "/login" });
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

  if (!isReady) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    const key = name as keyof typeof errors;
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
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
    if (!validateForm()) return;
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
      toast.success(MESSAGE_PASSWORD_UPDATED, {
        className: "toast-success-custom",
      });
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      const message = result.message ?? MESSAGE_FAILED_RESET_PASSWORD;
      toast.error(message, {
        className: "toast-error-custom",
      });
      setErrors((prev) => ({ ...prev, currentPassword: message }));
    }
  };

  const handleCancelReset = () => {
    setShowConfirmModal(false);
  };

  const displayName = user?.name || "User";
  const displayAvatar = user?.avatar || null;

  const formProps = {
    formData,
    errors,
    onChange: handleChange,
    onSubmit: handleResetPassword,
    isSubmitting,
  };

  return (
    <>
      <MemberProfileLayout
        activeTab="reset-password"
        displayName={displayName}
        displayAvatar={displayAvatar}
        pageTitle="Reset password"
        onProfileClick={() => navigate("/member/profile")}
        onResetPasswordClick={noop}
        mobileChildren={
          <ResetPasswordForm
            {...formProps}
            variant="mobile"
            idSuffix=""
          />
        }
        desktopChildren={
          <ResetPasswordForm
            {...formProps}
            variant="desktop"
            idSuffix="-desktop"
          />
        }
      />

      {showConfirmModal && (
        <ResetPasswordConfirmModal
          onConfirm={performPasswordReset}
          onCancel={handleCancelReset}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
};

export default ResetPasswordPage;
