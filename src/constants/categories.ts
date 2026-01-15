/**
 * Article categories constant
 * Defines available categories for filtering blog posts
 */
export const CATEGORIES = ["Highlight", "Cat", "Inspiration", "General"] as const;

export type Category = typeof CATEGORIES[number];

