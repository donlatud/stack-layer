import "./App.css";
import NavBar from "./components/NavBar.tsx";
import HeroSection from "./components/HeroSection.tsx";
import Footer from "./components/Footer.tsx";
import ArticleSection from "./components/Article/ArticleSection.tsx";

function App() {
  return (
    <div className="w-full min-h-screen font-family-poppins flex flex-col">
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </div>
  );
}

export default App;
