import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "../components/layout/NavBar";
import HeroSection from "../components/HeroSection";
import ArticleSection from "../components/Article/ArticleSection";
import Footer from "../components/layout/Footer";

/**
 * HomePage component - Main landing page
 * Composes NavBar, HeroSection, ArticleSection, and Footer
 * Redirects to /member if user is already logged in
 */
const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in, redirect to member homepage
    if (isAuthenticated) {
      navigate("/member", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Don't render if user is authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

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

