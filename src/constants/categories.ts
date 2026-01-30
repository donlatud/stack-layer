/** หมวดหมู่บทความสำหรับกรอง */
export const CATEGORIES = ["Highlight", "Cat", "Inspiration", "General"] as const;

export type Category = typeof CATEGORIES[number];

