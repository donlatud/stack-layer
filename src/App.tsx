import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import MemberArticleDetailPage from "./pages/MemberArticleDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminArticlePage from "./pages/admin/AdminArticlePage";
import CreateArticlePage from "./pages/admin/CreateArticlePage";
import CheckDeleteArticlePage from "./pages/admin/CheckDeleteArticlePage";
import AdminCategoryPage from "./pages/admin/AdminCategoryPage";
import CreateCategoryPage from "./pages/admin/CreateCategoryPage";
import CheckDeleteCategoryPage from "./pages/admin/CheckDeleteCategoryPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import AdminNotificationPage from "./pages/admin/AdminNotificationPage";
import AdminResetPasswordPage from "./pages/admin/AdminResetPasswordPage";
import CheckResetPasswordPage from "./pages/admin/CheckResetPasswordPage";
import RegistrationSuccessPage from "./pages/RegistrationSuccessPage";
import MemberHomePage from "./pages/MemberHomePage";
import ProfileManagePage from "./pages/ProfileManagePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

/**
 * จุดเริ่มต้น routing และ Auth
 * โครง route: สาธารณะ → /, /post/:id | สมาชิก → /member, /member/post/:id, profile, reset-password
 * แอดมิน → /admin/login, /admin/article, category, profile, notification, reset-password | ลงท้าย * → 404
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="bottom-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<ArticleDetailPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration-success" element={<RegistrationSuccessPage />} />

          <Route path="/member" element={<MemberHomePage />} />
          <Route path="/member/post/:postId" element={<MemberArticleDetailPage />} />
          <Route path="/member/profile" element={<ProfileManagePage />} />
          <Route path="/member/reset-password" element={<ResetPasswordPage />} />

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/article" element={<AdminArticlePage />} />
          <Route path="/admin/article/create" element={<CreateArticlePage />} />
          <Route path="/admin/article/:articleId/edit" element={<CreateArticlePage />} />
          <Route path="/admin/article/:articleId/delete" element={<CheckDeleteArticlePage />} />
          <Route path="/admin/category" element={<AdminCategoryPage />} />
          <Route path="/admin/category/create" element={<CreateCategoryPage />} />
          <Route path="/admin/category/:categoryId/edit" element={<CreateCategoryPage />} />
          <Route path="/admin/category/:categoryId/delete" element={<CheckDeleteCategoryPage />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
          <Route path="/admin/notification" element={<AdminNotificationPage />} />
          <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />
          <Route path="/admin/reset-password/check" element={<CheckResetPasswordPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
