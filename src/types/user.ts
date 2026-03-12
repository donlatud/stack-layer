/** User type ใช้ร่วมกันใน AuthContext และ authApi */

export interface User {
  name: string;
  email: string;
  avatar?: string;
  username?: string;
  id?: string;
  role?: string;
}
