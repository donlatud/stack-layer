import LoginForm from "../../components/auth/LoginForm";

/**
 * หน้าเข้าสู่ระบบแอดมิน (ไม่มี NavBar)
 * การ์ดกลางจอ: "Admin panel", "Log in", Email, Password, ปุ่ม Log in
 * ใช้ LoginForm; logic ล็อกอินแอดมินยังเป็น placeholder (TODO: เปลี่ยนเป็น admin service)
 * เมื่อข้อมูลผิด → toast แจ้งเตือน (ใน LoginForm)
 */
const AdminLoginPage = () => {
  const handleSubmit = async (_formData: { email: string; password: string }) => {
    // TODO: เรียก adminLogin จาก services เมื่อมี; success แล้ว navigate("/admin/article")
    console.log("Admin login attempt:", _formData);
    return { success: false, error: "Your password is incorrect or this email doesn't exist" };
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      subtitle="Admin panel"
      title="Log in"
      showNav={false}
    />
  );
};

export default AdminLoginPage;
