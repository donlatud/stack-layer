import LoginForm from "../components/auth/LoginForm";

/**
 * หน้าเข้าสู่ระบบแอดมิน
 * ใช้ LoginForm; logic ล็อกอินแอดมินยังเป็น placeholder (TODO: เปลี่ยนเป็น admin service)
 */
const AdminLoginPage = () => {
  const handleSubmit = async (_formData: { email: string; password: string }) => {
    // TODO: เรียก adminLogin จาก services เมื่อมี
    console.log("Admin login attempt:", _formData);
    return { success: false, error: "Your password is incorrect or this email doesn't exist" };
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      title="Log in"
      // Admin page might not need footer link, or could link to regular login
      // footerText="Are you a regular user?"
      // footerLinkText="Log in here"
      // onFooterLinkClick={() => navigate("/login")}
    />
  );
};

export default AdminLoginPage;
