import { useNavigate } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import BlackButton from "../components/common/BlackButton";

/**
 * NotFoundPage component - 404 error page
 * Displays error message with icon and navigation button
 * Uses existing NavBar and Footer components
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen font-family-poppins flex flex-col">
      <NavBar />
      
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
            onClick={() => navigate("/")}
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