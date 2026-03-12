import { useRequireAuth } from "../hooks";
import MemberNavBar from "../components/layout/MemberNavBar";
import HeroSection from "../components/HeroSection";
import ArticleSection from "../components/Article/ArticleSection";
import Footer from "../components/layout/Footer";

/**
 * หน้าแรกสมาชิก (ล็อกอินแล้ว): MemberNavBar, Hero, รายการบทความ, Footer
 * ยังไม่ล็อกอินจะ redirect ไป / (หน้าแรก)
 */
const MemberHomePage = () => {
  const { isReady } = useRequireAuth({ redirectTo: "/" });

  if (!isReady) return null;

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
