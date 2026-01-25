// TODO: เปลี่ยนไปใช้ axios หรือ fetch จริงเมื่อมี API

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

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  user?: User;
}

/**
 * Check if email is already taken
 * @param email - Email to check
 * @returns Promise<boolean> - true if email is taken, false otherwise
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    // TODO: Replace with actual API endpoint
    // For now, using mock data - emails that are already taken
    const takenEmails = ["moodeng.cute@gmail.com", "test@example.com"];
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    return takenEmails.includes(email.toLowerCase());
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
};

/** สมัครสมาชิก; ตรวจอีเมลซ้ำก่อน (mock อยู่) */
export const signup = async (data: SignupData): Promise<SignupResponse> => {
  try {
    // TODO: Replace with actual API endpoint
    // For now, this is a mock implementation
    const emailExists = await checkEmailExists(data.email);
    
    if (emailExists) {
      return {
        success: false,
        message: "Email is already taken, Please try another email.",
      };
    }
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // TODO: Replace with actual API call
    // await axios.post("/api/auth/signup", data);
    
    return {
      success: true,
      user: {
        name: data.name,
        email: data.email,
      },
    };
  } catch (error) {
    console.error("Error during signup:", error);
    return {
      success: false,
      message: "An error occurred during registration. Please try again.",
    };
  }
};

/** ล็อกอิน; ตรวจกับ mock credentials (moodeng@gmail.com / 123456) */
export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    // TODO: Replace with actual API endpoint
    // For now, this is a mock implementation
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // TODO: Replace with actual API call
    // await axios.post("/api/auth/login", data);
    
    // Mock validation - for demo purposes
    // In real app, this would be handled by the backend
    const validCredentials = {
      email: "moodeng@gmail.com",
      password: "123456",
    };
    
    if (
      data.email.toLowerCase() === validCredentials.email &&
      data.password === validCredentials.password
    ) {
      return {
        success: true,
        user: {
          name: "Moodeng ja",
          email: data.email,
        },
      };
    } else {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      message: "An error occurred during login. Please try again.",
    };
  }
};
