import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MemberNavBar from "../components/layout/MemberNavBar";
import HeroSection from "../components/HeroSection";
import ArticleSection from "../components/Article/ArticleSection";
import Footer from "../components/layout/Footer";

/**
 * MemberHomePage component - Home page for logged-in users
 * Similar to HomePage but with MemberNavBar instead of regular NavBar
 * Requires authentication to access
 */
const MemberHomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="w-full min-h-screen font-family-poppins flex flex-col">
      <MemberNavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </div>
  );
};

export default MemberHomePage;
