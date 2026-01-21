// import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
// TODO: Import admin login service when it's created
// import { adminLogin } from "../services/adminService";

/**
 * AdminLoginPage component - Admin login page
 * Uses reusable LoginForm component with admin-specific configuration
 */
const AdminLoginPage = () => {
  // const navigate = useNavigate(); // Uncomment when admin dashboard route is ready

  const handleSubmit = async (formData: { email: string; password: string }) => {
    // TODO: Implement admin login logic
    // const result = await adminLogin(formData);
    
    // Placeholder logic - replace with actual admin login service
    console.log("Admin login attempt:", formData);
    
    // Simulate admin login validation (replace with actual admin service)
    // For now, always fail to show error handling
    // Replace this with actual admin login service call
    return { 
      success: false, 
      error: "Your password is incorrect or this email doesn't exist" 
    };
    
    // Uncomment when admin login service is ready:
    // const result = await adminLogin(formData);
    // if (result.success) {
    //   // Navigate to admin dashboard
    //   navigate("/admin/dashboard");
    //   return { success: true };
    // } else {
    //   return { 
    //     success: false, 
    //     error: result.error || "Your password is incorrect or this email doesn't exist" 
    //   };
    // }
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
