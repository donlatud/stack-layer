import "./App.css";
import NavBar from "./components/NavBar.tsx";
import HeroSection from "./components/HeroSection.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <div className="w-full h-full">
      <NavBar />
      <HeroSection />
      <Footer />
    </div>
  );
}

export default App;
