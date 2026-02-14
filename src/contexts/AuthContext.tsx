import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getCurrentUser } from "../services/authService";

interface User {
  name: string;
  email: string;
  avatar?: string;
  username?: string;
  id?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User, accessToken?: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** ใช้ user, isAuthenticated, login, logout, updateUser — ต้องอยู่ภายใต้ AuthProvider */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

/** เก็บ user ใน state + localStorage; โหลด user จาก server ตอน refresh ถ้ามี token */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        localStorage.removeItem("user");
        setIsLoading(false);
        return;
      }

      const fetchedUser = await getCurrentUser();
      if (fetchedUser) {
        setUser(fetchedUser);
        localStorage.setItem("user", JSON.stringify(fetchedUser));
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData: User, accessToken?: string) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
