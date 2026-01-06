import NavBar from "../components/layout/NavBar";
import HeroSection from "../components/HeroSection";
import ArticleSection from "../components/Article/ArticleSection";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen font-family-poppins flex flex-col">
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </div>
  );
};

export default HomePage;

