/** ประเภทรูปที่อนุญาตให้อัปโหลด (ใช้ร่วมกับ thumbnail และ avatar) */
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;

/** ขนาดไฟล์รูปสูงสุด 5MB */
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
