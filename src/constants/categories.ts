export const CATEGORIES = ["All", "Cat", "Inspiration", "General"] as const;

export type Category = typeof CATEGORIES[number];

