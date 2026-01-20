import "./App.css";
import HomePage from "./pages/HomePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import MemberArticleDetailPage from "./pages/MemberArticleDetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "sonner";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import RegistrationSuccessPage from "./pages/RegistrationSuccessPage";
import MemberHomePage from "./pages/MemberHomePage";
import ProfileManagePage from "./pages/ProfileManagePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="bottom-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<ArticleDetailPage />} />
          <Route path="/member/post/:postId" element={<MemberArticleDetailPage />} />
          <Route path="/signup" element={<SignupPage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration-success" element={<RegistrationSuccessPage />} />
          <Route path="/member" element={<MemberHomePage />} />
          <Route path="/member/profile" element={<ProfileManagePage />} />
          <Route path="/member/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
