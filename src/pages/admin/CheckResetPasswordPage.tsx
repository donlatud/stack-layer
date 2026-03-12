import { useNavigate } from "react-router-dom";
import AdminConfirmModal from "../../components/admin/AdminConfirmModal";

/**
 * หน้าโมดัลยืนยันการรีเซ็ตรหัสผ่าน (Admin)
 * กด Cancel / X → กลับไป /admin/reset-password
 * กด Reset → รีเซ็ตรหัส (TODO: เรียก API) แล้วกลับ /admin/reset-password
 */
const CheckResetPasswordPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => navigate("/admin/reset-password");

  const handleReset = () => {
    // TODO: เรียก API รีเซ็ตรหัสผ่าน
    console.log("Confirm reset password");
    navigate("/admin/reset-password");
  };

  return (
    <AdminConfirmModal
      title="Reset password"
      message="Do you want to reset your password?"
      confirmLabel="Reset"
      onCancel={handleCancel}
      onConfirm={handleReset}
    />
  );
};

export default CheckResetPasswordPage;
