import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export interface UseRequireAuthOptions {
  /** redirect ไป path นี้เมื่อยังไม่ล็อกอิน */
  redirectTo: string;
  replace?: boolean;
}

/**
 * ใช้กับหน้าที่ต้องล็อกอิน (member)
 * ถ้ายังไม่ล็อกอินจะ redirect ไป redirectTo (เช่น /login)
 * คืน isReady = true เมื่อโหลด auth เสร็จและผู้ใช้ล็อกอินแล้ว (แสดงเนื้อหาได้)
 */
export function useRequireAuth(options: UseRequireAuthOptions): { isReady: boolean } {
  const { redirectTo, replace = true } = options;
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(redirectTo, { replace });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo, replace]);

  const isReady = !isLoading && isAuthenticated;
  return { isReady };
}

export interface UseRequireGuestOptions {
  /** redirect ไป path นี้เมื่อล็อกอินแล้ว (สำหรับหน้า login/signup) */
  redirectTo: string;
  replace?: boolean;
}

/**
 * ใช้กับหน้า guest-only (login, signup)
 * ถ้าผู้ใช้ล็อกอินแล้วจะ redirect ไป redirectTo (เช่น /member)
 * คืน isReady = true เมื่อโหลด auth เสร็จ (ยังไม่ redirect แสดงฟอร์มได้)
 */
export function useRequireGuest(options: UseRequireGuestOptions): { isReady: boolean } {
  const { redirectTo, replace = true } = options;
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(redirectTo, { replace });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo, replace]);

  return { isReady: !isLoading };
}

/**
 * ใช้กับ route ที่ต้องเป็น admin
 * ถ้ายังไม่ล็อกอินหรือไม่ใช่ admin จะ redirect ไป /admin/login
 * คืน isReady = true เมื่อโหลด auth เสร็จและเป็น admin (แสดงเนื้อหาได้)
 */
export function useRequireAdmin(): { isReady: boolean } {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated || !isAdmin) {
      navigate("/admin/login", { replace: true });
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate]);

  const isReady = !isLoading && isAuthenticated && isAdmin;
  return { isReady };
}

export interface UseRequireAdminGuestOptions {
  /** redirect ไป path นี้เมื่อล็อกอินเป็น admin อยู่แล้ว */
  redirectTo: string;
  replace?: boolean;
}

/**
 * ใช้กับหน้า admin login
 * ถ้าผู้ใช้ล็อกอินเป็น admin อยู่แล้วจะ redirect ไป redirectTo (เช่น /admin/article)
 * คืน isReady = true เมื่อโหลด auth เสร็จและยังไม่ใช่ admin (แสดงฟอร์มได้)
 */
export function useRequireAdminGuest(
  options: UseRequireAdminGuestOptions
): { isReady: boolean } {
  const { redirectTo, replace = true } = options;
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isLoading && isAuthenticated && isAdmin) {
      navigate(redirectTo, { replace });
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate, redirectTo, replace]);

  const isReady = !isLoading && !(isAuthenticated && isAdmin);
  return { isReady };
}

export interface UseRedirectWhenAuthenticatedOptions {
  replace?: boolean;
}

/**
 * ใช้กับหน้ารายละเอียดบทความสาธารณะ (/post/:postId)
 * ถ้าผู้ใช้ล็อกอินแล้วจะ redirect ไป path ที่กำหนด (เช่น /member/post/:postId)
 * ไม่คืน isReady — หน้าเรียกใช้แล้วทำ redirect ตาม auth
 */
export function useRedirectWhenAuthenticated(
  redirectTo: string,
  options: UseRedirectWhenAuthenticatedOptions = {}
): void {
  const { replace = true } = options;
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated && redirectTo) {
      navigate(redirectTo, { replace });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo, replace]);
}
