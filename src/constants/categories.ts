/** หมวดหมู่บทความสำหรับกรอง */
export const CATEGORIES = ["Highlight", "Cat", "Inspiration", "General"] as const;

export type Category = typeof CATEGORIES[number];

/** map category_id (จาก API) เป็นชื่อหมวดหมู่ สำหรับแสดงผล */
export const CATEGORY_ID_TO_NAME: Record<number, string> = {
  1: "Cat",
  2: "General",
  3: "Inspiration",
  4: "Dog",
};

/** map ชื่อหมวดหมู่ เป็น category_id สำหรับส่งไป API (รองรับทั้ง PascalCase และ lowercase) */
export const CATEGORY_NAME_TO_ID: Record<string, number> = {
  Cat: 1,
  cat: 1,
  General: 2,
  general: 2,
  Inspiration: 3,
  inspiration: 3,
  Dog: 4,
  dog: 4,
};

/** map status_id (จาก API) เป็นชื่อสถานะ สำหรับแสดงผล Admin */
export const STATUS_ID_TO_NAME: Record<number, string> = {
  1: "Published",
  2: "Draft",
};

