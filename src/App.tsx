import "./App.css";
import HomePage from "./pages/HomePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:postId" element={<ArticleDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
