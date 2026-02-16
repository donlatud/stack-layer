import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_BYTES,
} from "../constants/fileUpload";

export interface ValidateImageOptions {
  /** ประเภทรูปที่อนุญาต (default: ALLOWED_IMAGE_TYPES) */
  allowedTypes?: readonly string[];
  /** ขนาดสูงสุดเป็นไบต์ (default: 5MB) */
  maxSizeBytes?: number;
}

export interface ValidateImageResult {
  valid: boolean;
  errorMessage?: string;
}

/**
 * ตรวจสอบไฟล์รูป: ประเภทและขนาด
 * return { valid, errorMessage } — caller ใช้ errorMessage แสดง toast
 */
export function validateImageFile(
  file: File,
  options: ValidateImageOptions = {}
): ValidateImageResult {
  const allowedTypes = options.allowedTypes ?? [...ALLOWED_IMAGE_TYPES];
  const maxSizeBytes = options.maxSizeBytes ?? MAX_IMAGE_SIZE_BYTES;

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      errorMessage: "Please upload a valid image (JPEG, PNG, GIF, WebP).",
    };
  }
  if (file.size > maxSizeBytes) {
    return { valid: false, errorMessage: "Image must be smaller than 5MB." };
  }
  return { valid: true };
}
