import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MemberNavBar from "../components/layout/MemberNavBar";
import HeroSection from "../components/HeroSection";
import ArticleSection from "../components/Article/ArticleSection";
import Footer from "../components/layout/Footer";

/**
 * หน้าแรกสมาชิก (ล็อกอินแล้ว): MemberNavBar, Hero, รายการบทความ, Footer
 * ยังไม่ล็อกอินจะ redirect ไป / (หน้าแรก)
 */
const MemberHomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

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
