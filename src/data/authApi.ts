/**
 * Auth API — เรียก auth endpoints และ map response
 * data/ = ฟังก์ชันเรียก API (รวม login ที่รวม POST login + GET get-user)
 * ที่เดียวที่รู้ว่า auth เรียก API ยังไง
 */
import { apiClient } from "../lib/apiClient";
import type { User } from "../types/user";
import { getApiErrorMessage } from "@/utils/apiError";

interface SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface SignupResponse {
  success: boolean;
  message?: string;
  user?: User;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  user?: User;
  access_token?: string;
}

const mapApiUserToUser = (apiUser: {
  name?: string;
  email?: string;
  profilePic?: string;
  username?: string;
  id?: string;
  role?: string;
}): User => ({
  name: apiUser.name ?? "",
  email: apiUser.email ?? "",
  avatar: apiUser.profilePic,
  username: apiUser.username,
  id: apiUser.id,
  role: apiUser.role,
});

/** สมัครสมาชิก; เรียก POST /auth/register */
export const signup = async (data: SignupData): Promise<SignupResponse> => {
  try {
    const response = await apiClient.post("/auth/register", {
      email: data.email,
      password: data.password,
      username: data.username,
      name: data.name,
    });

    if (response.status === 201 && response.data.user) {
      const apiUser = response.data.user;
      return {
        success: true,
        user: mapApiUserToUser({ ...apiUser, email: data.email }),
      };
    }

    return {
      success: false,
      message: "An error occurred during registration. Please try again.",
    };
  } catch (error) {
    console.error("Error during signup:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "An error occurred during registration. Please try again."),
    };
  }
};

/** ล็อกอิน; เรียก POST /auth/login แล้ว GET /auth/get-user เพื่อโหลด profile */
export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const loginRes = await apiClient.post("/auth/login", {
      email: data.email,
      password: data.password,
    });

    if (loginRes.status !== 200 || !loginRes.data.access_token) {
      return {
        success: false,
        message: loginRes.data?.error ?? "Invalid email or password",
      };
    }

    const accessToken = loginRes.data.access_token;

    const userRes = await apiClient.get("/auth/get-user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (userRes.status !== 200 || !userRes.data) {
      return {
        success: false,
        message: "Failed to load user profile",
      };
    }

    const apiUser = userRes.data;
    const user = mapApiUserToUser(apiUser);

    return {
      success: true,
      user,
      access_token: accessToken,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "An error occurred during login. Please try again."),
    };
  }
};

/** โหลด user ปัจจุบันจาก server ด้วย token ใน localStorage (ใช้ตอน refresh) */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await apiClient.get("/auth/get-user");
    if (response.status === 200 && response.data) {
      return mapApiUserToUser(response.data);
    }
    return null;
  } catch {
    return null;
  }
};

interface ResetPasswordData {
  oldPassword: string;
  newPassword: string;
}

interface ResetPasswordResponse {
  success: boolean;
  message?: string;
}

/** เปลี่ยนรหัสผ่าน; เรียก PUT /auth/reset-password (ใช้ token จาก apiClient) */
export const resetPassword = async (
  data: ResetPasswordData
): Promise<ResetPasswordResponse> => {
  try {
    await apiClient.put("/auth/reset-password", {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
    return { success: true };
  } catch (error) {
    console.error("Error during reset password:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "An error occurred. Please try again."),
    };
  }
};

export interface UpdateProfileResponse {
  success: boolean;
  user?: User;
  message?: string;
}

/** อัปเดตโปรไฟล์ (รูปและ/หรือชื่อ); เรียก PATCH /auth/profile ด้วย FormData */
export const updateProfile = async (
  formData: FormData
): Promise<UpdateProfileResponse> => {
  try {
    const response = await apiClient.patch("/auth/profile", formData);
    if (response.status === 200 && response.data) {
      const user = mapApiUserToUser(response.data);
      return { success: true, user };
    }
    return { success: false, message: "Failed to update profile" };
  } catch (error) {
    console.error("Error during profile update:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "An error occurred. Please try again."),
    };
  }
};
