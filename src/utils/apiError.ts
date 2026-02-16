import axios from "axios";

/**
 * ดึงข้อความ error จาก response ของ API (รองรับ axios)
 * ใช้ร่วมกันใน data layer เพื่อให้ข้อความ error สม่ำเสมอ
 */
export function getApiErrorMessage(
  error: unknown,
  fallback: string = "An error occurred. Please try again."
): string {
  if (axios.isAxiosError(error) && error.response?.data?.error) {
    const msg = error.response.data.error;
    return typeof msg === "string" ? msg : fallback;
  }
  return fallback;
}
