/** หน้าเริ่มต้น และจำนวนบทความต่อหน้า */
export const DEFAULT_PAGE = 1;
export const POSTS_PER_PAGE = 6;

/** หมวดหมู่ที่ไม่ส่งไปใน query (ใช้ฝั่ง client อย่างเดียว) */
export const SPECIAL_CATEGORIES = ["Highlight", "All"] as const;
