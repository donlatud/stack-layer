import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthPageLayout from "../components/auth/AuthPageLayout";
import AuthFormCard from "../components/auth/AuthFormCard";
import BlackButton from "../components/common/BlackButton";

/**
 * RegistrationSuccessPage component - Success page after registration
 * Displays success icon, message, and continue button
 */
const RegistrationSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();
  
  // Get user data from location state (passed from SignupPage)
  const user = location.state?.user;

  return (
    <AuthPageLayout>
      <AuthFormCard title="" footerText="" footerLinkText="" onFooterLinkClick={undefined}>
        <div className="flex flex-col items-center gap-[24px]">
          {/* Success Icon */}
          <div className="w-[80px] h-[80px] rounded-full bg-brand-green flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          {/* Success Message */}
          <h2 className="text-headline-3 text-brown-600 text-center">
            Registration success
          </h2>
          
          {/* Continue Button */}
          <div className="mt-[8px]">
            <BlackButton
              onClick={() => {
                if (user) {
                  // Set user in auth context
                  authLogin(user);
                  // Navigate to member home page
                  navigate("/member");
                } else {
                  // Fallback to login if no user data
                  navigate("/login");
                }
              }}
              className="w-[141px] h-[48px]"
            >
              Continue
            </BlackButton>
          </div>
        </div>
      </AuthFormCard>
    </AuthPageLayout>
  );
};

export default RegistrationSuccessPage;
