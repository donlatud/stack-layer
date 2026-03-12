import type { BlogPost, FetchBlogPostsParams } from "../types/blog";
import { SPECIAL_CATEGORIES, POSTS_PER_PAGE } from "../constants/pagination";

/** สร้าง params สำหรับ fetch บทความ: page, limit, category (ถ้าไม่ใช่ special), keyword (ถ้ามี) */
export const buildApiParams = (
  page: number,
  category: string,
  keyword?: string
): FetchBlogPostsParams => {
  const params: FetchBlogPostsParams = {
    page,
    limit: POSTS_PER_PAGE,
  };

  // Add category parameter if not a special category
  if (!SPECIAL_CATEGORIES.includes(category as typeof SPECIAL_CATEGORIES[number])) {
    params.category = category;
  }

  // Add keyword parameter if provided
  if (keyword?.trim()) {
    params.keyword = keyword.trim();
  }

  return params;
};

/**
 * Filters posts by search query (searches in title, description, and content)
 * @param posts - Array of blog posts
 * @param searchQuery - Search query string
 * @returns Filtered array of blog posts
 */
export const filterPostsBySearch = (
  posts: BlogPost[],
  searchQuery: string
): BlogPost[] => {
  if (!searchQuery.trim()) return posts;

  const query = searchQuery.toLowerCase().trim();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
  );
};

/** ตรวจว่ายังโหลดหน้าถัดไปได้ไหม (มี nextPage และจำนวนโพสต์ครบ limit) */
export const checkHasMore = (response: {
  nextPage: number | null;
  currentPage: number;
  totalPages: number;
  posts: BlogPost[];
  limit: number;
}): boolean => {
  return (
    response.nextPage !== null &&
    response.currentPage < response.totalPages &&
    response.posts.length >= response.limit
  );
};
