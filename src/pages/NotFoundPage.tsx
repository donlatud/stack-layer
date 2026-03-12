import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "../components/layout/NavBar";
import MemberNavBar from "../components/layout/MemberNavBar";
import Footer from "../components/layout/Footer";
import BlackButton from "../components/common/BlackButton";

/**
 * หน้า 404: ข้อความ PAGE NOT FOUND และปุ่มไปหน้าแรก
 * ใช้ MemberNavBar หรือ NavBar ตามสถานะล็อกอิน
 */
const NotFoundPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGoToHomepage = () => navigate(isAuthenticated ? "/member" : "/");

  return (
    <div className="w-full min-h-screen font-family-poppins flex flex-col">
      {isAuthenticated ? <MemberNavBar /> : <NavBar />}
      
      <section className="flex-1 flex flex-col items-center justify-center bg-white pt-[40px] pr-[16px] pb-[40px] pl-[16px]">
        <div className="flex flex-col items-center gap-[24px]">
          {/* Circular Icon with Exclamation Mark */}
          <div className="w-[120px] h-[120px] rounded-full border-[3px] border-brown-600 flex items-center justify-center">
            <span className="text-[64px] font-bold text-brown-600 leading-none">!</span>
          </div>
          
          {/* Page Not Found Text */}
          <h1 className="text-headline-2 md:text-headline-1 text-brown-600 font-bold uppercase tracking-wide">
            PAGE NOT FOUND
          </h1>
          
          {/* Go To Homepage Button */}
          <BlackButton
            type="button"
            onClick={handleGoToHomepage}
            className="mt-[8px] shadow-md shadow-brown-600/20"
          >
            Go To Homepage
          </BlackButton>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotFoundPage;