import "./App.css";
import NavBar from "./components/NavBar.tsx";
import HeroSection from "./components/HeroSection.tsx";

function App() {
  return (
    <div className="w-full h-full">
      <NavBar />
      <HeroSection />
    </div>
  );
}

export default App;
